(function() {
    'use strict';

    angular.module('mcms')
        .directive('startPrivateChat', startPrivateChat);

    startPrivateChat.$inject = ['$rootScope','$compile','$templateCache'];

    function startPrivateChat($rootScope,$compile,$templateCache) {

        var directive = {
            restrict: 'A',
            templateUrl: baseTemplateUrl + 'startPrivateChat.directive.html',
            link: linkFunc,
            controller: startPrivateChatCtrl,
            controllerAs: 'Chat'
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.started = false;

            el.bind("click", function(){
                if (!scope.started){
                    angular.element(document.getElementById('space-for-chats')).
                        append($compile($templateCache.get(baseTemplateUrl + 'startPrivateChat.directive.html')[1])(scope));
                    scope.started = true;
                }

            });
        }

    }

    function startPrivateChatCtrl(){

    }

})();