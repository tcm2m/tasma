Ext.define('Tasma.view.Map', {
    extend: 'Ext.Container',
    id: 'map-view',

    requires: [
        'Ext.TitleBar',
        'Ext.Map'
    ],

    config: {
        layout: 'fit',
        items: [{
            xtype: 'titlebar',
            title: 'Köpeğim Nerede?',
            docked: 'top',
            items: [{
                iconCls: 'settings',
                ui: 'plain',
                align: 'right'
            }]
        }, {
            xtype: 'map',
            useCurrentLocation: true,
            mapOptions: {
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            }
        }]
    }
});