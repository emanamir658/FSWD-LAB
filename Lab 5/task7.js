function getStudent(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id !== 101) {
                reject(new Error('Student not found'));
            } else {
                resolve({
                    id: 101,
                    name: 'Eman Amir',
                    completedCourses: ['CS301']
                });
            }
        }, 200);
    });
}

function getCourse(code) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (code !== 'CS401') {
                reject(new Error('Course not found'));
            } else {
                resolve({ code: 'CS401', seats: 5 });
            }
        }, 200);
    });
}

function checkPrerequisites(data) {
    return new Promise((resolve, reject) => {
        if (!data.student.completedCourses.includes('CS301')) {
            reject(new Error('Prerequisite not completed'));
        } else {
            resolve(data);
        }
    });
}

function checkSeats(data) {
    return new Promise((resolve, reject) => {
        if (data.course.seats <= 0) {
            reject(new Error('Course is full'));
        } else {
            resolve(data);
        }
    });
}

function registerStudent(data) {
    return Promise.resolve({
        studentId: data.student.id,
        course: data.course.code,
        status: 'REGISTERED'
    });
}

function sendEmail() {
    return Promise.resolve('Email sent');
}

function sendSMS() {
    return Promise.reject(new Error('SMS failed'));
}

function writeAuditLog() {
    return Promise.resolve('Audit saved');
}

getStudent(101)
    .then(student => {
        return getCourse('CS401').then(course => ({ student, course }));
    })
    .then(checkPrerequisites)
    .then(checkSeats)
    .then(registerStudent)
    .then(async confirmation => {
        console.log('Registration:', confirmation);

        const outcomes = await Promise.allSettled([
            sendEmail(),
            sendSMS(),
            writeAuditLog()
        ]);

        const services = ['Email', 'SMS', 'Audit'];

        const report = outcomes.map((result, index) => ({
            service: services[index],
            status: result.status
        }));

        console.log('Service report:', report);
    })
    .catch(error => {
        console.log('Registration failed:', error.message);
    })
    .finally(() => {
        console.log('Registration workflow finished.');
    });


// First successfully returned course
function getCourseFromServer(server, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${server} failed`));
            } else {
                resolve({ server, course: 'CS401' });
            }
        }, delay);
    });
}

Promise.any([
    getCourseFromServer('Server A', 300, true),
    getCourseFromServer('Server B', 200, false)
])
    .then(result => console.log('Course result:', result))
    .catch(error => console.log('All servers failed:', error.errors));