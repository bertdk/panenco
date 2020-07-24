import * as React from 'react';
import cx from 'classnames';
import { Text } from 'components';
import { useTheme, useMode } from 'utils/hooks';
import { InputPropsType } from 'utils/types';
import { idGenerator } from 'utils/helpers';
import { StyledRadio } from './style';

export interface RadioButtonProps extends React.HTMLAttributes<HTMLLabelElement> {
  // [key: string]: any;
  label?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  error?: string;
  inputProps?: InputPropsType;
}

export const Radio = React.forwardRef<HTMLLabelElement, RadioButtonProps>(
  (
    { label, value, name, id, className, checked, inputProps, disabled, style, error, ...props }: RadioButtonProps,
    ref,
  ): JSX.Element => {
    const theme = useTheme();
    const { mode } = useMode();
    const uniqueID = idGenerator();
    const defaultId = id || uniqueID;

    return (
      <StyledRadio theme={theme} mode={mode} ref={ref} style={style} error={error} {...props}>
        <label className={cx('label', disabled && 'labelDisabled', className)} htmlFor={id || defaultId}>
          <input
            type="radio"
            checked={checked}
            className="radiobox"
            name={name}
            value={value}
            id={id || defaultId}
            disabled={disabled}
            {...inputProps}
          />
          <div className="container">
            <div className="point" />
          </div>
          <Text weight={theme.typography.weights.regular} size={theme.typography.sizes.s} className="labelTitle">
            {label}
          </Text>
        </label>
        {error && (
          <Text className="errorTitle" size={theme.typography.sizes.xs} color={theme.colors.error}>
            {error}
          </Text>
        )}
      </StyledRadio>
    );
  },
);
