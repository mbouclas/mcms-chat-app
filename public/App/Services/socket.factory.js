(function() {
    'use strict';

    angular.module('mcms')
        .factory('Socket', Socket);

    Socket.$inject = ['socketFactory'];

    function Socket(socketFactory) {
        //var Socket = io.connect();
        var Socket = io('http://localhost:3000/server-ui');
        var mySocket = socketFactory({
            ioSocket: Socket
        });

        return mySocket;
    }
})();