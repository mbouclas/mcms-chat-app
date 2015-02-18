(function() {
    'use strict';
    angular
        .module('mcms')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['Socket','$timeout','lodash'];
    function mainCtrl(Socket,$timeout,lodash){
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

            vm.user = user;
            vm.connectedUsers.push(user);

        });

        Socket.on('newMessage', function (message) {
            vm.messages.push(message);
            console.log(message);
        });

        vm.chooseNickName = function(){
            console.log('Sending new nick ' + vm.nick);
            Socket.emit('chooseNickname',vm.nick);
        };

        vm.sendPublicMessage = function () {
            console.log('sending',vm.message);
            Socket.emit('newMessage',vm.message);
            vm.message = '';
        };
    }
})();