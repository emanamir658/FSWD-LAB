var name = "Eman Amir";
var age = 21;
var isStudent = true;

var biography = {
    name: "Eman Amir",
    age: 21,
    university: "Air University",

    address: {
        city: "Islamabad",
        country: "Pakistan"
    },

    degreeProgram: {
        degree: "BS Computer Science",
        semester: 5
    }
};

console.log("Name:", biography.name);
console.log("Age:", biography.age);
console.log("University:", biography.university);
console.log("City:", biography.address.city);
console.log("Country:", biography.address.country);
console.log("Degree:", biography.degreeProgram.degree);
console.log("Semester:", biography.degreeProgram.semester);