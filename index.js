#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = ``;
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option\n",
        choices: [`Enroll a student`, `Show student status`]
    });
    if (action.ans === `Enroll a student`) {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter your name:"
        });
        let trimedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimedStudentName) === false) {
            if (trimedStudentName !== ``) {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\t Your account has been created ");
                console.log(`Welcome, ${trimedStudentName}!`);
                let cource = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a cource ",
                    choices: ["IT", "English", "Cooking"]
                });
                let courceFees = 0;
                switch (cource.ans) {
                    case `IT`:
                        courceFees = 50000;
                        break;
                    case `Englis`:
                        courceFees = 30000;
                        break;
                    case `Cooking`:
                        courceFees = 20000;
                        break;
                }
                let courceConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this cource"
                });
                if (courceConfirm.ans === true) {
                    let Student = new student(studentId, trimedStudentName, [cource.ans], courceFees);
                    students.push(Student);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log(" Invalid Name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: " Please select name",
                choices: studentNameCheck
            });
            let foundStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log(" Student information");
            console.log(foundStudent);
            console.log(`\n`);
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: " Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
