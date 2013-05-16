Ext.define('Tasma.store.DogLocations', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Tasma.model.Location',
        proxy: {
            type: 'ajax',
            url: 'https://usergridstack.dnsdynamic.com/deneme/sandbox/locations',
            reader: {
                type: 'json',
                rootProperty: 'entities',
                totalProperty: 'count'
            }
        },
        autoLoad: true
    }
});