import mongoose from 'mongoose'

const schema = mongoose.Schema

const userSchema = new schema({


    googleId: {
        type: String
    },

    imageUrl: {
        type: String
    },

    email: {
        type: String
    },
    name: {
        type: String
    },

    givenName: {
        type: String
    },

    familyName: {
        type: String
    },

    token: {
        type: String
    },

    highPriorityNotes: {
        type: Array
    },

    mediumPriorityNotes: {
        type: Array
    },

    lowPriorityNotes: {
        type: Array
    }


})

const Users = mongoose.model('Users', userSchema)

export default Users