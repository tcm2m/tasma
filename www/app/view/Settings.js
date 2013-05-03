Ext.define('Tasma.view.Settings', {
    extend: 'Ext.Container',
    id: 'settings-view',

    requires: [
        'Ext.form.FieldSet'
    ],

    config: {
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                name : 'dog_name',
                required: true,
                placeHolder: 'Köpeğinizin adı'
            }]
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            layout: {
                pack: 'center'
            },
            items: {
                xtype: 'button',
                text: 'Kaydet',
                ui: 'action',
                flex: 1
            }
        }]
    }
});
