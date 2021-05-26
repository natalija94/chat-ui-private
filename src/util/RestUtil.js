import axios from "axios";

export function handleGetRequest(url, requestParams, onSuccess, onError) {
    let fullURI = prepareGetRequest(url, requestParams);

    axios.get(fullURI)
        .then((response) => {
            handleResponse(`GET ${fullURI} : SUCCESS.`, response && response.data ? response.data : response, onSuccess)
        }, (error) => {
            handleResponse(`GET ${fullURI} : ERROR.`, error, onError)
        });
}

export function handlePostRequest(url, body, onSuccess, onError) {
    axios.post(url, body)
        .then((response) => {
            handleResponse(`POST ${url} : SUCCESS.`, response && response.data ? response.data  : null, onSuccess)
        }, (error) => {
            handleResponse(`POST ${url} : ERROR.`, error, onError)
        });
}

//params are passed as String in format: i.e.:  "page=5"
function prepareGetRequest(path, params) {
    return path + formatRequestParams(params);
}

function formatRequestParams(params) {
    let requestParams = "";
    if (params && params.length > 0) {
        params.forEach(param => requestParams= `${requestParams}${param}&`);

        //remove ending &
        requestParams = `?${requestParams.substr(0, requestParams.length - 1)}`
    }
    return requestParams;
}

function handleResponse(message, response, callBackFunction) {
    console.log(`${message}  , Response: ${response}`);

    if (callBackFunction) {
        callBackFunction(response);
    }
}