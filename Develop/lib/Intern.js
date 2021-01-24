// Class used to create 'Intern' object using inquirer prompts.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor (name, id, email, school){
        //Intern class constructor takes in Employee properties and adds which school they went to.
        super (name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern'
    }
}

module.export = Intern;