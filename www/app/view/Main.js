Ext.define('Tasma.view.Main', {
    extend: 'Ext.TabPanel',
    id: 'main-view',

    config: {
        tabBarPosition: 'bottom',

        items: [{
            xtype: 'x-view-map',
            title: 'Harita',
            iconCls: 'maps'
        }, {
            xtype: 'x-view-settings',
            title: 'Ayarlar',
            iconCls: 'settings'
        }]
    }
});