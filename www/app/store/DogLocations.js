Ext.define('Tasma.store.DogLocations', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Tasma.model.Location',
        proxy: {
            type: 'ajax',
            url: "http://usergridstack.dnsdynamic.com:8080/deneme/sandbox/locations?ql=select * where NOT latitude = 'NaN'",
            reader: {
                type: 'json',
                rootProperty: 'entities',
                totalProperty: 'count'
            },
            extraParams: {
                limit: 999
            }
        },
        autoLoad: true
    }
});