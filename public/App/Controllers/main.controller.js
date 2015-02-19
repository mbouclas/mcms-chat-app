(function() {
    'use strict';
    angular
        .module('mcms')
        .service('lodash',lodash)
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['Socket','$timeout','lodash','$rootScope','store'];
    function mainCtrl(Socket,$timeout,lodash,$rootScope,store){
        var vm = this;
        vm.user = {};
        vm.connectedUsers = [];
        vm.messages = [];
        vm.message = '';
        var storedUser = store.get('user');

        Socket.on('connect',function(){
            console.log('Connected to Server');
        });

        Socket.on('names',function(users){
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

        Socket.on('userDisconnect',function(user){
            var ind = lodash.findIndex(vm.connectedUsers,{nick : user.nick});
            vm.connectedUsers.splice(ind,1);

        });

        vm.chooseNickName = function(){
            console.log('Sending new nick ' + vm.nick);
            vm.user = {nick : vm.nick};
            $rootScope.user = vm.user;
            store.put('user',vm.user);
            Socket.emit('chooseNickname',vm.nick);
        };

        vm.sendPublicMessage = function () {
            console.log('sending',vm.message);
            Socket.emit('newMessage',vm.message);
            vm.message = '';
        };


        if (storedUser){
            vm.nick = storedUser.nick;
            vm.chooseNickName();
        }
    }
})();