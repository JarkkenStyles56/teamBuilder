// Class used to create 'Intern' object using inquirer prompts.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        //Intern class constructor takes in Employee properties and adds which school they went to.
        super(name, id, email);
        this.school = school;
    }
//Must getRole first to start the correct prompts.
    getRole() {
        return 'Intern'
    }
    getSchool() {
        return this.school;
    }

}

module.exports = Intern;