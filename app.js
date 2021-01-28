const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { validate } = require("@babel/types");

const allTeam = [];
const idNums = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function startInquiry() {

    function createManager() {
        console.log("First, let's get some info on you!");
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "Please tell us your name.",
            validate: response => {
                if (response !== "") {
                    return true;
                }
                return "Response must contain at least one character."
            }
        },
        {
            type: "input",
            name: "idNum",
            message: "Please enter your ID number.",
            validate: response => {
                const allNums = response.match(/^[+]?^[1-9]+$/);
                if (allNums) {
                    return true;
                }
                return "Please enter a positive whole number greater than zero, thank you."
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Please enter your email here.",
            validate: response => {
                const goodEmail = response.match(/\S+@\S+\.\S+/);
                if (goodEmail) {
                    return true;
                }
                return "Please enter a valid email address, thank you."
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Which is your office number?",
            validate: response => {
                const goodOfficeNumber = response.match(/^[+]?^[1-9]+$/);
                if (goodOfficeNumber) {
                    return true;
                }
                return "Please enter a positive whole number greater than zero, thank you."
            }

        }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.idNum, answers.managerEmail, answers.officeNumber);
            allTeam.push(manager);
            idNums.push(answers.idNum);
            managerTeam();
        })
    }

    function managerTeam() {
        console.log("Great! So, let's see, who do we have on our team?");
        inquirer.prompt([{
            type: "list",
            name: "employeeType",
            message: "What kind of employee would you like to add?",
            choices: [
                'An Engineer',
                'An Intern',
                'No more, thank you.'
            ]
        }
        ]).then(teamMember => {
            switch (teamMember.employeeType) {
                case 'An Engineer':
                    createEngineer();
                    break;
                case 'An Intern':
                    createIntern();
                    break;
                default:
                    renderTeam();


            }
        });
    }

    function createEngineer() {
        inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
            validate: response => {
                if (response !== "") {
                    return true;
                }
                return "Response must contain at least one character."
            }
        },
        {
            type: "input",
            name: "idNum",
            message: "Please enter your ID number.",
            validate: response => {
                const allNums = response.match(/^[+]?^[1-9]+$/);
                if (allNums) {
                    if (idNums.includes(response)) {
                        return "Engineer ID already in system, please add new Engineer."
                    } else {
                        return true;
                    }
                }
                return "Please enter a positive whole number greater than zero, thank you."
            }
        },

        {
            type: "input",
            name: "engineerEmail",
            message: "Please enter your email here!",
            validate: response => {
                const goodEmail = response.match(/\S+@\S+\.\S+/);
                if (goodEmail) {
                    return true;
                }
                return "Please enter a valid email address, thank you."
            }
        },

        {
            type: "input",
            name: "githubUsername",
            message: "Please enter your github username here.",
            validate: response => {
                if (response !== "") {
                    return true;
                }
                return "Response must contain at least one character."
            }
        }

        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.idNum, answers.engineerEmail, answers.githubUsername);
            allTeam.push(engineer);
            idNums.push(answers.idNum);
            managerTeam();

        });
    }

    function createIntern() {

        inquirer.prompt([{
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
            validate: response => {
                if (response !== "") {
                    return true;
                }
                return "Response must contain at least one character."
            }
        },
        {
            type: "input",
            name: "idNum",
            message: "Please enter your ID number.",
            validate: response => {
                const allNums = response.match(/^[+]?^[1-9]+$/);
                if (allNums) {
                    if (idNums.includes(response)) {
                        return "intern ID already in system, please add new intern."
                    } else {
                        return true;
                    }
                }
                return "Please enter a positive whole number greater than zero, thank you."
            }
        },

        {
            type: "input",
            name: "internEmail",
            message: "Please enter your email here!",
            validate: response => {
                const goodEmail = response.match(/\S+@\S+\.\S+/);
                if (goodEmail) {
                    return true;
                }
                return "Please enter a valid email address, thank you."
            }
        },

        {
            type: "input",
            name: "schoolName",
            message: "What school did this intern attend?",
            validate: response => {
                if (response !== "") {
                    return true;
                }
                return "Response must contain at least one character."
            }
        }

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.idNum, answers.internEmail, answers.schoolName);
            allTeam.push(intern);
            idNums.push(answers.idNum);
            managerTeam();

        });

    }

    function renderTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(allTeam), "utf-8");
    }

    createManager();

}

startInquiry();