Router.configure({
    layoutTemplate: "masterLayout"
});

Router.route('/', {
    name: 'topChart',
    waitOn: function() {
        Meteor.subscribe('apps', {sort: {avgRating: -1, numberOfRecommendations: -1}, limit: 50});
    },
    data: function () {
        return {
            apps: Apps.find({}, {sort: {avgRating: -1, numberOfRecommendations: -1}, limit: 50})
        };
    }
});

Router.route('/app/:app_id', {
    name: 'appPage',
    waitOn: function() {
        Meteor.subscribe('singleApp', this.params.app_id);
    },
    data: function () {
        /*console.log(this.params.app_id)
        console.log(Apps.findOne({app_id:this.params.app_id}));*/
        return Apps.findOne(Apps.findOne({app_id:this.params.app_id}));
    }
});
