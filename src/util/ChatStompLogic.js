import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


export function ChatStompLogic(params) {
    var scope = this;
    scope.properties = Object.assign({}, {
        host: "http://localhost:10700",
        handlePaginatedDiscussion:()=>{},
        handleFullDiscussion:()=>{},
        onConnected: "",
        debug: false,
    }, params);

    var stompClient = null;
    let chatServer = "/discuss/synchronize";

    openConnection();

    function openConnection() {
        var socket = new SockJS(scope.properties.host + chatServer);
        stompClient = Stomp.over(socket);
        stompClient.reconnect_delay = 1000;
        stompClient.debug = null;
        stompClient.connect({}, function (frame) {
            console.log('Reconnected: ' + frame);

            stompClient.subscribe('/full-discussion', function (result) {
                console.log("/full-discussion  result: ", result);
                scope.properties.handleFullDiscussion(JSON.parse(result.body));
            });
            stompClient.subscribe('/paginated-discussion', function (result) {
                console.log("/paginated-discussion result:-> ", result);
                scope.properties.handlePaginatedDiscussion(JSON.parse(result.body));
            });
            scope.properties.onConnected();
        });
    }
    //just an example of sent requests over socket
    this.sendName = function (request) {
        if (stompClient !== null) {
            stompClient.send(chatServer+"/hello", {}, JSON.stringify(request));
        }
    };
    this.disconnect = function () {
        if (stompClient !== null) {
            stompClient.deactivate();
        }
    };
}

