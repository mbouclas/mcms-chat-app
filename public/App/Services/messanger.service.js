(function() {
    'use strict';
    angular.module('mcms')
        .service('messanger', messanger);

    messanger.$inject = ['$rootScope'];

    function messanger($rootScope){
        var listeners = [];
        var service = {
            subscribe: function (callback) {
                listeners.push(callback);
            },
            publish: function (msg) {
                angular.forEach(listeners, function (value, key) {
                    value(msg);
                });
            }
        };

        return service;
    }
})();
