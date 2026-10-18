const results = [
    { id: 1, name: 'Eman Amir', department: 'CS', course: 'FSWD', marks: 82 },
    { id: 2, name: 'Kiran', department: 'CS', course: 'FSWD', marks: 91 },
    { id: 3, name: 'Usman', department: 'SE', course: 'FSWD', marks: 47 },
    { id: 4, name: 'Hina', department: 'AI', course: 'FSWD', marks: 73 },
    { id: 5, name: 'Sultan', department: 'SE', course: 'FSWD', marks: 64 },
    { id: 6, name: 'Zoya', department: 'AI', course: 'FSWD', marks: 91 }
];

function getGrade(marks) {
    if (marks >= 85) return { grade: 'A', gradePoints: 4.0 };
    if (marks >= 80) return { grade: 'A-', gradePoints: 3.7 };
    if (marks >= 75) return { grade: 'B+', gradePoints: 3.3 };
    if (marks >= 70) return { grade: 'B', gradePoints: 3.0 };
    if (marks >= 65) return { grade: 'B-', gradePoints: 2.7 };
    if (marks >= 60) return { grade: 'C+', gradePoints: 2.3 };
    if (marks >= 50) return { grade: 'C', gradePoints: 2.0 };
    return { grade: 'F', gradePoints: 0.0 };
}

const processedResults = results.map(student => {
    const gradeInfo = getGrade(student.marks);

    return {
        ...student,
        ...gradeInfo,
        status: student.marks >= 50 ? 'PASS' : 'FAIL'
    };
});

const meritList = [...processedResults].sort((a, b) =>
    b.marks - a.marks || a.name.localeCompare(b.name)
);

const departments = {};

processedResults.forEach(student => {
    if (!departments[student.department]) {
        departments[student.department] = {
            students: 0,
            total: 0,
            highest: student.marks,
            passed: 0
        };
    }

    const dept = departments[student.department];

    dept.students++;
    dept.total += student.marks;
    dept.highest = Math.max(dept.highest, student.marks);

    if (student.status === 'PASS') {
        dept.passed++;
    }
});

Object.keys(departments).forEach(department => {
    departments[department].average =
        departments[department].total / departments[department].students;

    delete departments[department].total;
});

const firstAbove85 = processedResults.find(student => student.marks > 85);
const firstFailedIndex = processedResults.findIndex(student => student.marks < 50);
const atLeastOneFailed = processedResults.some(student => student.marks < 50);
const allMarksValid = processedResults.every(
    student => student.marks >= 0 && student.marks <= 100
);

const average = processedResults.reduce(
    (sum, student) => sum + student.marks, 0
) / processedResults.length;

const aboveAverage = processedResults.filter(student => student.marks > average);
const topThree = meritList.slice(0, 3);

console.log('PROCESSED RESULTS:', processedResults);
console.log('MERIT LIST:', meritList);
console.log('DEPARTMENT STATISTICS:', departments);
console.log('First scoring above 85:', firstAbove85);
console.log('Index of first failed student:', firstFailedIndex);
console.log('At least one failed:', atLeastOneFailed);
console.log('All marks valid:', allMarksValid);
console.log('Overall average:', average);
console.log('Students above average:', aboveAverage);
console.log('Top three students:', topThree);