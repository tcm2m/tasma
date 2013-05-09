Ext.define('Tasma.model.Location', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'lat', type: 'float' },
            { name: 'lng', type: 'float' }
        ]
    }
});