// function validation(values) {
//     alert ("")
//     let error = {}
//     const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     const password_pattern = /.+/;
//     if(values.email ===""){
//         error.email="Name should not be empty";
//     }
//     else if(!email_pattern.test(values.email)){
//         error.email = "Email Didn't match";
//     }
//     else {
//         error.email = "";
//     }
//     if (values.password ==="") {
//         error.password = "Password should not be empty";
//     }
//     else if(!password_pattern.test (values.password)) {
//         error.password = "Password didn't match";
//     }  
//     else {
//         error.password = "";
//     }
//     return error;
// }


// export default validation;



function validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (values.email === "") {
        errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Email format is incorrect";
    } else {
        errors.email = "";
    }

    if (values.password === "") {
        errors.password =
            "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        errors.password =
            "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    } else {
        errors.password = "";
    }

    return errors;
}

export default validation;
