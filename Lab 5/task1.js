const applicants = [
    {
        id: 'A101',
        name: 'Eman Amir',
        age: '20',
        matricMarks: '91',
        intermediateMarks: '87',
        entryTest: '78',
        program: 'BSCS',
        feePaid: 'true'
    },
    {
        id: 'A102',
        name: 'Kiran',
        age: 'twenty',
        matricMarks: '88',
        intermediateMarks: '',
        entryTest: '72',
        program: 'BSSE',
        feePaid: 'false'
    },
    {
        id: 'A103',
        name: 'Sultan',
        age: '19',
        matricMarks: '76',
        intermediateMarks: '83',
        entryTest: '91',
        program: 'BSAI',
        feePaid: 'true'
    }
];

const supportedPrograms = ['BSCS', 'BSSE', 'BSAI'];


// Check whether program is supported
function isSupportedProgram(program) {
    switch (program) {
        case 'BSCS':
        case 'BSSE':
        case 'BSAI':
            return true;
        default:
            return false;
    }
}


// Process one applicant
function processApplicant(applicant) {

    if (!applicant) {
        return {
            status: 'INVALID DATA',
            errors: ['Applicant data is missing']
        };
    }

    const age = Number(applicant.age);
    const matric = Number(applicant.matricMarks);
    const intermediate = Number(applicant.intermediateMarks);
    const entryTest = Number(applicant.entryTest);

    const errors = [];

    if (applicant.age === '' || !Number.isFinite(age)) {
        errors.push('Invalid age');
    }

    if (applicant.matricMarks === '' || !Number.isFinite(matric)) {
        errors.push('Invalid matric marks');
    }

    if (
        applicant.intermediateMarks === '' ||
        !Number.isFinite(intermediate)
    ) {
        errors.push('Invalid intermediate marks');
    }

    if (applicant.entryTest === '' || !Number.isFinite(entryTest)) {
        errors.push('Invalid entry test marks');
    }

    if (Number.isFinite(matric) && (matric < 0 || matric > 100)) {
        errors.push('Matric marks must be between 0 and 100');
    }

    if (
        Number.isFinite(intermediate) &&
        (intermediate < 0 || intermediate > 100)
    ) {
        errors.push('Intermediate marks must be between 0 and 100');
    }

    if (
        Number.isFinite(entryTest) &&
        (entryTest < 0 || entryTest > 100)
    ) {
        errors.push('Entry test marks must be between 0 and 100');
    }

    if (Number.isFinite(age) && (age < 17 || age > 30)) {
        errors.push('Age must be between 17 and 30');
    }

    if (!isSupportedProgram(applicant.program)) {
        errors.push('Unsupported program');
    }

    if (errors.length > 0) {
        return {
            id: applicant.id,
            name: applicant.name,
            status: 'INVALID DATA',
            errors: errors
        };
    }

    const merit =
        matric * 0.20 +
        intermediate * 0.30 +
        entryTest * 0.50;

    const eligible =
        merit >= 70 &&
        entryTest >= 60 &&
        intermediate >= 60;

    let status;

    if (eligible && merit >= 80) {
        status = 'SELECTED';
    } else if (eligible && merit >= 70) {
        status = 'WAITING';
    } else {
        status = 'REJECTED';
    }

    return {
        id: applicant.id,
        name: applicant.name,
        program: applicant.program,
        age: age,
        matricMarks: matric,
        intermediateMarks: intermediate,
        entryTest: entryTest,
        merit: merit,
        eligible: eligible,
        status: status
    };
}


// Process all applicants
function processAllApplicants(applicants) {

    const results = [];

    for (const applicant of applicants) {
        results.push(processApplicant(applicant));
    }

    return results;
}


// Create final summary
function createSummary(results) {

    let validApplicants = 0;
    let invalidApplicants = 0;
    let totalMerit = 0;

    let highestMeritApplicant = null;
    let lowestMerit = null;

    const applicantsPerProgram = {
        BSCS: 0,
        BSSE: 0,
        BSAI: 0
    };

    for (const result of results) {

        if (result.status === 'INVALID DATA') {
            invalidApplicants++;
            continue;
        }

        validApplicants++;

        totalMerit += result.merit;

        applicantsPerProgram[result.program]++;

        if (
            highestMeritApplicant === null ||
            result.merit > highestMeritApplicant.merit
        ) {
            highestMeritApplicant = result;
        }

        if (
            lowestMerit === null ||
            result.merit < lowestMerit
        ) {
            lowestMerit = result.merit;
        }
    }

    const averageMerit =
        validApplicants > 0
            ? totalMerit / validApplicants
            : 0;

    return {
        validApplicants: validApplicants,
        invalidApplicants: invalidApplicants,
        highestMeritApplicant: highestMeritApplicant,
        lowestMerit: lowestMerit,
        averageMerit: averageMerit,
        applicantsPerProgram: applicantsPerProgram
    };
}


// Run the program
const results = processAllApplicants(applicants);

console.log('===== APPLICANT RESULTS =====');
console.log(results);

const summary = createSummary(results);

console.log('===== FINAL SUMMARY =====');
console.log(summary);