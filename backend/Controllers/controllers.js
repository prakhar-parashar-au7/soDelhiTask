// import Products from '../Models/Products.js'
// import Counts from '../Models/Counts.js'
import Users from '../Models/Users.js'



const controller = {



    userLogin: (req, res) => {
        console.log(req.body.userInfo)
        Users.find({ googleId: req.body.userInfo.googleId }, (err, user) => {
            if (user.length == 0) {
                req.body.userInfo.token = req.body.token
                Users.create(req.body.userInfo).then((err, user) => {
                    res.send(user)
                })
            }

            else res.send(user[0])

        })
    },

    addNote: (req, res) => {
        if (req.body.notePriority == "High") {
            console.log("hi")
            Users.update({ googleId: req.body.userGoogleId }, { $push: { highPriorityNotes: req.body } }).then(() => {
                res.send("New note added")
            })
        }
        else if (req.body.notePriority == "Medium") {
            Users.update({ googleId: req.body.userGoogleId }, { $push: { mediumPriorityNotes: req.body } }).then(() => {
                res.send("New note added")
            })
        }
        else {
            Users.update({ googleId: req.body.userGoogleId }, { $push: { lowPriorityNotes: req.body } }).then(() => {
                res.send("New note added")
            })
        }




        console.log(req.body)
    },



    getUpdatedNotes: (req, res) => {
        Users.find({ googleId: req.body.userGoogleId }, (err, user) => {
            res.send(user)
        })


    },

    editNote: (req, res) => {

        if (req.body.priority == 'High') {
            const strr = `highPriorityNotes.${req.body.currentlyEditing}.noteText`
            Users.update({ googleId: req.body.userGoogleId }, { $set: { [strr]: req.body.currentlyEditingText } }).then(() => {
                console.log("done")
            })

        }

        else if (req.body.priority == 'Medium') {
            const strr = `mediumPriorityNotes.${req.body.currentlyEditing}.noteText`
            Users.update({ googleId: req.body.userGoogleId }, { $set: { [strr]: req.body.currentlyEditingText } }).then(() => {
                console.log("done")
            })

        }

        else {

            const strr = `lowPriorityNotes.${req.body.currentlyEditing}.noteText`
            Users.update({ googleId: req.body.userGoogleId }, { $set: { [strr]: req.body.currentlyEditingText } }).then(() => {
                console.log("done")
            })

        }

    },

    deleteNote: (req, res) => {
        if (req.body.priority == "High") {
            const strr = `highPriorityNotes.${req.body.index}`
            Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                Users.update({ googleId: req.body.userGoogleId }, { $pull: { "highPriorityNotes": null } }).then(() => {
                    console.log("done")
                })

            })

        }

        else if (req.body.priority == "Medium") {
            const strr = `mediumPriorityNotes.${req.body.index}`
            Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                Users.update({ googleId: req.body.userGoogleId }, { $pull: { "mediumPriorityNotes": null } }).then(() => {
                    console.log("done")
                })

            })

        }

        else {
            const strr = `lowPriorityNotes.${req.body.index}`
            Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                Users.update({ googleId: req.body.userGoogleId }, { $pull: { "lowPriorityNotes": null } }).then(() => {
                    console.log("done")
                })

            })
        }



    }
}


export default controller