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
        var me = this;

        container.add(me);

        container.down('titlebar').add({
            iconCls: 'video',
            handler: function() {
                if (me.isHidden()) {
                    me.show();
                } else {
                    me.hide();
                }
            }
        });
    }
});