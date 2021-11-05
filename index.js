//jshint esversion : 6
const fs = require('fs');
var readlineSync = require('readline-sync');
 
var showMenu = function(){
    console.log('         Student Management            ');
    console.log('=======================================');
    console.log('1. Show all student');
    console.log('2. Create student and return Menu');
    console.log('3. Delete Student');
    console.log('4. Edit Student');
    console.log('5. Find student by name');
    console.log('6. Sort student by name ascending');
    console.log('7. Sort student by age ascending');
    console.log('8. Exit');
};

let studentJSON = fs.readFileSync('./dataJson.txt', 'utf8');
let students = JSON.parse(studentJSON);

function saveFile(){
    studentStr = JSON.stringify(students);
    fs.writeFileSync('./dataJson.txt', studentStr, 'utf8');
}

let choice; 
do {
    showMenu();
    let choice = readlineSync.question('Your choice ? ');
    choice = parseInt(choice);
    switch (choice) {
        case 1: 
            console.log(students);
            break;
        case 2: 
            createStudent();
            console.log(students);
            break;
        case 3: 
            deleteStudent();
            break;
        case 4: 
            editStudent();
            break;
        case 5: 
            findStudent();
            break;
        case 6: 
            sortStudentByName();
            break;
        case 7: 
            sortStudentByAge();
            break;
        case 8: 
            break;
        default: 
            console.log("Please choice 1-8");
            break;
    }
    if(choice == 8){
        break;
    }
} while (choice != 8);


function createStudent(){
    let name = readlineSync.question('Name: ');
    let age = readlineSync.question('Age: ');
    let gender = readlineSync.question('1: Male, 2: Female ');
    let sex = gender == 1 ? 'Male' : 'Female';
    students.push({name : name, age : parseInt(age), sex : sex});
    saveFile();
}

function deleteStudent(){
    let name = readlineSync.question('Name: ');
    students = students.filter(item => item.name !== name);
    saveFile();
}

function editStudent(){
    let name = readlineSync.question('Name: ');
    students.forEach(item => {
        if(item.name === name){
            let newName = readlineSync.question('Name: ');
            let newAge = readlineSync.question('Age: ');
            let newGender = readlineSync.question('1: Male, 2: Female ');
            let newSex = newGender == 1 ? 'Male' : 'Female';
            item.name = newName;
            item.age = parseInt(newAge);
            item.sex = newSex;
        }
    });
    saveFile();
}

function findStudent(){
    let name = readlineSync.question('Name: ');
    students.forEach(item => {
        if(item.name === name){
            console.log(item);
        }
    });
}

function sortStudentByName(){
    let newData = students;
    newData.sort((a,b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if(nameA > nameB) return 1;
        if(nameA < nameB) return -1;
        return 0;
    })
    console.log(newData);
}

function sortStudentByAge(){
    let newData = students;
    newData.sort((a,b) => {
        let ageA = a.age;
        let ageB = b.age;
        if(ageA > ageB) return 1;
        if(ageA < ageB) return -1;
        return 0;
    });
    console.log(newData);
}