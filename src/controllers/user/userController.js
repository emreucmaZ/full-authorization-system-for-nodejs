const signIn = require("./signIn");
const signUp = require("./signup");

const userController = () => {
    return {
        signUp,
        signIn
    }
}

module.exports = userController;