

module.exports =  function (userChoice) {

    var vectorStore = null;

    switch(userChoice) {
        case "redis":
            vectorStore = require('../drivers/redis');
            break;
        default:
            throw Error("This vector db is not supported");
    }

    return vectorStore;
}