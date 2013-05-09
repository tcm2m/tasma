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
            }, {
                iconCls: 'info',
                ui: 'plain',
                align: 'right',
                handler: function() {
                    var panel = this.up('#map-view').down('panel');

                    if (panel.isHidden()) {
                        panel.show();
                    } else {
                        panel.hide();
                    }
                }
            }]
        }, {
            xtype: 'map',
            useCurrentLocation: true,
            mapOptions: {
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            }
        }, {
            xtype: 'panel',
            masked: true,
            hidden: true,
            styleHtmlContent: true,
            left: 20,
            bottom: 20,
            tpl: '<div>Sizden uzaklığı: {distance} metre</div><div>Toplam mesafe: {path_length} metre</div>'
        }]
    }
});