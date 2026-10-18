class Student {
    constructor(id, name, courses) {
        this.id = id;
        this.name = name;
        this.courses = courses;
    }
}

function calculateGrade(marks) {
    if (marks >= 85) return 'A';
    if (marks >= 80) return 'A-';
    if (marks >= 75) return 'B+';
    if (marks >= 70) return 'B';
    if (marks >= 65) return 'B-';
    if (marks >= 60) return 'C+';
    if (marks >= 50) return 'C';
    return 'F';
}

function calculateAverage(marks) {
    if (marks.length === 0) return 0;

    return marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
}

function calculateGPA(marks) {
    if (marks.length === 0) return 0;

    const points = marks.map(mark => {
        if (mark >= 85) return 4.0;
        if (mark >= 80) return 3.7;
        if (mark >= 75) return 3.3;
        if (mark >= 70) return 3.0;
        if (mark >= 65) return 2.7;
        if (mark >= 60) return 2.3;
        if (mark >= 50) return 2.0;
        return 0;
    });

    return calculateAverage(points);
}

function processTranscript(rawData) {
    let data;

    try {
        data = JSON.parse(rawData);
    } catch {
        throw new SyntaxError('Invalid JSON data');
    }

    if (!Array.isArray(data)) {
        throw new TypeError('Transcript must be an array');
    }

    const ids = new Set();

    return data.map(item => {
        if (item.id === undefined || item.id === null) {
            throw new TypeError('Student ID is required');
        }

        if (ids.has(item.id)) {
            throw new Error('Duplicate student ID: ' + item.id);
        }

        ids.add(item.id);

        if (typeof item.name !== 'string' || item.name.trim() === '') {
            throw new TypeError('Student name is required');
        }

        if (!Array.isArray(item.courses)) {
            throw new TypeError('Courses must be an array');
        }

        item.courses.forEach(course => {
            if (typeof course.code !== 'string' || course.code.trim() === '') {
                throw new TypeError('Course code is required');
            }

            if (typeof course.marks !== 'number' || !Number.isFinite(course.marks)) {
                throw new TypeError('Course marks must be numeric');
            }

            if (course.marks < 0 || course.marks > 100) {
                throw new RangeError('Marks must be between 0 and 100');
            }
        });

        const student = new Student(item.id, item.name, item.courses);
        const marks = student.courses.map(course => course.marks);

        return {
            id: student.id,
            name: student.name,
            courses: student.courses.map(course => ({
                code: course.code,
                marks: course.marks,
                grade: calculateGrade(course.marks)
            })),
            average: calculateAverage(marks),
            GPA: calculateGPA(marks)
        };
    });
}


// Sample JSON data
const rawData = `
[
    {
        "id": 101,
        "name": "Eman Amir",
        "courses": [
            { "code": "CS301", "marks": 81 },
            { "code": "CS302", "marks": 74 }
        ]
    },
    {
        "id": 102,
        "name": "Kiran",
        "courses": [
            { "code": "CS303", "marks": 91 },
            { "code": "CS304", "marks": 88 }
        ]
    },
    {
        "id": 103,
        "name": "Sultan",
        "courses": [
            { "code": "CS305", "marks": 45 },
            { "code": "CS306", "marks": 67 }
        ]
    }
]
`;


// Run transcript processing
try {
    const report = processTranscript(rawData);

    console.log('TRANSCRIPT REPORT');
    console.log(report);

    console.log('\nJSON REPORT');
    console.log(JSON.stringify(report, null, 2));

    console.log('\nGRADE EXAMPLE:', calculateGrade(81));
    console.log('AVERAGE EXAMPLE:', calculateAverage([81, 74]));
    console.log('GPA EXAMPLE:', calculateGPA([81, 74]));

} catch (error) {
    console.log(error.name + ': ' + error.message);
} finally {
    console.log('\nTranscript processing finished.');
}


// Test invalid JSON
try {
    processTranscript('{invalid json}');
} catch (error) {
    console.log('Invalid JSON test:', error.name, error.message);
}

// Test duplicate IDs
try {
    processTranscript(`
    [
        {"id": 1, "name": "Eman Amir", "courses": []},
        {"id": 1, "name": "Kiran", "courses": []}
    ]
    `);
} catch (error) {
    console.log('Duplicate ID test:', error.name, error.message);
}

// Test invalid marks
try {
    processTranscript(`
    [
        {
            "id": 2,
            "name": "Sultan",
            "courses": [{"code": "CS401", "marks": 120}]
        }
    ]
    `);
} catch (error) {
    console.log('Invalid marks test:', error.name, error.message);
}