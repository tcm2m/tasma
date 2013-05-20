Ext.define('Tasma.controller.Settings', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.MessageBox'
    ],
    
    config: {
        refs: {
            settingsView: 'x-view-settings',
            saveButton: 'x-view-settings button[ui=action]'
        },

        control: {
            settingsView: {
                show: 'setDogNameFieldValue'
            },
            saveButton: {
                tap: 'saveDog'
            }
        }
    },

    setDogNameFieldValue: function() {
        var dogNameField = this.getSettingsView().down('[name=dog_name]');
        var dogName = this.getApplication().dog.get('name');

        if (dogName) {
            dogNameField.setLabel(dogNameField.getPlaceHolder());
            dogNameField.setValue(dogName);
        }
    },

    saveDog: function() {
        var dogField = this.getSettingsView().down('[name=dog_name]'),
            dogName  = dogField.getValue();

        if (!dogName) {
            Ext.Msg.alert('Hata!', 'Lütfen köpeğinizin adını girin.', function() {
                dogField.focus();
            });

            return;
        }

        var dog = this.getApplication().dog;

        dog.set('name', dogName);
        dog.save(function() {
            Ext.Msg.alert('Ayarlar kaydedildi.');
        });
    }
});