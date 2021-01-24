// Class used to create 'Manager' object using inquirer prompts.

const Employee = require("./Employee");

class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        //Manager class constructor takes in Employee properties and adds officeNumber.
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'Manager'
    }


}

module.exports = Manager;