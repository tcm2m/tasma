Ext.define('Tasma.store.DogLocations', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Tasma.model.Location',
        proxy: {
            type: 'ajax',
            url: 'https://api.usergrid.com/none/sandbox/locations',
            reader: {
                type: 'json',
                rootProperty: 'entities',
                totalProperty: 'count'
            }
        },
        autoLoad: true
    }
});