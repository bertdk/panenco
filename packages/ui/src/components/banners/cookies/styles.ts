import { styled } from 'linaria/react';
import { ThemeMode } from 'utils/types';
import { Paper } from 'components';
import { transparentize } from 'polished';

export const StyledCookiesContainer = styled.div`
  align-items: center;
  background-color: ${(props: any): string => {
    return transparentize(0.4, props.mode === ThemeMode.dark ? props.theme.colors.light : props.theme.colors.dark);
  }};
  display: flex;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;

  ${Paper as any} {
    max-width: 50%;
    min-width: 300px;
  }

  .cookiesModalActions {
    align-items: flex-end;
    display: flex;
    margin-top: 24px;

    & > button:first-child {
      margin-right: 24px;
    }
  }

  .cookiesModalDetailedViewButton {
    background: none;
    border: none;
    cursor: pointer;
    margin: 0;
    margin-left: auto;
    padding: 0;
  }
`;

export const StyledCookieEntry = styled.div`
  margin-bottom: 24px;

  &Title {
    margin-bottom: 8px;
  }

  .cookieEntryDescription {
    margin-bottom: 12px;
  }

  .cookieEntryRadio {
    display: flex;

    & > * {
      margin-right: 24px;
    }
  }
`;
