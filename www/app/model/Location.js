Ext.define('Tasma.model.Location', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'lat', type: 'float' },
            { name: 'lng', type: 'float' },
            { name: 'uuid', type: 'string' },
            { name: 'session_id', type: 'string' },
            { name: 'created', type: 'date' },
            { name: 'gps_data', type: 'string' }
        ]
    }
});