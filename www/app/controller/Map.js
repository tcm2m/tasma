Ext.define('Tasma.controller.Map', {
    extend: 'Ext.app.Controller',
    
    config: {
        routes: {
            '': 'showMap'
        },
        refs: {
            mapView: '#map-view',
            settingsButton: '#map-view button[iconCls=settings]'
        },
        control: {
            mapView: {
                show: 'updateTitleBar'
            },
            settingsButton: {
                tap: 'redirectToSettings'
            }
        }
    },

    launch: function() {
        if (!this.getApplication().dog.get('name')) {
            this.redirectToSettings();
        }
    },

    showMap: function() {
        Ext.Viewport.animateActiveItem(this.getMapView(), {type: 'reveal', direction: 'up'});
    },

    updateTitleBar: function() {
        this.getMapView().down('titlebar').setTitle(this.getApplication().dog.get('name') + ' nerede?');
    },

    redirectToSettings: function() {
        this.redirectTo('settings');
    }
});