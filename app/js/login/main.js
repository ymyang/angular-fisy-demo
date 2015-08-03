/**
 * Created by yang on 2015/7/24.
 */
var TAG = "[login]-";

require('angular');

var login = angular.module('login', []);

require('./controllers/LoginCtrl.js');

login.config(function($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("!");
});

login.run(function ($document) {
    console.log(TAG, 'login run');

    $document[0].title = 'Ò»Á£ÔÆÅÌ-µÇÂ¼';
});

angular.bootstrap(document, ['login']);
