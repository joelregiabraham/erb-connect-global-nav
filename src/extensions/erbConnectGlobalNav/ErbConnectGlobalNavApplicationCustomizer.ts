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

const STYLE_ELEMENT_ID = 'erb-connect-global-nav-styles';

export default class ErbConnectGlobalNavApplicationCustomizer extends BaseApplicationCustomizer<IErbConnectGlobalNavApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _container: HTMLDivElement | undefined;
  private _eventsBound = false;
  private _bodyOverflow: string | undefined;

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

    this._ensureStyles();
    this._renderMarkup();
    if (!this._eventsBound) {
      this._bindEvents();
    }
  };

  private _renderMarkup(): void {
    if (!this._container) {
      return;
    }

    const homeUrl = this.context.pageContext.web.absoluteUrl;

    this._container.innerHTML = `
      <div class="erb-connect-shell" role="navigation" aria-label="Erb Connect Global Navigation">
        <div class="erb-connect-inner">
          <a class="erb-connect-brand" href="${homeUrl}" target="_blank" rel="noopener noreferrer">
            <span class="erb-connect-accent" aria-hidden="true"></span>
            <span class="erb-connect-title">Erb Connect</span>
          </a>
          <button class="erb-connect-hamburger" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="erb-connect-drawer">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul class="erb-connect-links" role="menubar">
            <li role="none">
              <a class="erb-connect-link" role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">HOME</a>
            </li>
            <li role="none">
              <a class="erb-connect-link" role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">DAYFORCE</a>
            </li>
            <li class="erb-connect-dropdown" role="none">
              <button class="erb-connect-dropbtn" type="button" aria-haspopup="true" aria-expanded="false">
                DEPARTMENTS <span class="erb-connect-caret" aria-hidden="true"></span>
              </button>
              <ul class="erb-connect-dropmenu" role="menu">
                <li role="none"><a role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">HR</a></li>
                <li role="none"><a role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">Marketing</a></li>
                <li role="none"><a role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">Driver Services</a></li>
                <li role="none"><a role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">Health &amp; Safety</a></li>
              </ul>
            </li>
            <li role="none">
              <a class="erb-connect-link" role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">PERKS</a>
            </li>
            <li role="none">
              <a class="erb-connect-link" role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">ISAAC</a>
            </li>
            <li role="none">
              <a class="erb-connect-link" role="menuitem" href="${homeUrl}" target="_blank" rel="noopener noreferrer">ADDITIONAL RESOURCES</a>
            </li>
          </ul>
        </div>
        <div class="erb-connect-drawer" id="erb-connect-drawer" aria-hidden="true">
          <div class="erb-connect-drawer-header">
            <span class="erb-connect-drawer-title">Erb Connect</span>
            <button class="erb-connect-drawer-close" type="button" aria-label="Close navigation">×</button>
          </div>
          <nav class="erb-connect-drawer-nav" aria-label="Erb Connect mobile navigation">
            <a class="erb-connect-drawer-link" href="${homeUrl}" target="_blank" rel="noopener noreferrer">HOME</a>
            <a class="erb-connect-drawer-link" href="${homeUrl}" target="_blank" rel="noopener noreferrer">DAYFORCE</a>
            <div class="erb-connect-drawer-section">
              <span class="erb-connect-drawer-section-title">DEPARTMENTS</span>
              <div class="erb-connect-drawer-sub">
                <a href="${homeUrl}" target="_blank" rel="noopener noreferrer">HR</a>
                <a href="${homeUrl}" target="_blank" rel="noopener noreferrer">Marketing</a>
                <a href="${homeUrl}" target="_blank" rel="noopener noreferrer">Driver Services</a>
                <a href="${homeUrl}" target="_blank" rel="noopener noreferrer">Health &amp; Safety</a>
              </div>
            </div>
            <a class="erb-connect-drawer-link" href="${homeUrl}" target="_blank" rel="noopener noreferrer">PERKS</a>
            <a class="erb-connect-drawer-link" href="${homeUrl}" target="_blank" rel="noopener noreferrer">ISAAC</a>
            <a class="erb-connect-drawer-link" href="${homeUrl}" target="_blank" rel="noopener noreferrer">ADDITIONAL RESOURCES</a>
          </nav>
        </div>
        <div class="erb-connect-overlay" aria-hidden="true"></div>
      </div>
    `;

    this._setDropdown(false);
    this._setDrawer(false);
  }

  private _ensureStyles(): void {
    if (document.getElementById(STYLE_ELEMENT_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    style.textContent = `
      .erb-connect-shell {
        width: 100%;
        background: #FFFFFF;
        border-bottom: 2px solid #E31E38;
        box-sizing: border-box;
      }
      .erb-connect-inner {
        height: 80px;
        display: flex;
        align-items: center;
        gap: 24px;
        padding: 0 24px;
        box-sizing: border-box;
      }
      .erb-connect-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: #1D252C;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.2px;
      }
      .erb-connect-brand:focus-visible {
        outline: 2px solid #E31E38;
        outline-offset: 4px;
      }
      .erb-connect-accent {
        width: 10px;
        height: 48px;
        border-radius: 6px;
        background: #E31E38;
      }
      .erb-connect-links {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 0 0 0 auto;
        padding: 0;
      }
      .erb-connect-link,
      .erb-connect-dropbtn {
        color: #1D252C;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        padding: 10px 6px;
        border-radius: 6px;
      }
      .erb-connect-link:hover,
      .erb-connect-dropbtn:hover {
        background: #F6F7F8;
      }
      .erb-connect-dropbtn {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .erb-connect-caret {
        border: solid #1D252C;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        transition: transform 0.2s ease;
        margin-top: -2px;
      }
      .erb-connect-dropdown {
        position: relative;
      }
      .erb-connect-dropmenu {
        display: none;
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        min-width: 220px;
        padding: 6px 0;
        z-index: 10002;
      }
      .erb-connect-dropmenu a {
        display: block;
        padding: 10px 16px;
        color: #1D252C;
        text-decoration: none;
        font-size: 14px;
      }
      .erb-connect-dropmenu a:hover {
        background: #F3F4F6;
      }
      .erb-connect-dropdown.is-open .erb-connect-dropmenu {
        display: block;
      }
      .erb-connect-dropdown.is-open .erb-connect-caret {
        transform: rotate(-135deg);
      }
      .erb-connect-hamburger {
        display: none;
        margin-left: auto;
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        width: 44px;
        height: 40px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .erb-connect-hamburger span {
        display: block;
        width: 20px;
        height: 2px;
        background: #1D252C;
        margin: 3px 0;
      }
      .erb-connect-drawer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 280px;
        background: #FFFFFF;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .erb-connect-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .erb-connect-drawer-title {
        font-size: 18px;
        font-weight: 700;
        color: #1D252C;
      }
      .erb-connect-drawer-close {
        background: none;
        border: none;
        font-size: 26px;
        cursor: pointer;
        color: #1D252C;
      }
      .erb-connect-drawer-nav {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .erb-connect-drawer-link {
        text-decoration: none;
        color: #1D252C;
        font-weight: 600;
        padding: 8px 0;
      }
      .erb-connect-drawer-section-title {
        font-size: 13px;
        letter-spacing: 1px;
        color: #6B7280;
        font-weight: 700;
        padding: 12px 0 6px 0;
      }
      .erb-connect-drawer-sub {
        border-left: 2px solid #E31E38;
        padding-left: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .erb-connect-drawer-sub a {
        text-decoration: none;
        color: #1D252C;
        font-weight: 500;
        font-size: 14px;
        padding: 6px 0;
      }
      .erb-connect-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.25);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        z-index: 10000;
      }
      .erb-connect-shell.is-drawer-open .erb-connect-drawer {
        transform: translateX(0);
      }
      .erb-connect-shell.is-drawer-open .erb-connect-overlay {
        opacity: 1;
        pointer-events: auto;
      }
      @media (max-width: 1024px) {
        .erb-connect-links {
          display: none;
        }
        .erb-connect-hamburger {
          display: flex;
        }
        .erb-connect-inner {
          gap: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private _bindEvents(): void {
    if (!this._container) {
      return;
    }
    this._container.addEventListener('click', this._handleContainerClick);
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleKeydown);
    this._eventsBound = true;
  }

  private _handleContainerClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!this._container) {
      return;
    }

    if (target.closest('.erb-connect-dropbtn')) {
      event.preventDefault();
      event.stopPropagation();
      const dropdown = this._container.querySelector('.erb-connect-dropdown');
      this._setDropdown(!dropdown?.classList.contains('is-open'));
      return;
    }

    if (target.closest('.erb-connect-hamburger')) {
      event.preventDefault();
      event.stopPropagation();
      const shell = this._container.querySelector('.erb-connect-shell');
      this._setDrawer(!shell?.classList.contains('is-drawer-open'));
      return;
    }

    if (target.closest('.erb-connect-drawer-close') || target.closest('.erb-connect-overlay')) {
      event.preventDefault();
      this._setDrawer(false);
      return;
    }

    if (target.closest('.erb-connect-dropmenu a')) {
      this._setDropdown(false);
      return;
    }

    if (target.closest('.erb-connect-drawer a')) {
      this._setDrawer(false);
    }
  };

  private _handleDocumentClick = (event: MouseEvent): void => {
    if (!this._container) {
      return;
    }

    const target = event.target as HTMLElement;
    const dropdown = this._container.querySelector('.erb-connect-dropdown');
    if (dropdown?.classList.contains('is-open') && !target.closest('.erb-connect-dropdown')) {
      this._setDropdown(false);
    }

    const shell = this._container.querySelector('.erb-connect-shell');
    if (shell?.classList.contains('is-drawer-open') &&
        !target.closest('.erb-connect-drawer') &&
        !target.closest('.erb-connect-hamburger')) {
      this._setDrawer(false);
    }
  };

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this._setDropdown(false);
      this._setDrawer(false);
    }
  };

  private _setDropdown(open: boolean): void {
    if (!this._container) {
      return;
    }
    const dropdown = this._container.querySelector('.erb-connect-dropdown') as HTMLElement | null;
    const button = this._container.querySelector('.erb-connect-dropbtn') as HTMLButtonElement | null;
    if (!dropdown || !button) {
      return;
    }
    dropdown.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  private _setDrawer(open: boolean): void {
    if (!this._container) {
      return;
    }
    const shell = this._container.querySelector('.erb-connect-shell') as HTMLElement | null;
    const drawer = this._container.querySelector('.erb-connect-drawer') as HTMLElement | null;
    const hamburger = this._container.querySelector('.erb-connect-hamburger') as HTMLButtonElement | null;
    if (!shell || !drawer || !hamburger) {
      return;
    }
    shell.classList.toggle('is-drawer-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open) {
      this._bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (this._bodyOverflow !== undefined) {
      document.body.style.overflow = this._bodyOverflow;
      this._bodyOverflow = undefined;
    }
  }

  private _onDispose = (): void => {
    if (this._container) {
      if (this._eventsBound) {
        this._container.removeEventListener('click', this._handleContainerClick);
        document.removeEventListener('click', this._handleDocumentClick);
        document.removeEventListener('keydown', this._handleKeydown);
        this._eventsBound = false;
      }
      this._container.remove();
      this._container = undefined;
    }
    Log.info(LOG_SOURCE, 'Disposed Erb Connect Global Nav Application Customizer.');
  };
}
