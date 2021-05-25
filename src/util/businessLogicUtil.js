export const NUMBER_OF_MESSAGES_PER_PAGE = 20;

export const DISCUSSION_CONTENT_FILTER = Object.freeze({
    NONE: "NONE",
    APPROPRIATE_CONTENT: "APPROPRIATE_CONTENT",
    OFFENSIVE_CONTENT: "OFFENSIVE_CONTENT"
});

export function prepareMessageInChatObject(username, message) {
    //todo: maybe prepare date, too
    return {
        username: username,
        message: message
    };
}