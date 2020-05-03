import * as React from 'react';
import { FormikConfig, FormikHelpers, Formik } from 'formik';
import { object } from 'yup';

import { MagicalContext, WizardStepMeta } from './context';
import { isFunction } from './utils';

export interface WizardStepContainer<Values> {
  onSubmit?: (values?: Values, formikHelpers?: FormikHelpers<Values>) => void | Promise<any>;
  NoReturn?: boolean;
  Title?: React.ReactNode;
  Validation?: any | (() => any);
}

export type NavigatableStepMeta<Values> = {
  Step: React.ComponentType<any> & WizardStepContainer<Values>;
} & WizardStepMeta;

export interface NavigatorConstructor<Values = any> {
  new (steps: NavigatableStepMeta<Values>[], initialStep: number): Navigator;
}

export interface Navigator {
  mount(goTo: (n: number, fromNavigator?: boolean) => void): void;
  unmount(): void;
  navigate(prevStepIndex: number, nextStepIndex: number): void;
}

export interface WizardProps<Values> extends FormikConfig<Values> {
  steps: (React.ComponentType<any> & WizardStepContainer<Values>)[];
  children?: (
    current: {
      step: React.ReactNode;
    } & WizardStepMeta,
  ) => React.ReactNode | React.ReactNode;
  component?: React.ComponentType<any>;
  navigator?: NavigatorConstructor;
  initialStep?: number;
}

export interface WizardState {
  currentStep: number;
  magicState: any;
}

class HarryPotter<Values = any> extends React.Component<WizardProps<Values>, WizardState> {
  stepRef: any;

  stepsMeta: WizardStepMeta[];

  navigator: Navigator;

  static displayName = '🧙‍♂️WizardForm';

  constructor(props: WizardProps<Values>) {
    super(props);

    this.state = {
      currentStep: props.initialStep ?? 0,
      magicState: undefined,
    };

    this.stepRef = React.createRef();
    this.stepsMeta = this.createStepsMeta(props.steps);

    const { navigator: Navigator } = props;

    if (Navigator) {
      const {
        props: { steps },
        state: { currentStep },
        stepsMeta,
      } = this;

      const stepsData = steps.map((Step, i) => ({ Step, ...stepsMeta[i] }));

      this.navigator = new Navigator(stepsData, currentStep);
    }
  }

  componentDidMount(): void {
    if (this.navigator) this.navigator.mount(this.toStepFromNavigator); // NAVIGATOR BACK BUTTON LISTENER
  }

  componentDidUpdate(prevProps: WizardProps<Values>, prevState: WizardState): void {
    const { steps } = this.props;
    const { currentStep } = this.state;

    if (prevProps.steps !== steps || prevProps.steps.length !== steps.length) {
      this.stepsMeta = this.createStepsMeta(steps);
    }

    if (prevState.currentStep !== currentStep) {
      this.stepsMeta[prevState.currentStep].touched = true;
    }
  }

  componentWillUnmount(): void {
    if (this.navigator) this.navigator.unmount(); // NAVIGATOR LISTENER UNREGISTER
  }

  setWizardState = (state: any, cb?: () => void): void => {
    this.setState(
      (currentState) => ({
        magicState: isFunction(state) ? state(currentState.magicState) : { ...currentState.magicState, ...state },
      }),
      cb,
    );
  };

  toStep = (step: number): void => {
    const { currentStep } = this.state;

    if (step === currentStep || !this.isTransgressionAllowed(step)) return;

    this.setState(
      {
        currentStep: step,
      },
      () => {
        if (this.navigator) this.navigator.navigate(currentStep, step);
      },
    );
  };

  toStepFromNavigator = (step: number): void => {
    const { currentStep } = this.state;

    if (step === currentStep || !this.isTransgressionAllowed(step)) return;

    this.setState({
      currentStep: step,
    });
  };

  toFirstStep = (): void => this.toStep(0);

  toLastStep = (): void => {
    const { steps } = this.props;
    return this.toStep(steps.length - 1);
  };

  next = () => {
    const { currentStep: prevStep } = this.state;
    const { steps } = this.props;

    this.setState(
      (state) => ({
        currentStep: state.currentStep + 1 < steps.length ? state.currentStep + 1 : state.currentStep,
      }),
      () => {
        const { currentStep } = this.state;
        if (this.navigator) this.navigator.navigate(prevStep, currentStep);
      },
    );
  };

  back = () => {
    const { currentStep } = this.state;
    this.toStep(currentStep - 1);
  };

  onSubmit = async (values: Values, formikBag: FormikHelpers<Values>): Promise<any> => {
    const { steps, onSubmit } = this.props;
    const { currentStep } = this.state;
    if (this.stepRef.current?.onSubmit) {
      await this.stepRef.current.onSubmit(values, formikBag);
    }
    if (currentStep + 1 < steps.length) {
      this.next();
    } else if (onSubmit) {
      await onSubmit(values, formikBag);
    }
  };

  onReset = (): void => {
    const { steps } = this.props;
    this.stepsMeta = this.createStepsMeta(steps);
    this.setState({
      currentStep: 0,
      magicState: undefined,
    });
  };

  createStepsMeta = (steps: (React.ComponentType<any> & WizardStepContainer<Values>)[]): WizardStepMeta[] => {
    return steps.map((Step, stepIndex) => ({
      stepIndex,
      title: Step.Title ?? '',
      noReturn: Step.NoReturn ?? false,
      touched: false,
    }));
  };

  isTransgressionAllowed(step: number): boolean {
    const { currentStep } = this.state;
    const { steps } = this.props;

    if (step < 0 || step >= steps.length) {
      console.error(`You can only go to steps 0 - ${steps.length}`);
      return false;
    }

    // Traveling back
    if (step < currentStep) {
      for (let i = step; i < currentStep; i += 1) {
        if (steps[i].NoReturn) {
          console.error('Transgression is prohibited over "point of no return"');
          return false;
        }
      }
    } else {
      // Traveling forward
      for (let i = currentStep + 1; i <= step; i += 1) {
        if (steps[i && i - 1].NoReturn) {
          console.error('Transgression is prohibited over "point of no return"');
          return false;
        }
      }
    }

    return true;
  }

  render(): JSX.Element {
    const { currentStep, magicState } = this.state;

    const { children, component, steps, ...props } = this.props;

    const { next, back, toStep, toFirstStep, toLastStep, stepRef: ref, setWizardState, stepsMeta } = this;

    const magicBag = {
      currentStepIndex: currentStep,
      stepsMeta,
      setWizardState,
      next, // TO BE REMOVED
      back,
      toStep,
      toFirstStep,
      toLastStep,
      get wizardState(): any {
        return magicState;
      },
    };

    const currentValidationSchema = steps[currentStep].Validation || object();

    return (
      <MagicalContext.Provider value={magicBag}>
        <Formik
          onSubmit={this.onSubmit}
          onReset={this.onReset}
          validationSchema={currentValidationSchema}
          enableReinitialize
          {...props}
        >
          {(formikBag) => {
            const currentStepElement = React.createElement(steps[currentStep], { ref, ...magicBag, ...formikBag });

            if (component) {
              return React.createElement(component, {
                step: currentStepElement,
                ...stepsMeta[currentStep],
              });
            }

            if (children) {
              return isFunction(children)
                ? children({ step: currentStepElement, ...stepsMeta[currentStep] })
                : children;
            }

            return currentStepElement;
          }}
        </Formik>
      </MagicalContext.Provider>
    );
  }
}

export default HarryPotter;
