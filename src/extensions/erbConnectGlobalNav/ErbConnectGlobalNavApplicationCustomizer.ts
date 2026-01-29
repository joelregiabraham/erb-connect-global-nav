import * as React from 'react';
import * as ReactDom from 'react-dom';
import { useEffect, useMemo, useState } from 'react';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

export interface IErbConnectGlobalNavApplicationCustomizerProperties {
  testMessage?: string;
}

interface INavLink {
  key: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

interface INavGroup {
  key: string;
  label: string;
  children: INavLink[];
}

type NavItem = INavLink | INavGroup;

const LOG_SOURCE: string = 'ErbConnectGlobalNavApplicationCustomizer';

const ErbConnectHeader: React.FC<{ webAbsoluteUrl: string }> = ({ webAbsoluteUrl }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [deptOpen, setDeptOpen] = useState<boolean>(false);

  const navItems: NavItem[] = useMemo(() => {
    const spPage = (relative: string): string => {
      const base = webAbsoluteUrl.replace(/\/$/, '');
      const rel = relative.startsWith('/') ? relative : `/${relative}`;
      return `${base}${rel}`;
    };

    const mkLink = (key: string, label: string, href: string, isExternal?: boolean): INavLink => ({
      key,
      label,
      href,
      isExternal
    });

    return [
      mkLink('home', 'HOME', spPage('/SitePages/Home.aspx')),
      mkLink('dayforce', 'DAYFORCE', 'https://example.dayforce.com', true),
      {
        key: 'departments',
        label: 'DEPARTMENTS',
        children: [
          mkLink('dept-hr', 'HR', spPage('/SitePages/HR.aspx')),
          mkLink('dept-marketing', 'Marketing', spPage('/SitePages/Marketing.aspx')),
          mkLink('dept-driver-services', 'Driver Services', spPage('/SitePages/DriverServices.aspx')),
          mkLink('dept-hs', 'Health & Safety', spPage('/SitePages/HealthSafety.aspx'))
        ]
      },
      mkLink('perks', 'PERKS', spPage('/SitePages/Perks.aspx')),
      mkLink('isaac', 'ISAAC', 'https://example.isaac.com', true),
      mkLink('additional', 'ADDITIONAL RESOURCES', spPage('/SitePages/AdditionalResources.aspx'))
    ];
  }, [webAbsoluteUrl]);

  useEffect(() => {
    const mq: MediaQueryList = window.matchMedia('(max-width: 768px)');

    const apply = (): void => setIsMobile(mq.matches);
    apply();

    const handler = (): void => apply();

    // Safari compatibility
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  useEffect(() => {
    setDeptOpen(false);
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  const openNewTab = (href: string): void => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const e = React.createElement;

  const styles = {
    shell: {
      width: '100%',
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box' as const,
      padding: '0 16px',
      position: 'sticky' as const,
      top: 0,
      zIndex: 9999
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoBlock: {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      background: '#E31E38'
    },
    title: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#1D252C'
    },
    right: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '18px'
    },
    navLink: {
      color: '#1D252C',
      fontSize: '14px',
      fontWeight: 600,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px 10px',
      borderRadius: '8px'
    },
    navLinkActiveHint: {
      boxShadow: 'inset 0 -2px 0 #E31E38'
    },
    dropdownWrap: {
      position: 'relative' as const
    },
    dropdown: {
      position: 'absolute' as const,
      top: '42px',
      right: 0,
      minWidth: '220px',
      background: '#FFFFFF',
      border: '1px solid rgba(0,0,0,0.12)',
      borderRadius: '12px',
      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
      padding: '8px',
      zIndex: 10000
    },
    dropdownItem: {
      width: '100%',
      textAlign: 'left' as const,
      border: 'none',
      background: 'transparent',
      padding: '10px 12px',
      borderRadius: '10px',
      cursor: 'pointer',
      color: '#1D252C',
      fontWeight: 600,
      fontSize: '14px'
    },
    hamburger: {
      border: '1px solid rgba(0,0,0,0.15)',
      background: '#FFFFFF',
      borderRadius: '10px',
      padding: '8px 10px',
      cursor: 'pointer',
      fontWeight: 700,
      color: '#1D252C'
    },
    drawerOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.35)',
      zIndex: 20000
    },
    drawer: {
      position: 'fixed' as const,
      top: 0,
      right: 0,
      height: '100%',
      width: '320px',
      maxWidth: '85vw',
      background: '#FFFFFF',
      boxShadow: '-12px 0 32px rgba(0,0,0,0.18)',
      padding: '16px',
      zIndex: 20001,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px'
    },
    drawerTitle: {
      fontSize: '16px',
      fontWeight: 800,
      color: '#1D252C'
    },
    closeBtn: {
      border: 'none',
      background: 'transparent',
      fontSize: '18px',
      cursor: 'pointer',
      color: '#1D252C'
    }
  };

  const renderDesktopNav = (): React.ReactElement => {
    const desktopItems: React.ReactElement[] = navItems.map((item) => {
      if ('children' in item) {
        const deptButtonStyle = deptOpen
          ? { ...styles.navLink, ...styles.navLinkActiveHint }
          : styles.navLink;

        const dropdown = deptOpen
          ? e(
              'div',
              { style: styles.dropdown, role: 'menu', 'aria-label': 'Departments' },
              ...item.children.map((child) =>
                e(
                  'button',
                  {
                    key: child.key,
                    type: 'button',
                    style: styles.dropdownItem,
                    role: 'menuitem',
                    onClick: () => {
                      setDeptOpen(false);
                      openNewTab(child.href);
                    }
                  },
                  child.label
                )
              )
            )
          : null;

        return e(
          'div',
          { key: item.key, style: styles.dropdownWrap },
          e(
            'button',
            {
              type: 'button',
              style: deptButtonStyle,
              'aria-haspopup': true,
              'aria-expanded': deptOpen,
              onClick: () => setDeptOpen((v) => !v)
            },
            item.label
          ),
          dropdown
        );
      }

      return e(
        'button',
        {
          key: item.key,
          type: 'button',
          style: styles.navLink,
          onClick: () => openNewTab(item.href)
        },
        item.label
      );
    });

    return e('div', { style: styles.right, 'aria-label': 'Erb Connect global navigation (desktop)' }, ...desktopItems);
  };

  const renderMobileNav = (): React.ReactElement => {
    const mobileNavItems: React.ReactElement[] = navItems.map((item) => {
      if ('children' in item) {
        const childButtons = item.children.map((child) =>
          e(
            'button',
            {
              key: child.key,
              type: 'button',
              style: { ...styles.dropdownItem, border: '1px solid rgba(0,0,0,0.08)' },
              onClick: () => openNewTab(child.href)
            },
            child.label
          )
        );

        return e(
          'div',
          { key: item.key, style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          e(
            'div',
            { style: { fontWeight: 800, color: '#1D252C', marginTop: '6px' } },
            item.label
          ),
          ...childButtons
        );
      }

      return e(
        'button',
        {
          key: item.key,
          type: 'button',
          style: { ...styles.dropdownItem, border: '1px solid rgba(0,0,0,0.08)' },
          onClick: () => openNewTab(item.href)
        },
        item.label
      );
    });

    const drawer =
      drawerOpen
        ? e(
            React.Fragment,
            null,
            e('div', {
              style: styles.drawerOverlay,
              onClick: () => setDrawerOpen(false),
              'aria-hidden': true
            }),
            e(
              'div',
              { style: styles.drawer, role: 'dialog', 'aria-label': 'Erb Connect menu' },
              e(
                'div',
                { style: styles.drawerHeader },
                e('div', { style: styles.drawerTitle }, 'Menu'),
                e(
                  'button',
                  {
                    type: 'button',
                    style: styles.closeBtn,
                    'aria-label': 'Close menu',
                    onClick: () => setDrawerOpen(false)
                  },
                  '✕'
                )
              ),
              ...mobileNavItems
            )
          )
        : null;

    return e(
      React.Fragment,
      null,
      e(
        'div',
        { style: styles.right, 'aria-label': 'Erb Connect global navigation (mobile)' },
        e(
          'button',
          {
            type: 'button',
            style: styles.hamburger,
            'aria-label': 'Open menu',
            onClick: () => setDrawerOpen(true)
          },
          '☰'
        )
      ),
      drawer
    );
  };

  return e(
    'header',
    { style: styles.shell, 'aria-label': 'Erb Connect header' },
    e(
      'div',
      { style: styles.left },
      e('div', { style: styles.logoBlock, 'aria-hidden': true }),
      e('div', { style: styles.title }, 'Erb Connect')
    ),
    isMobile ? renderMobileNav() : renderDesktopNav()
  );
};

export default class ErbConnectGlobalNavApplicationCustomizer extends BaseApplicationCustomizer<IErbConnectGlobalNavApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;

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

    const element: React.ReactElement = React.createElement(ErbConnectHeader, {
      webAbsoluteUrl: this.context.pageContext.web.absoluteUrl
    });

    ReactDom.render(element, this._topPlaceholder.domElement);
  };

  private _onDispose = (): void => {
    if (this._topPlaceholder?.domElement) {
      ReactDom.unmountComponentAtNode(this._topPlaceholder.domElement);
    }
    Log.info(LOG_SOURCE, 'Disposed Erb Connect Global Nav Application Customizer.');
  };
}
