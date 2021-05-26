import {handleGetRequest, handlePostRequest} from "../util/RestUtil";
import {DISCUSSION_CONTENT_FILTER, NUMBER_OF_MESSAGES_PER_PAGE} from "../util/businessLogicUtil";


export const CHAT_SERVER_URL = "http://localhost:10700";
const DISCUSSION_GLOBAL_PATH = "/discuss";
const DISCUSSION_CONTROLLER = CHAT_SERVER_URL + DISCUSSION_GLOBAL_PATH;

const GET_PART_OF_DISCUSSION_PATH = "/discussion-part";
const GET_FULL_DISCUSSION_PATH = "/full-discussion";
const SEND_MESSAGE_PATH = "/send-message";

export class ChattingService {

    static getDiscussionPaginated(pageNumber, filter, onSuccess, onError) {
        handleGetRequest(DISCUSSION_CONTROLLER + GET_PART_OF_DISCUSSION_PATH, [`page=${pageNumber}`,
                `filter=${filter}`,
                `numberOfMessagesPerPage=${NUMBER_OF_MESSAGES_PER_PAGE}`],
            onSuccess, onError);
    }

    static getFullDiscussion(filter, onSuccess, onError) {
        handleGetRequest(DISCUSSION_CONTROLLER + GET_FULL_DISCUSSION_PATH, [`filter=${filter}`],
            onSuccess, onError);
    }

    static sendMessage(chatterMessageBody, onSuccess, onError) {
        handlePostRequest(DISCUSSION_CONTROLLER + SEND_MESSAGE_PATH, chatterMessageBody,
            onSuccess, onError);
    }
}