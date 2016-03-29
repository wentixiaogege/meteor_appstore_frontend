if(Apps.find({}).count() < 1){

    var fs = Npm.require('fs');

    fs.readFile('../../../../../server/data.json', 'utf8', Meteor.bindEnvironment(function(err, data) {
        if (err) throw err;
        var newAppData = data.split("\n");

        var apps_list=[]
        var reccomendedApps_list=[]
        for (var i = 0; i < newAppData.length - 1; i++) {
            var rawAppData = JSON.parse(newAppData[i]);
            var newApp = {};


            newApp.name = rawAppData.title;
            newApp.app_id = rawAppData.app_id;
            newApp.developer = rawAppData.developer;
            newApp.description = rawAppData.intro;
            newApp.avgRating = parseInt(rawAppData.score) / 2;
            newApp.iconUrl = rawAppData.thumbnail_url;
            newApp.reccomendedApps = rawAppData.top_5_app;
            newApp.numberOfRecommendations = 0;
            //console.log(newApp.app_id)
            apps_list.push(newApp.app_id)
            reccomendedApps_list.push(newApp.reccomendedApps)

            Apps.insert(newApp);
        }
        // Project Assignment code goes here
        for (var i = 0; i<=apps_list.length - 1; i++) {
            var numberOfRecommendations =0;
            for (var j =0; j<= reccomendedApps_list.length - 1; j++) {
                 if (undefined === reccomendedApps_list[j] || reccomendedApps_list[j].length == 0){
                    continue;
                 }
                 if (reccomendedApps_list[j].indexOf(apps_list[i]) > -1) {
                    numberOfRecommendations ++;
                 }
            };
            //console.log(apps_list[i] + '--'+numberOfRecommendations);
            Apps.update({app_id:apps_list[i]},{$set:{numberOfRecommendations:numberOfRecommendations}});
        };

    }, function(err){
        throw err;
    }));
}
