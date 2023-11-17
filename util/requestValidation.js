function requestForaDoPadrao(request){
    return !(typeof(request) === "string" || typeof(request) === "object")
}

function convertRequestIntoJSON(request){
    return typeof(request.body) == "string" ? JSON.parse(request.body) : request.body
}

export {
    requestForaDoPadrao,
    convertRequestIntoJSON
}