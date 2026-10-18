const student = {
    id: 101,
    name: 'Eman Amir',
    marks: 0,
    scholarship: false,
    address: {
        city: 'Islamabad',
        sector: 'F-10'
    },
    contact: {
        email: 'eman@university.edu'
    }
};

const update = {
    name: 'Eman Amir',
    address: {
        city: 'Rawalpindi'
    },
    contact: {
        phone: '03001234567'
    }
};

function updateStudent(student, update, ...otherUpdates) {
    const { address: oldAddress, contact: oldContact, ...otherFields } = student;

    const {
        name: updatedName = otherFields.name,
        marks: updatedMarks = otherFields.marks,
        scholarship: updatedScholarship = otherFields.scholarship,
        address: updatedAddress = {},
        contact: updatedContact = {}
    } = update;

    const [firstExtraUpdate = {}] = otherUpdates;

    const {
        city = oldAddress?.city ?? '',
        sector = oldAddress?.sector ?? ''
    } = { ...oldAddress, ...updatedAddress };

    const {
        email = oldContact?.email ?? '',
        phone = oldContact?.phone ?? ''
    } = { ...oldContact, ...updatedContact };

    return {
        ...otherFields,
        ...firstExtraUpdate,
        name: updatedName,
        marks: updatedMarks ?? 0,
        scholarship: updatedScholarship ?? false,
        address: { city, sector },
        contact: { email, phone }
    };
}

const updatedStudent = updateStudent(student, update);

console.log('Original student:', student);
console.log('Updated student:', updatedStudent);

console.log('Same object:', student === updatedStudent);
console.log('Same address:', student.address === updatedStudent.address);
console.log('Same contact:', student.contact === updatedStudent.contact);