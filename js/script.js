class Student {
    constructor(name, age, height, weight, percentage) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.percentage = percentage;
    }
}
class Store {
    static getStudent() {
        let students;
        if (localStorage.getItem('student') === null) {
            students = [];
        }
        else {
            students = JSON.parse(localStorage.getItem('student'));
        }

        return students;
    }

    static addStudent(student) {
        const students = Store.getStudent();
        students.push(student);
        localStorage.setItem('student', JSON.stringify(students));
    }
}

class UI {
    constructor() {
        this.page_number = 1;
        this.page_size = 1;
    }

    nextPage() {
        this.page_number += 1;
    }
    previousPage() {
        this.page_number -= 1;
    }

    displayStudent(argument) {
        console.log("result size", argument.length);
        let total_page = Math.ceil((argument.length) / (this.page_size));
        let start_index = (this.page_number - 1) * this.page_size;
        let last_index = start_index + this.page_size;
        if (this.page_number >= total_page) { document.getElementById("next").disabled = true; }
        else { document.getElementById("next").disabled = false; }
        if (this.page_number > 1) { document.getElementById("prev").disabled = false; }
        else { document.getElementById("prev").disabled = true; }
        const student_data = argument.slice(start_index, last_index);
        const list = document.querySelector('#tbody');
        list.innerHTML = "";
        student_data.forEach(element => ui_object.addStudenttoList(element));

    }
    addStudenttoList(element) {
        const list = document.querySelector('#tbody');
        const row = document.createElement('tr');

        row.innerHTML = `
       <td>${element.name}</td>
       <td>${element.age}</td>
       <td>${element.height}</td>
       <td>${element.weight}</td>
       <td>${element.percentage}</td>
       `;
        list.appendChild(row);
    }
    clearFields() {
        document.querySelector('#name').value = "";
        document.querySelector('#age').value = "";
        document.querySelector('#height').value = "";
        document.querySelector('#weight').value = "";
        document.querySelector('#percentage').value = "";
    }

    sorting(array) {
        const dropdown = document.querySelector("#sort").value;
        let show_num = document.querySelector("#show_num").value;

        let temp_student_data = array;
        if (show_num === "") {
            show_num = temp_student_data.length
        }
        if (dropdown !== "0") {
            temp_student_data.sort((a, b) => parseInt(b[dropdown], 10) - parseInt(a[dropdown], 10))
            temp_student_data = temp_student_data.slice(0, parseInt(show_num));
            return temp_student_data;
        }
        else {

            return array;
        }
    }
}

//ui object declaration
var ui_object = new UI();


document.getElementById('prev').addEventListener('click', () => {
    ui_object.previousPage();
    ui_object.displayStudent(ui_object.sorting(Store.getStudent()));
});

document.getElementById('next').addEventListener('click', () => {
    ui_object.nextPage();
    ui_object.displayStudent(ui_object.sorting(Store.getStudent()));
});

document.getElementById('btn1').addEventListener('click', () => {
    ui_object.page_number = 1;
    ui_object.displayStudent(ui_object.sorting(Store.getStudent()));
});

//Display Student
document.addEventListener('DOMContentLoaded', () => {
    ui_object.displayStudent(Store.getStudent());
});

//Add student data to list
document.querySelector('#form-look').addEventListener('submit', (e) => {
    //Pervent Pervious Content
    e.preventDefault();
    //insert value
    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const height = document.querySelector("#height").value;
    const weight = document.querySelector('#weight').value;
    const percentage = document.querySelector('#percentage').value;
    if (name === '' || age === "" || height === "" || weight === "" || percentage === "") {
        alert("Please Fill the details");
    }
    else {
        const student = new Student(name, age, height, weight, percentage);
        ui_object.addStudenttoList(student);
        Store.addStudent(student);
        ui_object.clearFields();
        ui_object.displayStudent(Store.getStudent());
    }
})
