import React from "react";
import {UI_FIELDS} from "../../util/businessLogicUtil";

export function DiscussionContent(props) {
    let messagesToPreview = [];
    props.messages.forEach((message, index) => {
        messagesToPreview.push(<SpecificMessageContent message={message} index={index}
                                                       currentUser={props.currentUser}/>);
    });
    return messagesToPreview;
}

export function SpecificMessageContent(props) {
    let generalMessageAreaStyling = "container default-received-message-style"
    let messageFromCurrentUser = props.message[UI_FIELDS.CHAT_MESSAGE.USERNAME] == props.currentUser;
    //todo
    let isOffensiveContent = false;



    let onerow = <div className="row">
        <div className={messageFromCurrentUser? `col-md-9 offset-md-3` : "col-lg-9"}>

            <div className={`${generalMessageAreaStyling} ${resolveStylingForMessageType(messageFromCurrentUser, isOffensiveContent)}`}>
                <div className="row justify-content-start">
                    <div className="col-4 text-start">
                        <p  className={"username-style"}> Username: {messageFromCurrentUser ? "You" : props.message[UI_FIELDS.CHAT_MESSAGE.USERNAME]}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <p  className={"message-style"}> {isOffensiveContent ? "OFFENSIVE MESSAGE" : props.message[UI_FIELDS.CHAT_MESSAGE.MESSAGE]}</p>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-4 text-end">
                        <p className={"date-style"}> Date: {props.message[UI_FIELDS.CHAT_MESSAGE.MESSAGE_SENT]}</p>
                    </div>
                </div>
            </div>


        </div>
    </div>;
    return onerow;
}

function resolveStylingForMessageType(messageFromCurrentUser, isOffensiveMessage) {
    let styling = "";
    if (messageFromCurrentUser) {
        styling = `${styling} current-user-received-message left-margin-20px`
    } else {
        styling = `${styling} another-user-received-message text-left`
    }

    if (isOffensiveMessage) {
        styling = `${styling} received-message-offensive`
    }

    return styling;
}