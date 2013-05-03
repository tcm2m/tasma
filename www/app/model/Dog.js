Ext.define('Tasma.model.Dog', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: ['id', 'name'],
        proxy: {
            type: 'localstorage',
            id: 'dog'
        }
    }
});
