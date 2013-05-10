Ext.define('Tasma.plugin.Video', {
    extend: 'Ext.Panel',
    alias: 'plugin.dogvideo',
    requires: ['Ext.Video'],

    config: {
        layout: 'fit',
        draggable: true,
        items: {
            xtype: 'video',
            url: 'http://127.0.0.1:8080',
            autoResume: true,
            posterUrl: 'resources/images/dog_with_camera.jpg'
        }
    },

    init: function(container) {
        container.add(this);
    }
});