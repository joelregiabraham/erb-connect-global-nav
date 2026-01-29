import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

export interface IErbConnectGlobalNavApplicationCustomizerProperties {
  testMessage?: string;
}

const LOG_SOURCE: string = 'ErbConnectGlobalNavApplicationCustomizer';

const ErbConnectHeader: React.FC<{ webAbsoluteUrl: string }> = ({ webAbsoluteUrl }) => {
  const e = React.createElement;

  const styles = {
    shell: {
      width: '100%',
      background: '#FFFFFF',
      borderBottom: '2px solid #E31E38',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box' as const,
      padding: '0 24px',
      position: 'sticky' as const,
      top: 0,
      zIndex: 9999
    },
    accent: {
      width: '10px',
      height: '48px',
      borderRadius: '6px',
      background: '#E31E38',
      marginRight: '16px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#1D252C'
    },
    link: {
      marginLeft: 'auto',
      color: '#1D252C',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '14px'
    }
  };

  return e(
    'header',
    { style: styles.shell, 'aria-label': 'Erb Connect header' },
    e('div', { style: styles.accent, 'aria-hidden': true }),
    e('div', { style: styles.title }, 'Erb Connect Global Navigation'),
    e(
      'a',
      { style: styles.link, href: webAbsoluteUrl },
      'Back to site'
    )
  );
};

export default class ErbConnectGlobalNavApplicationCustomizer extends BaseApplicationCustomizer<IErbConnectGlobalNavApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _container: HTMLDivElement | undefined;

  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized Erb Connect Global Nav Application Customizer');
    this.context.placeholderProvider.changedEvent.add(this, this._render);
    this._render();
    return Promise.resolve();
  }

  private _render = (): void => {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    if (!this._topPlaceholder || !this._topPlaceholder.domElement) {
      Log.warn(LOG_SOURCE, 'Top placeholder not available yet.');
      return;
    }

    if (!this._container) {
      this._container = document.createElement('div');
      this._topPlaceholder.domElement.appendChild(this._container);
    }

    const element: React.ReactElement = React.createElement(ErbConnectHeader, {
      webAbsoluteUrl: this.context.pageContext.web.absoluteUrl
    });

    ReactDom.render(element, this._container);
  };

  private _onDispose = (): void => {
    if (this._container) {
      ReactDom.unmountComponentAtNode(this._container);
      this._container.remove();
      this._container = undefined;
    }
    Log.info(LOG_SOURCE, 'Disposed Erb Connect Global Nav Application Customizer.');
  };
}
