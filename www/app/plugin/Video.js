Ext.define('Tasma.plugin.Video', {
    extend: 'Ext.Panel',
    alias: 'plugin.dogvideo',
    requires: ['Ext.Video'],

    config: {
        layout: 'fit',
        draggable: true,
        items: {
            xtype: 'video',
            url: 'https://fbcdn-video-a.akamaihd.net/hvideo-ak-ash3/v/760414_10151483287676312_79644525_n.mp4?oh=c2c355db8c564d6ae2442e3c92c0e0fe&oe=51A30E80&__gda__=1369640181_e39c2eb1659f951b86678c21a0410ac3',
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