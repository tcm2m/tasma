Ext.define('Tasma.controller.Map', {
    extend: 'Ext.app.Controller',

    config: {
        routes: {
            '': 'showMap'
        },
        refs: {
            mapView: '#map-view',
            map: '#map-view map',
            settingsButton: '#map-view button[iconCls=settings]'
        },
        control: {
            mapView: {
                show: 'updateTitleBar'
            },
            map: {
                maprender: 'drawDogPath'
            },
            settingsButton: {
                tap: 'redirectToSettings'
            }
        },

        locationStore: null
    },

    init: function() {
        this.setLocationStore(Ext.create('Tasma.store.DogLocations'));
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
    },

    drawDogPath: function(mapComp) {
        var geo = mapComp.getGeo();

        geo.setAutoUpdate(false);

        var gMap = mapComp.getMap();
        var dogPath = new google.maps.Polyline({
            geodesic: true,
            strokeColor: '#FF0000',
            icons: [{
                icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
                offset: '100%'
            }],
            map: gMap
        });
        var latLngBounds = new google.maps.LatLngBounds();


        var lastLatLng = this.getLocationStore().first();

        var startPoint = new google.maps.Marker({
            position: new google.maps.LatLng(lastLatLng.get('lat'), lastLatLng.get('lng')),
            map: gMap,
            title: 'Buradasınız'
        });

        var updatePath = function(record) {
            var point = new google.maps.LatLng(record.get('lat'), record.get('lng'));

            dogPath.getPath().push(point);

            latLngBounds.extend(point);
        };

        this.getLocationStore().each(updatePath);

        gMap.fitBounds(latLngBounds);

        this.getLocationStore().on('addrecords', function(store, records) {
            records.forEach(updatePath);

            gMap.fitBounds(latLngBounds);

            var distance = google.maps.geometry.spherical.computeDistanceBetween(startPoint.getPosition(), dogPath.getPath().getAt(dogPath.getPath().getLength() - 1));

            this.getMapView().down('titlebar').setTitle(Ext.util.Format.format('{0} sizden {1} metre uzakta', this.getApplication().dog.get('name'), Math.ceil(distance)));
        }, this);
    }
});