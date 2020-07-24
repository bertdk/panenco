import * as React from 'react';
import cx from 'classnames';
import { PrimaryButton, Text, Icon, Loader } from 'components';
import { useTheme, useMode } from 'utils/hooks';
import { ThemeMode, InputPropsType } from 'utils/types';
import { idGenerator } from 'utils/helpers';
import { StyledFileUploader } from './style';

export interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  buttonText?: string;
  loading?: boolean;
  loadingText?: string;
  loader?: JSX.Element;
  error?: string;
  inputProps?: InputPropsType;
  icon?: HTMLObjectElement;
  iconClassName?: string;
}

export const FileUploader = ({
  id,
  title,
  placeholder = 'Upload file here',
  disabled,
  buttonText = 'Upload',
  loadingText = 'Uploading...',
  loading,
  error,
  loader,
  className,
  style,
  inputProps,
  icon,
  iconClassName,
  ...props
}: FileUploaderProps): JSX.Element => {
  const theme = useTheme();
  const { mode } = useMode();
  const uniqueID = idGenerator();
  const defaultId = id || uniqueID;
  const [fileInput, setName] = React.useState({
    fileName: null,
    key: uniqueID,
  }) as any;

  const updateFileName = (e): void => {
    setName({
      fileName: e.target.files[0].name,
      key: fileInput.key,
    });
  };

  const handleIconClick = (e: React.UIEvent): void => {
    e.preventDefault();

    setName({
      fileName: '',
      key: uniqueID,
    });
  };
  const { fileName, key } = fileInput;
  let renderStatusIcons = null as JSX.Element | null;
  let renderPlaceholder = placeholder;
  if (loading) {
    renderPlaceholder = loadingText;
    renderStatusIcons = loader || (
      <Loader
        color={mode === ThemeMode.dark ? theme.colors.light : theme.colors.secondary}
        className="placeholderBoxIcon"
      />
    );
  } else if (fileName) {
    renderPlaceholder = fileName;
    renderStatusIcons = (
      <Icon icon={icon || Icon.icons.x} className={cx('placeholderBoxIcon', iconClassName)} onClick={handleIconClick} />
    );
  } else if (error) {
    renderStatusIcons = <Icon icon={icon || Icon.icons.close} className={cx('placeholderBoxIcon', iconClassName)} />;
  }

  return (
    <StyledFileUploader
      theme={theme}
      mode={mode}
      disabled={disabled}
      loading={loading}
      hasContent={fileName || loading}
      error={error}
      className={className}
      style={style}
      {...props}
    >
      {title && (
        <Text weight={theme.typography.weights.bold} className="title">
          {title}
        </Text>
      )}
      <label className="uploader" htmlFor={id || defaultId}>
        <input
          className="uploaderInput"
          type="file"
          id={id || defaultId}
          disabled={disabled || loading}
          onChange={updateFileName}
          key={key}
          {...inputProps}
        />
        <div className="placeholderBox">
          <Text className="placeholderBoxTitle">{renderPlaceholder}</Text>
          {renderStatusIcons}
        </div>

        <PrimaryButton className="uploaderBtn" disabled={loading}>
          {buttonText}
        </PrimaryButton>
      </label>

      {error && (
        <Text className="error" color={theme.colors.error} size={theme.typography.sizes.xs}>
          {error}
        </Text>
      )}
    </StyledFileUploader>
  );
};
