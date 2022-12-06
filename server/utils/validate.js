import User from '../models/userModels.js'

export async function registrationValidation (body) {
    const { firstName, lastName, pronouns, email, vballExperience, password, confirmPassword, waiverAndCodeSignature } = body

    let errs = {}

    const userExists = await User.findOne({email})
        if(userExists) {
            errs.email = 'User already exists'
        }

    if(password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match'
    }

    if(!firstName) {
        errs.firstName = 'First name is required'
    }

    if(!lastName) {
        errs.lastName = 'Last name is required'   
    }

    if(!pronouns) {
        errs.pronouns = 'Pronouns are required'           
    }

    if(!email) {
        errs.emailEmpty = 'Email is required'          
    }

    if(!password) {
        errs.password = 'Password is required'         
    }

    if(!vballExperience) {
        errs.vballExperience = 'Please select your volleyball experience'         
    }

    if(!waiverAndCodeSignature) {
        errs.waiverAndCodeSignature = 'You must agree to the waiver and code of conduct to become a member'          
    }
    
    return errs
}

export async function postValidation (body) {
    const {  } = body

    let errs = {}



    return errs
}