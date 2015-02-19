(function() {
    'use strict';
    angular.module('mcms')
        .service('store', store);

    store.$inject = ['$rootScope'];

    function store($rootScope){

        var service = {
            put: function (key,data) {
                localStorage.setItem(key,angular.toJson(data));
            },
            get: function (key) {
                return angular.fromJson(localStorage.getItem(key));
            }
        };

        return service;
    }
})();
