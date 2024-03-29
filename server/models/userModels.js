import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    preferredName: {
        type: String,
    },
    pronouns: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    adminStatus: {
        type: String,
        required: true,
        default: 'no'
    },
    vballExperience: {
        type: String,
        required: true,
    },
    wantsEmailNotifications: {
        type: Boolean,
        required: true,
        default: false
    },
    waiverAndCoC: {
        type: Boolean
    },
    gotItVballExperience: {
        type: Boolean,
        default: false
    },
    image: {
        status: String,
        image: String
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User

