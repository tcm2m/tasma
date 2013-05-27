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
                limit: 1
            }
        },
        autoLoad: true
    },

    constructor: function() {
        var me    = this,
            limit = 1;

        setInterval(function() {
            limit++;

            me.load({
                params: {limit: limit}
            });
        }, 5000);

        this.callParent(arguments);
    }
});