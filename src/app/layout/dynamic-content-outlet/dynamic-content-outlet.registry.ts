interface RegistryItem {
    componentName: string;
    module: any;
}
/** A registry array of Component Name to details
 * that must be updated with each new component
 * that you wish to load dynamically.
 */
export const DynamicContentOutletRegistry: RegistryItem[] = [
    {
        componentName: 'SidebarLeftComponent',
        module: import('src/app/lazy-modules/sidebar-left/sidebar-left.module').then(x => x.SidebarLeftModule)
      },
      {
        componentName: 'SidebarRightComponent',
        module: import('src/app/lazy-modules/sidebar-right/sidebar-right.module').then(x => x.SidebarRightModule)
      },
      {
        componentName: 'NavbarMenuComponent',
        module: import('src/app/lazy-modules/navbar-menu/navbar-menu.module').then(x => x.NavbarMenuModule)
      },
      {
        componentName: 'CountersComponent',
        module: import('src/app/lazy-modules/profile-counters/profile-counters.module').then(x => x.ProfileCountersModule)
      },
      {
        componentName: 'MatchHeaderComponent',
        module: import('src/app/lazy-modules/match-header/match-header.module').then(x => x.MatchHeaderModule)
      },
      {
        componentName: 'AdminTopPanelComponent',
        module: import('src/app/lazy-modules/admin-top-panel/admin-top-panel.module').then(x => x.AdminTopPanelModule)
      },
];
