module.exports = (function (io) {
    require('lodash');
    var connectedClients = {};
    // list of socket ids
    var clients = [];
    var namesUsed = [];
    var messages = [];

    var serverUi = io.of('/server-ui');


    serverUi.on('connection', function (socket) {
        initializeConnection(socket);
        handleChoosingconnectedClients(socket);
        handleClientDisconnections(socket);
        handleMessageBroadcasting(socket);
        handlePrivateMessaging(socket);


    });




    function initializeConnection(socket){
        showActiveUsers(socket);
        showOldMsgs(socket);
    }

    function showActiveUsers(socket){
        var activeNames = [];

        var usersInRoom = io.sockets.connected;

        for (var index in usersInRoom){
            var userSocketId = usersInRoom[index].id;

            if (userSocketId !== socket.id && connectedClients[userSocketId]){
                var name = connectedClients[userSocketId];
                activeNames.push(connectedClients[userSocketId]);
            }
        }
        socket.emit('names', activeNames);
    }

    function showOldMsgs(socket){
/*        db.getOldMsgs(5, function(err, docs){
            socket.emit('load old msgs', docs);
        });*/
    }

    function handleChoosingconnectedClients(socket){
        socket.on('chooseNickname', function(nick, cb) {
            if (namesUsed.indexOf(nick) !== -1) {

                socket.emit('newUser', {id: null, msg: 'nameTaken'});
                return;
            }
            var ind = namesUsed.push(nick) - 1;
            clients[ind] = socket;
            connectedClients[socket.id] = {id: ind, nick: nick};

            serverUi.emit('newUser', {id: ind, nick: nick});
            showActiveUsers(socket)
        });
    }

    function handleMessageBroadcasting(socket){
        socket.on('newMessage', function(msg){
            var nick = connectedClients[socket.id];
/*            db.saveMsg({nick: nick, msg: msg}, function(err){
                if(err) throw err;
                io.sockets.emit('message', {nick: nick, msg: msg});
            });*/
            serverUi.emit('newMessage', {from: nick, text: msg,created_at: new Date()});
        });
    }

    function handlePrivateMessaging(socket){
        socket.on('private message', function(data){
            var from = connectedClients[socket.id];
            clients[data.userToPM].emit('private message', {from: from, msg: data.msg});
        });
    }

    function handleClientDisconnections(socket){
        socket.on('disconnect', function(){
            var ind = namesUsed.indexOf(connectedClients[socket.id]);
            delete namesUsed[ind];
            delete clients[ind];
            delete connectedClients[socket.id];
            io.sockets.emit('user disconnect', ind);
        });
    }
});