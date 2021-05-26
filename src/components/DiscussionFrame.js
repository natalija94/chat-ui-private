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

        this.state = {
            messages: [],
            currentPage: 0,
            currentUser: "natalija",
            messagesFilter: DISCUSSION_CONTENT_FILTER.NONE}
    }

    sentMessageWithSuccessCallback(responseData) {
        if (responseData.data === CHAT_MESSAGE_STATE.OFFENSIVE)
            alert(`Inappropriate content`)
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
        ChattingService.sendMessage(prepareMessageInChatObject(this.state.currentUser, message),
            this.sentMessageWithSuccessCallback, this.errorWhileMessageSendingCallback)
    }

    componentDidMount() {
        //http communication
        ChattingService.getDiscussionPaginated(this.state.currentPage, this.state.messagesFilter,
            this.getDiscussionSuccessCallback, this.getDiscussionErrorOccurredCallback)


        //communication via socket
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
        if (response)
            this.getDiscussionSuccessCallback(response);
    }

    handleFullDiscussion(response) {
        if (response)
            this.getDiscussionSuccessCallback(response);
    }

    render() {
        const {messages, currentUser} = this.state;
        let content;

        if (!messages || messages.length == 0) {
            content = <StillNoMessagesContent/>;
        } else {
            content = <DiscussionContent messages={messages} currentUser={this.state.currentUser}/>;
        }

        return <div className={"row height-100 margin-50"}>
            <div className={"offset-1 col-lg-4 margin-80per"}>
                <SendMessageForm currentUser={currentUser} sendMessage={this.sendMessage}/>
            </div>
            <div className={"col-lg-6 height-80 chat-scroll"}>
                <div className={"chat-received-messages"}>
                    {content}
                </div>
            </div>
        </div>;
    }
}

export default DiscussionFrame;