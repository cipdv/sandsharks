import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`mongodb connected to: ${con.connection.host}`)
    } catch (error) {
        console.error(`error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB