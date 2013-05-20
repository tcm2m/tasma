Ext.define('Tasma.view.Settings', {
    extend: 'Ext.Container',
    xtype: 'x-view-settings',

    requires: [
        'Ext.form.FieldSet'
    ],

    config: {
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        items: [{
            xtype: 'titlebar',
            title: 'Ayarlar',
            docked: 'top',
            items: {
                xtype: 'button',
                text: 'Kaydet',
                ui: 'action',
                align: 'right'
            }
        }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                name : 'dog_name',
                required: true,
                placeHolder: 'Köpeğinizin adı'
            }]
        }]
    }
});
