Ext.define('Tasma.controller.Settings', {
    extend: 'Ext.app.Controller',

    requires: ['Ext.MessageBox'],
    
    config: {
        routes: {
            settings: 'showSettings'
        },

        refs: {
            settingsView: '#settings-view',
            saveButton: '#settings-view button[ui=action]'
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

    showSettings: function() {
        Ext.Viewport.animateActiveItem(this.getSettingsView(), {type: 'cover', direction: 'down'});
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
        var dogName = this.getSettingsView().down('[name=dog_name]').getValue();

        if (!dogName) {
            Ext.Msg.alert('Hata!', 'Lütfen köpeğinizin adını girin.');

            return;
        }

        var dog = this.getApplication().dog;

        dog.set('name', dogName);
        dog.save();

        this.redirectTo('');
    }
});