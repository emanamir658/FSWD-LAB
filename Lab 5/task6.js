function loadStudent(studentId, callback) {
    setTimeout(() => {
        if (studentId !== 101) {
            return callback(new Error('Student does not exist'));
        }

        callback(null, {
            studentId: studentId,
            name: 'Eman Amir',
            completedCourses: ['CS301']
        });
    }, 300);
}

function checkPrerequisites(student, course, callback) {
    setTimeout(() => {
        if (!student.completedCourses.includes('CS301')) {
            return callback(new Error('Prerequisite not completed'));
        }

        callback(null, { student, course });
    }, 300);
}

function checkAvailableSeats(data, callback) {
    setTimeout(() => {
        if (data.course.seats <= 0) {
            return callback(new Error('Course is full'));
        }

        callback(null, data);
    }, 300);
}

function registerCourse(data, callback) {
    setTimeout(() => {
        if (data.course.registeredStudents.includes(data.student.studentId)) {
            return callback(new Error('Student already registered'));
        }

        callback(null, {
            studentId: data.student.studentId,
            course: data.course.code,
            status: 'REGISTERED'
        });
    }, 300);
}

function registerStudent(studentId, course) {
    loadStudent(studentId, (error, student) => {
        if (error) return console.log(error.message);

        checkPrerequisites(student, course, (error, data) => {
            if (error) return console.log(error.message);

            checkAvailableSeats(data, (error, checkedData) => {
                if (error) return console.log(error.message);

                registerCourse(checkedData, (error, confirmation) => {
                    if (error) return console.log(error.message);

                    console.log('Registration successful:', confirmation);
                });
            });
        });
    });
}

const course = {
    code: 'CS401',
    seats: 10,
    registeredStudents: []
};

registerStudent(101, course);