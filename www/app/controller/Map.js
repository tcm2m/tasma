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
                icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                },
                offset: '100%'
            }],
            map: gMap
        });
        var latLngBounds = new google.maps.LatLngBounds();


        var lastLatLng = this.getLocationStore().first();

        var startPoint = new google.maps.Marker({
            position: new google.maps.LatLng(lastLatLng.get('latitude'), lastLatLng.get('longitude')),
            map: gMap,
            title: 'Buradasınız'
        });

        var updatePath = function(record) {
            var point = new google.maps.LatLng(record.get('latitude'), record.get('longitude'));

            dogPath.getPath().push(point);

            latLngBounds.extend(point);
        };

        this.getLocationStore().each(updatePath);

        gMap.fitBounds(latLngBounds);

        this.getLocationStore().on('addrecords', function(store, records) {
            records.forEach(updatePath);

            gMap.fitBounds(latLngBounds);

            var distance = google.maps.geometry.spherical.computeDistanceBetween(startPoint.getPosition(), dogPath.getPath().getAt(dogPath.getPath().getLength() - 1));
            var pathLength = google.maps.geometry.spherical.computeLength(dogPath.getPath());

            this.getMapView().down('panel').setMasked(false).setData({
                distance: Math.ceil(distance),
                path_length: Math.ceil(pathLength)
            });
        }, this);
    }
});