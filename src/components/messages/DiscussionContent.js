import React from "react";
import {CHAT_MESSAGE_STATE, UI_FIELDS} from "../../util/businessLogicUtil";

export function DiscussionContent(props) {
    let messagesToPreview = [];
    props.messages.forEach((message, index) => {
        messagesToPreview.push(<SpecificMessageContent message={message} index={index}
                                                       currentUser={props.currentUser}/>);
    });
    return messagesToPreview;
}

export function SpecificMessageContent(props) {
    let generalMessageAreaStyling = " default-received-message-style";
    let messageFromCurrentUser = props.message[UI_FIELDS.CHAT_MESSAGE.USERNAME] === props.currentUser;
    //todo
    let isOffensiveContent = props.message[UI_FIELDS.CHAT_MESSAGE.MESSAGE_STATE] === CHAT_MESSAGE_STATE.OFFENSIVE;



    let onerow = <div className="row m-0">
        <div className={messageFromCurrentUser? `offset-2 col-10` : "col-10"}>

            <div className={`${generalMessageAreaStyling} ${resolveStylingForMessageType(messageFromCurrentUser, isOffensiveContent)}`}>
                <div className="row justify-content-start m-0">
                    <div className="col-6 text-start">
                        <p  className={"username-style"}>{messageFromCurrentUser ? "You" : props.message[UI_FIELDS.CHAT_MESSAGE.USERNAME]}</p>
                    </div>
                </div>
                <div className="row justify-content-center m-0">
                    <div className="col-10">
                        <p  className={"message-style"}> {isOffensiveContent ? "OFFENSIVE MESSAGE" : props.message[UI_FIELDS.CHAT_MESSAGE.MESSAGE]}</p>
                    </div>
                </div>
                <div className="row justify-content-end m-0">
                    <div className="col-8 text-end">
                        <p className={"date-style"}>{props.message[UI_FIELDS.CHAT_MESSAGE.MESSAGE_SENT]}</p>
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