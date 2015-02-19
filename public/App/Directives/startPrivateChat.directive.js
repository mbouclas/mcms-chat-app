(function() {
    'use strict';

    angular.module('mcms')
        .directive('startPrivateChat', startPrivateChat);

    startPrivateChat.$inject = ['$rootScope','$compile','$templateCache','messanger'];
    startPrivateChatCtrl.$inject = ['$scope','Socket','$rootScope','messanger'];

    function startPrivateChat($rootScope,$compile,$templateCache,messanger) {

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
            scope.userTo = attr.uid;
            scope.userNameTo = attr.uname;

            el.bind("click", function(){
                if (!scope.started){
                    openPrivateChat(el,scope,$compile,$templateCache);
                }
            });

            scope.$on('openPrivateChat',function(){
                openPrivateChat(el,scope,$compile,$templateCache);
            });
        }

    }

    function openPrivateChat(el,scope,$compile,$templateCache){
        if (scope.started){
            return;
        }
        angular.element(document.getElementById('space-for-chats')).
            append($compile($templateCache.get(baseTemplateUrl + 'startPrivateChat.directive.html')[1])(scope));
        scope.started = true;
    }

    function startPrivateChatCtrl($scope,Socket,$rootScope,messanger){
        var vm = this;
        vm.messages = [];
        vm.message = '';
        vm.user = $rootScope.user;

        vm.sendPrivateMessage = function(){
            console.log('Sending PM to ' + $scope.userTo);
            Socket.emit('privateMessage',{
                userToPM : $scope.userTo,
                msg : vm.message
            });

            vm.messages.push({
                from : $rootScope.user,
                msg : vm.message,
                createdAt : new Date()
            });
            vm.message = '';
        };

        $rootScope.$on('privateMessage',function(event,message){

            $scope.$broadcast('openPrivateChat');
            vm.messages.push(message);

        });

    }

})();