Ext.define('Tasma.plugin.Video', {
    extend: 'Ext.Panel',
    alias: 'plugin.dogvideo',
    requires: ['Ext.Video'],

    config: {
        layout: 'fit',
        draggable: true,
        items: {
            xtype: 'video',
            url: 'resources/videos/Dog head cam go pro.mp4',
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