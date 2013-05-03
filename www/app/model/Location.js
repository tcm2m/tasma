Ext.define('Tasma.model.Location', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'lat', type: 'float' },
            { name: 'lon', type: 'float' }
        ],
        belongsTo: 'Tasma.model.Dog'
    }
});