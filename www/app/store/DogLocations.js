Ext.define('Tasma.store.DogLocations', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Tasma.model.Location',
        data: [
            {lat: 40.79219, lng: 29.46806}
        ]
    },

    constructor: function() {
        this.callParent(arguments);

        var me = this;

        setInterval(function() {
            var lastLatLng = me.last();
            var lat, lng;

            if (Math.random() > 0.5) {
                lat = lastLatLng.get('lat') + Math.random() * 0.0001;
                lng = lastLatLng.get('lng') + Math.random() * 0.0001;
            } else {
                lat = lastLatLng.get('lat') - Math.random() * 0.0001;
                lng = lastLatLng.get('lng') - Math.random() * 0.0001;
            }

            me.add({
                lat: lat,
                lng: lng
            });
        }, 10000);
    }
});