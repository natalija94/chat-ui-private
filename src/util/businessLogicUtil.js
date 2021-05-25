export const NUMBER_OF_MESSAGES_PER_PAGE = 20;

export const DISCUSSION_CONTENT_FILTER = Object.freeze({
    NONE: "NONE",
    APPROPRIATE_CONTENT: "APPROPRIATE_CONTENT",
    OFFENSIVE_CONTENT: "OFFENSIVE_CONTENT"
});

export const SERVER_DTO_CONSTANTS = Object.freeze({
    CHAT_MESSAGE: {
        USERNAME: "username",
        MESSAGE: "message",
        MESSAGE_SENT: "messageDate"
    },
})

export const UI_FIELDS = Object.freeze({
    CHAT_MESSAGE: {
        USERNAME: "username",
        MESSAGE: "message",
        MESSAGE_SENT: "messageDate"
    },
})

export function prepareMessageInChatObject(username, message) {
    //todo: maybe prepare date, too
    return {
        [SERVER_DTO_CONSTANTS.CHAT_MESSAGE.USERNAME]: username,
        [SERVER_DTO_CONSTANTS.CHAT_MESSAGE.MESSAGE]: message
    };
}

export function mapUIChatMessageObjectFromBackendObject(backendMessageData) {
    //todo: maybe prepare date, too
    return {
        [UI_FIELDS.CHAT_MESSAGE.USERNAME]: backendMessageData[SERVER_DTO_CONSTANTS.CHAT_MESSAGE.USERNAME],
        [UI_FIELDS.CHAT_MESSAGE.MESSAGE]: backendMessageData[SERVER_DTO_CONSTANTS.CHAT_MESSAGE.MESSAGE],
        [UI_FIELDS.CHAT_MESSAGE.MESSAGE_SENT]: backendMessageData[SERVER_DTO_CONSTANTS.CHAT_MESSAGE.MESSAGE_SENT],
    };
}

export function mapChatMessagesFromBackendToUIMessages(messagesFromBackend) {
    if (!messagesFromBackend || messagesFromBackend.length == 0) {
        return [];
    } else {
        let messagesArray = [];
        messagesFromBackend.forEach(backendMessageData => {
            messagesArray.push(mapUIChatMessageObjectFromBackendObject(backendMessageData));
        })
        return messagesArray;
    }

}