import { styled } from 'linaria/react';
import { ThemeMode } from 'utils/types';
import { transparentize } from 'polished';

export const StyledFileUploader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: ${(props: any): string => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props: any): string | number => (props.disabled ? 0.4 : 1)};

  .title {
    padding-left: 2px;
    margin-bottom: 4px;
    color: ${(props: any): string =>
      props.mode === ThemeMode.dark ? props.theme.colors.light : props.theme.colors.primary};
  }

  .uploader {
    width: 100%;
    display: flex;
    /* flex-direction: row-reverse; */
    justify-content: space-between;
    background-color: ${(props: any): string =>
      props.mode === ThemeMode.dark ? transparentize(0.4, props.theme.colors.secondary) : props.theme.colors.border};
    border-radius: 4px;
    border: 2px solid
      ${(props: any): string => {
        if (props.error) {
          return props.theme.colors.error;
        }
        return props.mode === ThemeMode.dark ? props.theme.colors.dark : props.theme.colors.light;
      }};
    position: relative;
    transition: 0.3s;
    align-items: center;
    height: 54px;

    &:focus-within {
      border: 2px solid ${(props: any): string => props.theme.colors.outline};
      transition: 0.3s;
      .uploaderBtn {
        box-shadow: 0 0 0 2px transparent;
      }
    }
    &:hover {
      cursor: ${(props: any): string => (props.loading ? 'auto' : 'pointer')};
    }

    &Input {
      display: none;
    }

    &Btn {
      width: 100px;
      height: 100%;

      box-shadow: 0 0 0 2px
        ${(props: any): string => {
          if (props.error) {
            return props.mode === ThemeMode.dark ? props.theme.colors.light : props.theme.colors.accent500;
          }
          return 'transparent';
        }};
      &:hover {

      box-shadow: 0 0 0 2px
        ${(props: any): string => {
          if (props.error) {
            return props.mode === ThemeMode.dark ? props.theme.colors.background50 : props.theme.colors.hover700;
          }
          return 'transparent';
        }};
      }
    }

    .placeholderBox {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      overflow: hidden;
      /* border: 2px solid
        ${(props: any): string => {
          if (props.error) {
            return props.theme.colors.error;
          }
          return props.mode === ThemeMode.dark
            ? transparentize(0.4, props.theme.colors.secondary)
            : props.theme.colors.border;
        }};
      border-right-color: transparent; */
      height: 100%;
      align-items: center;

      &Title {
        color: ${(props: any): string => {
          if (props.hasContent) {
            return props.mode === ThemeMode.dark ? props.theme.colors.light : props.theme.colors.primary;
          }
          return props.theme.colors.secondary;
        }};
        white-space: nowrap;
        overflow: hidden;
        margin-right: 20px;
        text-overflow: ellipsis;
        padding-left: 20px;
      }

      &Icon {
        display: flex;
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        color: ${(props: any): string => {
          if (props.error) {
            return props.theme.colors.error;
          }
          return props.mode === ThemeMode.dark ? props.theme.colors.light : props.theme.colors.secondary;
        }};
        margin-right: 16px;
      }
    }
  }
  .error {
    margin-left: 2px;
  }
`;
