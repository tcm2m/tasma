// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'Tasma': 'app'
});
//</debug>

Ext.application({
    name: 'Tasma',

    models:[
        'Dog',
        'Location'
    ],

    stores: ['DogLocations'],

    views: [
        'Map',
        'Settings'
    ],

    controllers: [
        'Map',
        'Settings'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        Ext.fly('appLoadingIndicator').destroy();

        this.dog = Ext.create('Tasma.model.Dog', {id: 'my_dog'});

        Ext.ModelMgr.getModel('Tasma.model.Dog').load('my_dog', {
            success: function(dog) {
                this.dog = dog;
            },
            scope: this
        });

        Ext.Viewport.add([
            Ext.create('Tasma.view.Map'),
            Ext.create('Tasma.view.Settings')
        ]);
    },

    onUpdated: function() {
        window.location.reload();
    }
});
