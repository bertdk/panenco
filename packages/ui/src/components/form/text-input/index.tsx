import * as React from 'react';
import cx from 'classnames';
import { Icon, Text } from 'components';
import { useTheme, useMode } from 'utils/hooks';
import { InputComponent, InputPropsType } from 'utils/types';
import { StyledTextInput } from './style';

export interface TextInputProps extends InputComponent, React.HTMLAttributes<HTMLDivElement> {
  type?: 'text' | 'password' | 'email';
  iconBefore?: HTMLObjectElement | JSX.Element;
  iconAfter?: HTMLObjectElement | JSX.Element;
  disabled?: boolean;
  inputProps?: InputPropsType;
}

export const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
  (
    {
      className,
      type = 'text',
      title,
      subTitle,
      iconBefore,
      iconAfter,
      disabled,
      error,
      inputProps,
      style,
      placeholder = 'Placeholder',
      ...props
    }: TextInputProps,
    ref,
  ): JSX.Element => {
    const theme = useTheme();
    const { mode } = useMode();

    return (
      <StyledTextInput
        className={cx(className, 'textInput')}
        theme={theme}
        style={style}
        mode={mode}
        ref={ref}
        {...props}
      >
        {title && (
          <Text weight={theme.typography.weights.bold} size={theme.typography.sizes.s} className="inputTitle">
            {title}
          </Text>
        )}
        {subTitle && (
          <Text size={theme.typography.sizes.xs} className="inputSubtitle">
            {subTitle}
          </Text>
        )}

        <div className="fieldWrapper">
          <div className={cx('inputField', error && 'inputFieldError', disabled && 'inputFieldDisabled')}>
            {iconBefore && (
              <div className="iconBefore">
                {React.isValidElement(iconBefore) ? iconBefore : <Icon icon={iconBefore} />}
              </div>
            )}
            <input type={type} className="input" placeholder={placeholder} disabled={disabled} {...inputProps} />
            {iconAfter && (
              <div className="iconAfter">{React.isValidElement(iconAfter) ? iconAfter : <Icon icon={iconAfter} />}</div>
            )}
          </div>
          {error && (
            <div className="errorIconWrapper">
              <Icon className="errorIcon" icon={Icon.icons.close} />
            </div>
          )}
        </div>

        {error && <span className="inputErrorLabel">{error}</span>}
      </StyledTextInput>
    );
  },
);