/*
 * Basically this is just a bootloader. We're adding all the modules in here
 * No controllers of logic should reside in here
 */
var baseTemplateUrl = '/partials/';
(function() {
    'use strict';
    var baseUrl = '/api/';
    var extraModules = [];

    var angularModules = ['ngRoute','ngSanitize','btford.socket-io'];
    angularModules = angular.extend(angularModules,extraModules);

    angular.module('mcms', angularModules)
        .service('lodash', lodash)
        .service('slugifyService', slugifyService)
        .service('moment', momentService)
        .config(config);

    config.$inject = ['$routeProvider','$locationProvider','$httpProvider'];
    function config($routeProvider,$locationProvider,$httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: baseTemplateUrl + 'index.html',
                controller: 'mainCtrl',
                controllerAs: 'Main'
            });
    }


})();