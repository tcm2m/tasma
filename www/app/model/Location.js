Ext.define('Tasma.model.Location', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'lat', type: 'float' },
            { name: 'lng', type: 'float' },
            { name: 'session_id', type: 'string' },
            {
                name: 'created',
                type: 'date',
                convert: function(value) {
                    return Ext.Date.parse(value.toString().substring(0, 10), 'U');
                }
            }
        ]
    }
});