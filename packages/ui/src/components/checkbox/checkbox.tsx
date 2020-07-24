import * as React from 'react';
import cx from 'classnames';
import { Icon } from 'components/icon';
import { Text } from 'components/text';
import { useTheme, useMode } from 'utils/hooks';
import { InputPropsType } from 'utils/types';
import { idGenerator } from 'utils/helpers';
import { StyledLabel } from './style';

export interface CheckboxProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  checked?: boolean;
  onClick?: (e?: React.UIEvent) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
  inputProps?: InputPropsType;
  name?: string;
  value?: string;
  onChange: (e?: React.FormEvent) => void;
  color?: string;
  borderWidth?: string | number;
}

// interface CompoundedComponent
//   extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLLabelElement>> {
//   defaultProps?: any;
// }

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (props: CheckboxProps, ref): JSX.Element => {
    const {
      name,
      value,
      label,
      className,
      checked,
      disabled,
      id,
      onClick,
      inputProps,
      onChange,
      color,
      borderWidth,
      ...otherProps
    } = props;
    const uniqueID = idGenerator();
    const defaultId = id || uniqueID;
    const theme = useTheme();
    const { mode } = useMode();

    return (
      <StyledLabel
        className={cx('label', disabled && 'labelDisabled', className)}
        htmlFor={id || defaultId}
        theme={theme}
        mode={mode}
        ref={ref}
        color={color}
        borderWidth={borderWidth}
        {...otherProps}
      >
        <input
          className={cx('checkbox', className)}
          type="checkbox"
          id={id || defaultId}
          disabled={disabled}
          checked={checked}
          onClick={onClick}
          onChange={onChange}
          value={value}
          name={name}
          {...inputProps}
        />
        <div className="container">{checked && <Icon icon={Icon.icons.check} className="tick" />}</div>
        {label && (
          <Text weight={theme.typography.weights.regular} size={theme.typography.sizes.s} className="labelTitle">
            {label}
          </Text>
        )}
      </StyledLabel>
    );
  },
);
