export default function validate(response) {
    let errors = {}

    if (response === 'User already exists') {
        errors.email = response
    }        
    if (response === 'Passwords do not match') {
        errors.confirmPassword = response
    }   
    if (response === 'First name is required') {
        errors.firstName = response
    }   
    if (response === 'Last name is required') {
        errors.lastName = response
    }   
    if (response === 'Pronouns are required') {
        errors.pronouns = response
    }   
    if (response === 'Email is required') {
        errors.emailEmpty = response
    }   
    if (response === 'Password is required') {
        errors.password = response
    }  
    if (response === 'Please select your volleyball experience') {
        errors.vballExperience = response
    }  
    if (response === 'You must agree to the waiver and code of conduct to become a member') {
        errors.waiverAndCodeSignature = response
    }  

    console.log('validate', errors)
    
    return errors
}