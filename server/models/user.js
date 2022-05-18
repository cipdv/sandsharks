import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    id: String,
    profileCreatedOn: {type: Date, default: new Date()},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true},
    pronouns: String,
    profilePhoto: String,
    experienceLevel: String,
    waiverSignature: String
})

export default mongoose.model('User', UserSchema)