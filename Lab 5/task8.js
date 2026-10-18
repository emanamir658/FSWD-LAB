async function getJSON(url, fetchImplementation) {
    const response = await fetchImplementation(url);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

function fakeFetch(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes('network-error')) {
                return reject(new Error('Network failure'));
            }

            if (url.includes('404')) {
                return resolve({
                    ok: false,
                    status: 404,
                    json: async () => ({})
                });
            }

            if (url.includes('500')) {
                return resolve({
                    ok: false,
                    status: 500,
                    json: async () => ({})
                });
            }

            if (url.includes('invalid-json')) {
                return resolve({
                    ok: true,
                    status: 200,
                    json: async () => {
                        throw new SyntaxError('Invalid JSON');
                    }
                });
            }

            const data = {
                '/users': [
                    { id: 1, name: 'Eman Amir', department: 'CS' },
                    { id: 2, name: 'Kiran', department: 'CS' },
                    { id: 3, name: 'Sultan', department: 'AI' }
                ],
                '/courses': [
                    { id: 1, name: 'FSWD' },
                    { id: 2, name: 'AI' }
                ],
                '/results': [
                    { name: 'Eman Amir', department: 'CS', marks: 85 },
                    { name: 'Kiran', department: 'CS', marks: 91 },
                    { name: 'Sultan', department: 'AI', marks: 45 }
                ]
            };

            resolve({
                ok: true,
                status: 200,
                json: async () => data[url]
            });
        }, url.includes('slow') ? 2000 : 300);
    });
}

async function loadDashboard() {
    try {
        const [users, courses, results] = await Promise.all([
            getJSON('/users', fakeFetch),
            getJSON('/courses', fakeFetch),
            getJSON('/results', fakeFetch)
        ]);

        const averageMarks = results.length > 0
            ? results.reduce((sum, student) => sum + student.marks, 0) / results.length
            : 0;

        const highestStudent = results.length > 0
            ? results.reduce((highest, student) =>
                student.marks > highest.marks ? student : highest
            )
            : null;

        const failedStudents = results.filter(student => student.marks < 50).length;

        const departments = {};

        results.forEach(student => {
            if (!departments[student.department]) {
                departments[student.department] = {
                    students: 0,
                    totalMarks: 0,
                    passed: 0
                };
            }

            departments[student.department].students++;
            departments[student.department].totalMarks += student.marks;

            if (student.marks >= 50) {
                departments[student.department].passed++;
            }
        });

        Object.values(departments).forEach(department => {
            department.average =
                department.totalMarks / department.students;

            delete department.totalMarks;
        });

        return {
            totalStudents: users.length,
            totalCourses: courses.length,
            averageMarks: averageMarks,
            highestPerformingStudent: highestStudent,
            failedStudents: failedStudents,
            departmentStatistics: departments
        };
    } catch (error) {
        console.log('Dashboard error:', error.message);
        throw error;
    }
}

async function fetchWithTimeout(url, milliseconds) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, milliseconds);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } finally {
        clearTimeout(timer);
    }
}

loadDashboard()
    .then(report => console.log('Dashboard:', report))
    .catch(error => console.log('Failed:', error.message));