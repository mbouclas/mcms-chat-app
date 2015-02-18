(function() {
    'use strict';
    angular.module('mcms')
        .service('baseXhr',baseXhr);

    baseXhr.$inject = ['$http', '$q', '$rootScope'];

    function baseXhr($http, $q, $rootScope) {
        var baseUrl = '/api/clients/';
        var service = {
            getClients: getClients,
            getClient: getClient,
            updateClients: updateClients,
            saveClient: saveClient
        };

        return service;

        function post(url, options) {
            var defer = $q.defer();
            var params = (typeof options != 'undefined') ? angular.copy(options) : {};
            params = angular.extend(params, {_csrf: $rootScope.CSRF});

            $rootScope.loading = true;
            $http.post(url, params).
                success(function (data, status) {
                    defer.resolve(data);
                    $rootScope.loading = false;
                });
            return defer.promise;
        }

        function getClients(options) {

            return post(baseUrl + 'find', options);
        }

        function getClient(options) {
            return post(baseUrl + 'findOne', options);
        }

        function updateClients(options) {
            return post(baseUrl + 'update', options);
        }

        function saveClient(options) {
            return post(baseUrl + 'updateOne', options);
        }
    }
})();