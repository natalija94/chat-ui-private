import React, {Fragment} from "react";
import ChattingService from "../services/ChattingService";
import {
    mapChatMessagesFromBackendToUIMessages,
    prepareMessageInChatObject,
    UI_FIELDS
} from "../util/businessLogicUtil";

class DiscussionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.sentMessageWithSuccessCallback = this.sentMessageWithSuccessCallback.bind(this);
        this.errorWhileMessageSendingCallback = this.errorWhileMessageSendingCallback.bind(this);
        this.getDiscussionSuccessCallback = this.getDiscussionSuccessCallback.bind(this);
        this.getDiscussionErrorOccurredCallback = this.getDiscussionErrorOccurredCallback.bind(this);

        this.state = {messages: []}
    }

    sentMessageWithSuccessCallback(responseData) {
    }

    errorWhileMessageSendingCallback(error) {
    }

    getDiscussionSuccessCallback(responseData) {
        let messages = mapChatMessagesFromBackendToUIMessages(responseData.data)
        console.log("responseData : ", messages)
        this.setState({messages: messages});
    }

    getDiscussionErrorOccurredCallback(error) {
    }

    componentDidMount() {
        console.log("Component did mount!")
        ChattingService.sendMessage(prepareMessageInChatObject("natalija", "prva poruka"),
            this.sentMessageWithSuccessCallback, this.errorWhileMessageSendingCallback)

        ChattingService.getFullDiscussion(this.getDiscussionSuccessCallback, this.getDiscussionErrorOccurredCallback)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
    }

    stillNoMessagesContent() {
        return <div>
            <p>No messages yet</p>
        </div>
    }

    discussionContent(messages) {
        let messagesToPreview = [];
        messages.forEach((message, index) => {
            messagesToPreview.push(<div key={index}>
                <p> Username: {message[UI_FIELDS.CHAT_MESSAGE.USERNAME]}</p>
                <p> Message: {message[UI_FIELDS.CHAT_MESSAGE.MESSAGE]}</p>
                <p> Date: {message[UI_FIELDS.CHAT_MESSAGE.MESSAGE_SENT]}</p>
            </div>)
        })
        return messagesToPreview;
    }

    render() {
        const {messages} = this.state;

        if (!messages || messages.length == 0) {
            return this.stillNoMessagesContent();
        } else {
            return this.discussionContent(messages);
        }
    }
}

export default DiscussionComponent;