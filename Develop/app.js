const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const managerPrompt = [ 
    {
      type: "input",
      name: "name",
      message: "What is your manager's name?"
    },
    {
     type: "input",
     name: "id",
     message: "What is your manager's ID?"
   },
   {
     type: "input",
     name: "email",
     message: "What is your manager's email?"
   },
   {
     type: "input",
     name: "officeNumber",
     message: "What is your office number?"
    }];
const engineerPrompt = [ 
    {
     type: "input",
     name: "name",
     message: "What is your Engineer's name?"
    },
    {
     type: "input",
     name: "id",
     message: "What is your Engineer's ID?"
    },
    {
     type: "input",
     name: "email",
     message: "What is your Engineer's email?"
    },
    {
     type: "input",
     name: "github",
     message: "What is your Engineer's GitHub username?"
    }];
const internPrompt = [ 
    {
     type: "input",
     name: "name",
     message: "What is your intern's name?"
    },
    {
     type: "input",
     name: "id",
     message: "What is your intern's ID?"
    },
    {
     type: "input",
     name: "email",
     message: "What is your intern's email?"
    },
    {
     type: "input",
     name: "school",
     message: "Which school does your intern attend?"
    }];
const typeEmployee = [
    {
     type: "list",
     name: "role",
     message: "Which type of team member would you like to add?",
     choices: ["Manager","Engineer","Intern", "None"]
    }];

function start() {
    return inquirer.prompt([
       {
         type: "list",
         name: "start",
         message: "Would you like to build a team?",
         choices: ["Yes","No"]
       }]).then(function(startResponse){
        if (startResponse.start == "Yes"){
            manager();
        }
        else {
            console.log("Command terminated. Restart to re-run.");
        }
    });
}
function manager() {
    inquirer.prompt(managerPrompt).then(function(managerResponse){
        const manager = new Manager (managerResponse.name, managerResponse.id, managerResponse.email, managerResponse.officeNumber);
        employees.push(manager);
        console.log(employees);
        addEmployee();
    })
}
function engineer() {
    inquirer.prompt(engineerPrompt).then(function(engineerResponse){
        const engineer = new Engineer (engineerResponse.name, engineerResponse.id, engineerResponse.email, engineerResponse.github);
        employees.push(engineer);
        console.log(employees);
        addEmployee();
    })
}
function intern() {
    inquirer.prompt(internPrompt).then(function(internResponse){
        const intern = new Intern (internResponse.name, internResponse.id, internResponse.email, internResponse.school);
        employees.push(intern);
        console.log(employees);
        addEmployee();
    })
}
function addEmployee() {
    inquirer.prompt(typeEmployee).then(function(result){
        if (result.role == "Manager") {
            manager();
        }
        if (result.role == "Engineer") {
            engineer();
        }
        if (result.role == "Intern") {
            intern();
        }
        if (result.role == "None") {
            console.log("Check the 'run' directory for a run.html file.");
            renderCall();
        }
    })
}

function renderCall() {
    fs.writeFile("../run/Run.html", render(employees),
    function(err) {
        if (err) throw err;
    })
}

start();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
