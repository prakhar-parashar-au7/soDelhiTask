// import Products from '../Models/Products.js'
// import Counts from '../Models/Counts.js'
import Users from '../Models/Users.js'



const controller = {



    userLogin: (req, res) => {
        console.log(req.body.userInfo, "hey")
        Users.find({ googleId: req.body.userInfo.googleId }, (err, user) => {
            if (user.length == 0) {
                // req.body.userInfo.token = req.body.token
                Users.create(req.body.userInfo).then((user) => {

                    res.send(user)
                })
            }

            else res.send(user[0])

        })
    },

    addNote: (req, res) => {
        if (req.body.notePriority == "High") {
            console.log("hi")
            Users.update({ googleId: req.body.userGoogleId }, { $push: { highPriorityNotes: { $each: [req.body], $position: 0 } } }).then(() => {
                res.send("New note added")
            })
        }
        else if (req.body.notePriority == "Medium") {
            Users.update({ googleId: req.body.userGoogleId }, { $push: { mediumPriorityNotes: { $each: [req.body], $position: 0 } } }).then(() => {
                res.send("New note added")
            })
        }
        else {
            req.body.notePriority = "Low"
            Users.update({ googleId: req.body.userGoogleId }, { $push: { lowPriorityNotes: { $each: [req.body], $position: 0 } } }).then(() => {
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
                res.send("done")
            })

        }

        else if (req.body.priority == 'Medium') {
            console.log("hhh")
            const strr = `mediumPriorityNotes.${req.body.currentlyEditing}.noteText`
            Users.update({ googleId: req.body.userGoogleId }, { $set: { [strr]: req.body.currentlyEditingText } }).then(() => {
                res.send("done")
            })

        }

        else {

            const strr = `lowPriorityNotes.${req.body.currentlyEditing}.noteText`
            Users.update({ googleId: req.body.userGoogleId }, { $set: { [strr]: req.body.currentlyEditingText } }).then(() => {
                res.send("done")
            })

        }

    },

    deleteNote: (req, res) => {
        if (req.body.priority == "High") {
            const strr = `highPriorityNotes.${req.body.index}`
            Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                Users.update({ googleId: req.body.userGoogleId }, { $pull: { "highPriorityNotes": null } }).then(() => {
                    res.send("done")
                })

            })

        }

        else if (req.body.priority == "Medium") {
            const strr = `mediumPriorityNotes.${req.body.index}`
            Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                Users.update({ googleId: req.body.userGoogleId }, { $pull: { "mediumPriorityNotes": null } }).then(() => {
                    res.send("done")
                })

            })

        }

        else {
            const strr = `lowPriorityNotes.${req.body.index}`
            Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                Users.update({ googleId: req.body.userGoogleId }, { $pull: { "lowPriorityNotes": null } }).then(() => {
                    res.send("done")
                })

            })
        }



    },

    changePriority: (req, res) => {
        if (req.body.currentPriority == "High") {


            Users.find({ googleId: req.body.userGoogleId }, (err, user) => {
                console.log(err, user)
                let noteToShift = user[0].highPriorityNotes[req.body.index]
                if (req.body.newPriority == "Medium") {
                    noteToShift.notePriority = "Medium"
                    Users.update({ googleId: req.body.userGoogleId }, { $push: { mediumPriorityNotes: noteToShift } }).then(() => {

                        const strr = `highPriorityNotes.${req.body.index}`
                        Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                            Users.update({ googleId: req.body.userGoogleId }, { $pull: { "highPriorityNotes": null } }).then(() => {
                                res.send("done")
                            })


                        })
                    })

                }
                else {
                    noteToShift.notePriority = "Low"
                    Users.update({ googleId: req.body.userGoogleId }, { $push: { lowPriorityNotes: noteToShift } }).then(() => {
                        const strr = `highPriorityNotes.${req.body.index}`
                        Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                            Users.update({ googleId: req.body.userGoogleId }, { $pull: { "highPriorityNotes": null } }).then(() => {
                                res.send("done")
                            })


                        })

                    })
                }
            })
        }

        else if (req.body.currentPriority == "Medium") {
            console.log(req.body)


            Users.find({ googleId: req.body.userGoogleId }, (err, user) => {
                console.log(user)
                let noteToShift = user[0].mediumPriorityNotes[req.body.index]
                if (req.body.newPriority == "High") {
                    noteToShift.notePriority = "High"
                    Users.update({ googleId: req.body.userGoogleId }, { $push: { highPriorityNotes: noteToShift } }).then(() => {

                        const strr = `mediumPriorityNotes.${req.body.index}`
                        Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                            Users.update({ googleId: req.body.userGoogleId }, { $pull: { "mediumPriorityNotes": null } }).then(() => {
                                res.send("done")
                            })


                        })
                    })

                }
                else {
                    noteToShift.notePriority = "Low"
                    Users.update({ googleId: req.body.userGoogleId }, { $push: { lowPriorityNotes: noteToShift } }).then(() => {
                        const strr = `mediumPriorityNotes.${req.body.index}`
                        Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                            Users.update({ googleId: req.body.userGoogleId }, { $pull: { "mediumPriorityNotes": null } }).then(() => {
                                res.send("done")
                            })


                        })

                    })
                }
            })
        }

        else {


            Users.find({ googleId: req.body.userGoogleId }, (err, user) => {

                let noteToShift = user[0].lowPriorityNotes[req.body.index]
                if (req.body.newPriority == "High") {
                    noteToShift.notePriority = "High"
                    Users.update({ googleId: req.body.userGoogleId }, { $push: { highPriorityNotes: noteToShift } }).then(() => {

                        const strr = `lowPriorityNotes.${req.body.index}`
                        Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                            Users.update({ googleId: req.body.userGoogleId }, { $pull: { "lowPriorityNotes": null } }).then(() => {
                                res.send("done")
                            })


                        })
                    })

                }
                else {
                    noteToShift.notePriority = "medium"
                    Users.update({ googleId: req.body.userGoogleId }, { $push: { mediumPriorityNotes: noteToShift } }).then(() => {
                        const strr = `lowPriorityNotes.${req.body.index}`
                        Users.update({ googleId: req.body.userGoogleId }, { $unset: { [strr]: 1 } }).then(() => {
                            Users.update({ googleId: req.body.userGoogleId }, { $pull: { "lowPriorityNotes": null } }).then(() => {
                                res.send("done")
                            })


                        })

                    })
                }
            })
        }

    }

    // gotToken: (req, res) => {
    //     Users.find({ email: req.body.userEmail }, (err, user) => {
    //         res.send(user[0])
    //     })
    // }
}


export default controller