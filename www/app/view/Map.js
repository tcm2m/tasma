Ext.define('Tasma.view.Map', {
    extend: 'Ext.Container',
    xtype: 'x-view-map',

    requires: [
        'Ext.TitleBar',
        'Ext.Map',
        'Tasma.plugin.Video'
    ],

    config: {
        layout: 'fit',
        items: [{
            xtype: 'titlebar',
            title: 'Köpeğim Nerede?',
            docked: 'top'
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
            styleHtmlContent: true,
            left: 20,
            bottom: 20,
            tpl: '<div>Sizden uzaklığı: {distance} metre</div><div>Toplam mesafe: {path_length} metre</div>'
        }],
        plugins: Ext.os.is.Desktop && ('video' in Ext.Object.fromQueryString(location.search)) ? {
            type: 'dogvideo',
            bottom: 20,
            right: 20,
            width: 240,
            height: 160
        } : []
    }
});