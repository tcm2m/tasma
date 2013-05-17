Ext.define('Tasma.model.Location', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'latitude', type: 'float' },
            { name: 'longitude', type: 'float' },
            { name: 'uuid', type: 'string' },
            { name: 'session_id', type: 'string' },
            {
                name: 'created',
                type: 'date',
                convert: function(value) {
                    return Ext.Date.parse(value.toString().substring(0, 10), 'U');
                }
            }
        ],
        idProperty: 'uuid'
    }
});