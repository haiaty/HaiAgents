

module.exports =  function (userChoice) {

    var vectorStore = null;

    switch(userChoice) {
        case "redis":
            vectorStore = require('../drivers/vectorstores/redis');
            break;
        default:
            throw Error("This vector db is not supported");
    }

    return vectorStore;
}