import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
export interface IErbConnectGlobalNavApplicationCustomizerProperties {
    testMessage?: string;
}
export default class ErbConnectGlobalNavApplicationCustomizer extends BaseApplicationCustomizer<IErbConnectGlobalNavApplicationCustomizerProperties> {
    private _topPlaceholder;
    private _container;
    private _eventsBound;
    private _bodyOverflow;
    onInit(): Promise<void>;
    private _render;
    private _renderMarkup;
    private _ensureStyles;
    private _bindEvents;
    private _handleContainerClick;
    private _handleDocumentClick;
    private _handleKeydown;
    private _setDropdown;
    private _setDrawer;
    private _onDispose;
}
//# sourceMappingURL=ErbConnectGlobalNavApplicationCustomizer.d.ts.map