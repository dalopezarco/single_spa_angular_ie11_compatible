export interface Menu {
    title: string;
    type: string;
    menuItems: MenuItem[];
}

export interface MenuItem {
    uniqueName: string;
    title: string;
    url: string;
    icon: string;
    parentMenu: string;
    permissionName: string;
    sectionId: string;
    isExternal: boolean;
    hasSubMenu: boolean;
    customerSettingName?: string;
    customerSettingValue?: string;
}
