(function() {
    'use strict';
    angular
        .module('mcms')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['Socket','$timeout','lodash','$rootScope','messanger'];
    function mainCtrl(Socket,$timeout,lodash,$rootScope,messanger){
        var vm = this;
        vm.user = {};
        vm.connectedUsers = [];
        vm.messages = [];
        vm.message = '';

        Socket.on('connect',function(){
            console.log('Connected to Server');
        });

        Socket.on('names',function(users){
            console.log(users);
           vm.connectedUsers = users;
        });


        Socket.on('newUser',function(user){
            console.log('new user subscribed',user);
            if (user.id == null){
                return;//show an error
            }

            vm.connectedUsers.push(user);

        });

        Socket.on('newMessage', function (message) {
            vm.messages.push(message);
        });

        Socket.on('privateMessage',function(message){
            $rootScope.$broadcast('privateMessage',message);
        });

        vm.chooseNickName = function(){
            console.log('Sending new nick ' + vm.nick);
            vm.user = {nick : vm.nick};
            $rootScope.user = vm.user;
            Socket.emit('chooseNickname',vm.nick);
        };

        vm.sendPublicMessage = function () {
            console.log('sending',vm.message);
            Socket.emit('newMessage',vm.message);
            vm.message = '';
        };
    }
})();