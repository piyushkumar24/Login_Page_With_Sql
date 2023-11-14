function SignupValidation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /.+/;

    if (values.name === '') {
        errors.name = 'Name should not be empty';
    } else {
        errors.name = '';
    }

    if (values.email === '') {
        errors.email = 'Email should not be empty';
    } else if (!emailPattern.test(values.email)) {
        errors.email = 'Email format is incorrect';
    } else {
        errors.email = '';
    }

    if (values.password === '') {
        errors.password = 'Password should not be empty';
    } else if (!passwordPattern.test(values.password)) {
        errors.password =
            'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit';
    } else {
        errors.password = '';
    }

    return errors;
}

export default SignupValidation;
