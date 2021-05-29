import React from "react";
import {ChattingService, CHAT_SERVER_URL} from "../services/ChattingService";
import {
    CHAT_MESSAGE_STATE, DISCUSSION_CONTENT_FILTER,
    mapChatMessagesFromBackendToUIMessages,
    prepareMessageInChatObject
} from "../util/businessLogicUtil";
import {StillNoMessagesContent} from "./messages/StillNoMessagesContent";
import {DiscussionContent} from "./messages/DiscussionContent";
import SendMessageForm from "./SendMessageForm";
import {ChatStompLogic} from "../util/ChatStompLogic";


var chatBus;
var countdownIntervalForInappropriateMessage;
var countdownNewMessagesGreenLight;

class DiscussionFrame extends React.Component {
    constructor(props) {
        super(props);
        this.sentMessageWithSuccessCallback = this.sentMessageWithSuccessCallback.bind(this);
        this.errorWhileMessageSendingCallback = this.errorWhileMessageSendingCallback.bind(this);
        this.getDiscussionSuccessCallback = this.getDiscussionSuccessCallback.bind(this);
        this.getDiscussionErrorOccurredCallback = this.getDiscussionErrorOccurredCallback.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.handleFullDiscussion = this.handleFullDiscussion.bind(this);
        this.handlePaginatedDiscussion = this.handlePaginatedDiscussion.bind(this);


        this.handleRedCircleWhenNewMessageIsSent = this.handleRedCircleWhenNewMessageIsSent.bind(this);
        this.handleGreenCircleWhenNewMessagesCome = this.handleGreenCircleWhenNewMessagesCome.bind(this);


        this.initStompClient = this.initStompClient.bind(this);

        //my initial idea was to handle pagination, that's why we have currentPage here...
        // unfortunately, I didn't have enough time for that :(
        this.state = {
            messages: [],
            currentPage: 0,
            currentUser: "not_defined",
            messagesFilter: DISCUSSION_CONTENT_FILTER.NONE,

            //for handling
            justSentOffensiveMessage: false,
            newMessages: false
        }
    }

    handleGreenCircleWhenNewMessagesCome() {
        clearInterval(countdownNewMessagesGreenLight);
        this.setState({newMessages: true});
        countdownNewMessagesGreenLight = setInterval(() => {
            this.setState({newMessages: false});
        }, 1000)
    }

    handleRedCircleWhenNewMessageIsSent(responseData) {
        if (responseData.data === CHAT_MESSAGE_STATE.OFFENSIVE) {
            //show red circle as a sign that something is wrong!! (inappropriate message)
            this.setState({justSentOffensiveMessage: true});
            countdownIntervalForInappropriateMessage = setInterval(() => {
                this.setState({justSentOffensiveMessage: false});
            }, 1000)
        } else {
            this.setState({justSentOffensiveMessage: false});
            clearInterval(countdownIntervalForInappropriateMessage);
        }
    }

    sentMessageWithSuccessCallback(responseData) {
        this.handleGreenCircleWhenNewMessagesCome();
        //handle just received offensive message
        this.handleRedCircleWhenNewMessageIsSent(responseData);
    }

    errorWhileMessageSendingCallback(error) {
        alert(`Error: ${error}`)
    }

    getDiscussionSuccessCallback(responseData) {
        let messages = mapChatMessagesFromBackendToUIMessages(responseData.data);
        this.setState({messages: messages});
    }

    getDiscussionErrorOccurredCallback(error) {
        alert(`Error: ${error}`)
    }

    sendMessage(message) {
        clearInterval(countdownIntervalForInappropriateMessage);
        ChattingService.sendMessage(prepareMessageInChatObject(this.state.currentUser, message),
            this.sentMessageWithSuccessCallback, this.errorWhileMessageSendingCallback)
    }

    componentDidMount() {
        let person = prompt("This is chat room regarding pollution. Our idea is to report places hardly polluted. " +
            "Also, we can organize volunteering actions here in order to make our environment clean and safe. " +
            "Please enter your username in order to continue: ", "user_1");
        this.setState({currentUser: person})
        //start communication over socket
        this.initStompClient();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state && this.state.currentUser && this.state.currentUser !== (prevState ? prevState.currentUser : undefined)) {
            //http communication, initial result
            //this could be accessed over socket, too (I would rather do that)
            //anyway, I wanted to use http rest, too :)

            //todo : +if I had enough time I would definitely handle current page differently, so it would be paginated response;
            // I mean imagine 1000000 at once returned from server :O
            // ChattingService.getDiscussionPaginated(this.state.currentPage, this.state.messagesFilter,
            //     this.getDiscussionSuccessCallback, this.getDiscussionErrorOccurredCallback);

            //return full conversation as it was requested in the task description, this.state.messageFilter is mocked in this version
            ChattingService.getFullDiscussion(this.state.messagesFilter,
                this.getDiscussionSuccessCallback, this.getDiscussionErrorOccurredCallback);
        }
    }

    initStompClient() {
        chatBus = new ChatStompLogic(
            {
                host: CHAT_SERVER_URL,
                onConnected: () => {
                    console.log("Connected over Stomp!!!")
                },
                handlePaginatedDiscussion: this.handlePaginatedDiscussion,
                handleFullDiscussion: this.handleFullDiscussion
            }
        );
    }

    handlePaginatedDiscussion(response) {
        if (response) {
            this.getDiscussionSuccessCallback(response);
            this.handleGreenCircleWhenNewMessagesCome();
        }
    }

    handleFullDiscussion(response) {
        if (response) {
            this.getDiscussionSuccessCallback(response);
            this.handleGreenCircleWhenNewMessagesCome();
        }
    }

    render() {
        const {messages, currentUser} = this.state;
        let content;

        if (!messages || messages.length == 0) {
            content = <StillNoMessagesContent/>;
        } else {
            content = <DiscussionContent messages={messages} currentUser={this.state.currentUser}/>;
        }

        return <div className={"chat-container m-1"}>
            <div className={"col-lg-6 mx-auto chat-content"}>
                <div className={"chat-received-messages"}>
                    {content}
                </div>
            </div>
            <div className={"col-lg-6 mx-auto send-new-message-content"}>
                <SendMessageForm currentUser={currentUser}
                                 sendMessage={this.sendMessage}

                                 justSentOffensiveMessage={this.state.justSentOffensiveMessage}
                                 newMessageReceived={this.state.newMessages}/>
            </div>
        </div>;
    }
}

export default DiscussionFrame;