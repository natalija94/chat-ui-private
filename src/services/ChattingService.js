import axios from "axios";
import {handleGetRequest, handlePostRequest} from "../util/RestUtil";
import {DISCUSSION_CONTENT_FILTER, NUMBER_OF_MESSAGES_PER_PAGE} from "../util/businessLogicUtil";


const CHAT_SERVER_URL = "http://localhost:10700";
const DISCUSSION_GLOBAL_PATH = "/discuss";
const DISCUSSION_CONTROLLER = CHAT_SERVER_URL + DISCUSSION_GLOBAL_PATH;

const GET_PART_OF_DISCUSSION_PATH = "/discussion-part";
const GET_FULL_DISCUSSION_PATH = "/full-discussion";
const SEND_MESSAGE_PATH = "/send-message";

class ChattingService {

    static getDiscussionPaginated(onSuccess, onError) {
        handleGetRequest(DISCUSSION_CONTROLLER + GET_PART_OF_DISCUSSION_PATH, [`page=${NUMBER_OF_MESSAGES_PER_PAGE}`, "numberOfMessagesPerPage=20"],
            onSuccess, onError);
    }

    static getFullDiscussion(onSuccess, onError) {
        handleGetRequest(DISCUSSION_CONTROLLER + GET_FULL_DISCUSSION_PATH, [`filter=${DISCUSSION_CONTENT_FILTER.APPROPRIATE_CONTENT}`],
            onSuccess, onError);
    }

    static sendMessage(chatterMessageBody, onSuccess, onError) {
        handlePostRequest(DISCUSSION_CONTROLLER + SEND_MESSAGE_PATH, chatterMessageBody,
            onSuccess, onError);
    }
}