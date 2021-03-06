// Class used to create 'Engineer' object using inquirer prompts.

const Employee = require("./Employee");

class Engineer extends Employee {

    constructor(name, id, email, github) {
        //Engineer class constructor takes in Employee properties and adds github username.
        super(name, id, email)
        this.github = github;
    }

    getRole() {
        return 'Engineer';
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;