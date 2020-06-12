module.exports = [
  {
    key: 'milestones',
    name: 'Milestones',
    icon: 'data_usage',
    link: '/app/milestones',
  },
  {
    key: 'portfolio',
    name: 'Portfolio',
    icon: 'assignment',
    link: '/app/portfolio',
  },
  {
    key: 'optimization',
    name: 'Optimization',
    icon: 'pie_chart',
    link: '/app/portfolio-optimization',
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    child: [
      {
        key: 'dashboard_v1',
        name: 'Dashboard V1',
        link: '/app',
        parent: 'dashboard',
      },
      {
        key: 'dashboard_v2',
        name: 'Dashboard V2',
        link: '/app/dashboard-v2',
        parent: 'dashboard',
      },
    ]
  },
  {
    key: 'layouts',
    name: 'Layouts',
    icon: 'view_column',
    child: [
      {
        key: 'grid',
        name: 'Grid',
        link: '/app/layouts/grid',
        parent: 'layouts',
      },
      {
        key: 'application_layout',
        name: 'App Layout',
        link: '/app/layouts/app-layout',
        parent: 'layouts',
      },
      {
        key: 'responsive',
        name: 'Responsive',
        link: '/app/layouts/responsive',
        parent: 'layouts',
      }
    ]
  },
  {
    key: 'tables',
    name: 'Tables',
    icon: 'grid_on',
    child: [
      {
        key: 'basic_table',
        name: 'Basic Table',
        link: '/app/tables/basic-table',
        parent: 'tables'
      },
      {
        key: 'data_table',
        name: 'Data Table',
        link: '/app/tables/data-table',
        parent: 'tables'
      },
      {
        key: 'tree_table',
        name: 'Tree Table',
        link: '/app/tables/tree-table',
        parent: 'tables'
      },
      {
        key: 'crud_table',
        name: 'CRUD Table',
        link: '/app/tables/crud-table',
        parent: 'tables'
      },
      {
        key: 'table_playground',
        name: 'Table Playgound',
        link: '/app/tables/table-playground',
        parent: 'tables'
      },
    ]
  },
  {
    key: 'forms',
    name: 'Form Button',
    icon: 'border_color',
    child: [
      {
        key: 'reduxform',
        name: 'Redux Form',
        link: '/app/forms/reduxform',
        parent: 'forms',
      },
      {
        key: 'datetimepicker',
        name: 'Date Time Picker',
        link: '/app/forms/date-time-picker',
        parent: 'forms',
      },
      {
        key: 'checkbox_radio',
        name: 'Checkbox & Radio',
        link: '/app/forms/checkbox-radio',
        parent: 'forms',
      },
      {
        key: 'switches',
        name: 'Switches',
        link: '/app/forms/switches',
        parent: 'forms',
      },
      {
        key: 'selectbox',
        name: 'Select',
        link: '/app/forms/selectbox',
        parent: 'forms',
      },
      {
        key: 'buttons',
        name: 'Buttons',
        link: '/app/forms/buttons',
        parent: 'forms',
      },
      {
        key: 'textfields',
        name: 'Textfields',
        link: '/app/forms/textfields',
        parent: 'forms',
      },
      {
        key: 'autocomplete',
        name: 'Autocomplete & Tag',
        link: '/app/forms/autocomplete',
        parent: 'forms',
      },
      {
        key: 'slider',
        name: 'Slider Range',
        link: '/app/forms/slider-range',
        parent: 'forms',
      },
      {
        key: 'upload',
        name: 'Upload',
        link: '/app/forms/upload',
        parent: 'forms',
      },
      {
        key: 'ratting',
        name: 'Ratting',
        link: '/app/forms/ratting',
        parent: 'forms',
      },
      {
        key: 'texteditor',
        name: 'WYSIWYG Editor',
        link: '/app/forms/wysiwyg-editor',
        parent: 'forms',
      },
    ]
  },
  {
    key: 'ui',
    name: 'UI Elements',
    icon: 'flag',
    child: [
      {
        key: 'icons',
        name: 'Icons',
        link: '/app/ui/icons',
        parent: 'ui',
      },
      {
        key: 'avatars',
        name: 'Avatars',
        link: '/app/ui/avatars',
        parent: 'ui',
      },
      {
        key: 'badges',
        name: 'Badges',
        link: '/app/ui/badges',
        parent: 'ui',
      },
      {
        key: 'card_papper',
        name: 'Card & Papper',
        link: '/app/ui/card-papper',
        parent: 'ui',
      },
      {
        key: 'dialog_modal',
        name: 'Dialog & Modal',
        link: '/app/ui/dialog-modal',
        parent: 'ui',
      },
      {
        key: 'drawer_menu',
        name: 'Drawer & Menu',
        link: '/app/ui/drawer-menu',
        parent: 'ui',
      },
      {
        key: 'tab',
        name: 'Tabs Navigation',
        link: '/app/ui/tabs',
        parent: 'ui',
      },
      {
        key: 'accordion',
        name: 'Accordion',
        link: '/app/ui/accordion',
        parent: 'ui',
      },
      {
        key: 'image_gird',
        name: 'Image Grid Gallery',
        link: '/app/ui/image-grid',
        parent: 'ui',
      },
      {
        key: 'list_divider',
        name: 'List & Divider',
        link: '/app/ui/list',
        parent: 'ui',
      },
      {
        key: 'popover_tooltip',
        name: 'Popover & Tooltip',
        link: '/app/ui/popover-tooltip',
        parent: 'ui',
      },
      {
        key: 'progress',
        name: 'Progress & Spinners',
        link: '/app/ui/progress',
        parent: 'ui',
      },
      {
        key: 'tags',
        name: 'Tags',
        link: '/app/ui/tags',
        parent: 'ui',
      },
      {
        key: 'steppers',
        name: 'Steppers',
        link: '/app/ui/steppers',
        parent: 'ui',
      },
      {
        key: 'notification',
        name: 'Notification',
        link: '/app/ui/notification',
        parent: 'ui',
      },
      {
        key: 'breadcrumbs',
        name: 'Breadcrumbs',
        link: '/app/ui/breadcrumbs',
        parent: 'ui',
      },
      {
        key: 'dividers',
        name: 'Dividers',
        link: '/app/ui/dividers',
        parent: 'ui',
      },
      {
        key: 'typography',
        name: 'Typography',
        link: '/app/ui/typography',
        parent: 'ui',
      },
      {
        key: 'slider_carousel',
        name: 'Slider & Carousel',
        link: '/app/ui/slider-carousel',
        parent: 'ui',
      },
      {
        key: 'paginations',
        name: 'Paginations',
        link: '/app/ui/paginations',
        parent: 'ui',
      },
    ]
  },
  {
    key: 'charts',
    name: 'Charts',
    icon: 'insert_chart',
    child: [
      {
        key: 'line_charts',
        name: 'Line Charts',
        link: '/app/charts/line-charts',
        parent: 'charts',
      },
      {
        key: 'bar_charts',
        name: 'Bar Charts',
        link: '/app/charts/bar-charts',
        parent: 'charts',
      },
      {
        key: 'area_charts',
        name: 'Area Charts',
        link: '/app/charts/area-charts',
        parent: 'charts',
      },
      {
        key: 'pie_charts',
        name: 'Pie & Donuts Charts',
        link: '/app/charts/pie-charts',
        parent: 'charts',
      },
      {
        key: 'radar_charts',
        name: 'Radar Charts',
        link: '/app/charts/radar-charts',
        parent: 'charts',
      },
      {
        key: 'scatter_charts',
        name: 'Scatter Charts',
        link: '/app/charts/scatter-charts',
        parent: 'charts',
      },
      {
        key: 'compossed_charts',
        name: 'Compossed Charts',
        link: '/app/charts/compossed-chart',
        parent: 'charts',
      },
      {
        key: 'responsive_charts',
        name: 'Responsive Charts',
        link: '/app/charts/responsive-chart',
        parent: 'charts',
      },
    ]
  },
  {
    key: 'apps',
    name: 'Apps',
    icon: 'bubble_chart',
    child: [
      {
        key: 'social_media',
        name: 'Social Media',
        link: '/app/pages/social-media',
        parent: 'apps',
      },
      {
        key: 'ecommerce',
        name: 'Ecommerce',
        link: '/app/pages/ecommerce',
        parent: 'apps',
      },
      {
        key: 'contact',
        name: 'Contact',
        link: '/app/pages/contact',
        parent: 'apps',
      },
      {
        key: 'calendar',
        name: 'Calendar',
        link: '/app/pages/calendar',
        parent: 'apps',
      },
      {
        key: 'email',
        name: 'Email',
        link: '/app/pages/email',
        parent: 'apps',
      },
      {
        key: 'chat',
        name: 'Chat',
        link: '/app/pages/chat',
        parent: 'apps',
      },
    ]
  },
  {
    key: 'pages',
    name: 'Pages',
    icon: 'library_books',
    child: [
      {
        key: 'user_profile',
        name: 'User Profile',
        link: '/app/pages/user-profile',
        parent: 'pages',
      },
      {
        key: 'gallery',
        name: 'Photo Gallery',
        link: '/app/pages/photo-gallery',
        parent: 'pages',
      },
      {
        key: 'not_found_page',
        name: 'Not Found Page',
        link: '/app/pages/not-found',
        parent: 'pages',
      },
      {
        key: 'error_page',
        name: 'Error Page',
        link: '/app/pages/error',
        parent: 'pages',
      },
      {
        key: 'maintenance',
        name: 'Maintenance',
        link: '/maintenance',
        parent: 'pages',
      },
      {
        key: 'login',
        name: 'Login',
        link: '/login',
        parent: 'pages',
      },
      {
        key: 'register',
        name: 'Register',
        link: '/register',
        parent: 'pages',
      },
      {
        key: 'reset',
        name: 'Reset Password',
        link: '/reset-password',
        parent: 'pages',
      },
      {
        key: 'lock',
        name: 'Lock Screen',
        link: '/lock-screen',
        parent: 'pages',
      },
      {
        key: 'blank',
        name: 'Blank Page',
        link: '/app/pages/blank-page',
        parent: 'pages',
      },
      {
        key: 'help_support',
        name: 'Help & Support',
        link: '/app/pages/help-support',
        parent: 'pages',
      },
    ]
  },
  {
    key: 'maps',
    name: 'Maps',
    icon: 'maps',
    child: [
      {
        key: 'map_marker',
        name: 'Map Marker',
        link: '/app/maps/map-marker',
        parent: 'maps',
      },
      {
        key: 'map_direction',
        name: 'Map Direction',
        link: '/app/maps/map-direction',
        parent: 'maps',
      },
      {
        key: 'map_searchbox',
        name: 'Map with Searchbox',
        link: '/app/maps/map-searchbox',
        parent: 'maps',
      },
      {
        key: 'map_traffic',
        name: 'Traffic Indicator',
        link: '/app/maps/map-traffic',
        parent: 'maps',
      },
      {
        key: 'street_view',
        name: 'Street View',
        link: '/app/maps/street-view',
        parent: 'maps',
      },
    ]
  },
  {
    key: 'menu_levels',
    name: 'Menu Levels',
    icon: 'sort',
    child: [
      {
        key: 'level_1',
        name: 'Level 1',
        link: '/#',
        parent: 'menu_levels',
      },
      {
        key: 'level_2',
        keyParent: 'menu_levels',
        name: 'Level 2',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Sub Menu 1',
            link: '/#',
            parent: 'level_2',
          },
          {
            key: 'sub_menu_2',
            name: 'Sub Menu 2',
            link: '/#',
            parent: 'level_2',
          },
        ]
      },
    ]
  }
];
