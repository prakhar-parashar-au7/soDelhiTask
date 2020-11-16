import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react'
import './masonry.css'
import Axios from 'axios'
import { getUpdatedNotesAction } from '../Redux/Actions'
import Masonry from 'react-masonry-css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip'
import ChangePriority from './changePriority';
import EditField from './EditField'



const NotesGrid = (props) => {

    // const [currentPriority, setCurrentPriority] = React.useState("")
    const [isEditHighLoading, setEditHighLoading] = React.useState(false)
    const [isEditMediumLoading, setEditMediumLoading] = React.useState(false)
    const [isEditLowLoading, setEditLowLoading] = React.useState(false)
    const [currentlyEditing, setCurrentlyEditing] = React.useState(-1)
    const dispatch = useDispatch()

    const user = useSelector(state => {
        if (state) {

            return state.user
        }
    })


    const rev = user[props.notes]


    const editNote = (index, priority) => {
        // setCurrentPriority(priority)
        setCurrentlyEditing(index)
    }


    const sendEditReq = (priority, userGoogleId, currentlyEditingText) => {

        if (priority === "High") {
            setEditHighLoading(true)
        }
        else if (priority === "Medium") {
            setEditMediumLoading(true)
        }
        else {
            setEditLowLoading(true)
        }


        Axios({
            method: "post",
            url: "https://cryptic-reef-81818.herokuapp.com/editNote",
            data: {
                priority, currentlyEditing, currentlyEditingText, userGoogleId
            }
        }).then(() => {
            console.log("hiii")
            setCurrentlyEditing(-1)

            // setCurrentPriority("")
            if (priority === "High") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditHighLoading))
            }
            else if (priority === "Medium") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditMediumLoading))
            }
            else {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditLowLoading))

            }
        })
        console.log(currentlyEditing, currentlyEditingText)
    }


    const deleteNote = (index, priority, userGoogleId) => {
        setCurrentlyEditing(index)
        if (priority === "High") {
            setEditHighLoading(true)
        }
        else if (priority === "Medium") {
            setEditMediumLoading(true)
        }
        else {
            setEditLowLoading(true)
        }
        Axios({
            method: "post",
            url: "https://cryptic-reef-81818.herokuapp.com/deleteNote",
            data: {
                priority, index, userGoogleId
            }
        }).then(() => {

            if (priority === "High") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditHighLoading))
                setCurrentlyEditing(-1)
            }
            else if (priority === "Medium") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditMediumLoading))
                setCurrentlyEditing(-1)
            }
            else {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditLowLoading))
                setCurrentlyEditing(-1)

            }
        })
    }



    const changePriorityRequest = (newPriority, currentPriority, index, userGoogleId) => {
        setCurrentlyEditing(index)
        if (currentPriority === "High") {
            setEditHighLoading(true)
        }
        else if (currentPriority === "Medium") {
            setEditMediumLoading(true)
        }
        else {
            setEditLowLoading(true)
        }

        Axios({
            method: "post",
            url: "https://cryptic-reef-81818.herokuapp.com/changePriority",
            data: {
                newPriority,
                currentPriority,
                index,
                userGoogleId
            }
        }).then(() => {

            if (currentPriority === "High") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditHighLoading))
                setCurrentlyEditing(-1)
            }
            else if (currentPriority === "Medium") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditMediumLoading))
                setCurrentlyEditing(-1)
            }
            else {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditLowLoading))
                setCurrentlyEditing(-1)

            }
        })
    }



    return (

        <div>
            <h5 style={{ marginLeft: "40px", marginBottom: "30px" }}>{props.type}</h5>

            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">



                {

                    rev.map((note, index) =>

                        <div>
                            {
                                (note) ?
                                    <div>

                                        {

                                            ((isEditHighLoading || isEditMediumLoading || isEditLowLoading) && currentlyEditing === index) ? <CircularProgress /> :
                                                <div>
                                                    {
                                                        (currentlyEditing === index) ?



                                                            <div>

                                                                <EditField note={note} sendEditReq={sendEditReq} />

                                                            </div>

                                                            :
                                                            <div style={{ margin: "25px", textAlign: "center" }}>
                                                                {
                                                                    (!(note.photoInfo === "")) ?
                                                                        <div>
                                                                            <div>
                                                                                <Image publicId={note.photoInfo} width="100" height="100" cloudName="prakhar-parashar" />

                                                                            </div>
                                                                            <hr width="75%"></hr>
                                                                        </div>
                                                                        :
                                                                        null}
                                                                <div style={{ textAlign: "justify" }}>
                                                                    {note.noteText}
                                                                </div>
                                                                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "20px" }}>
                                                                    <Tooltip title="edit">
                                                                        <IconButton onClick={() => { editNote(index, note.notePriority) }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                        </svg></IconButton>
                                                                    </Tooltip>

                                                                    <Tooltip title="Delete">
                                                                        <IconButton aria-label="delete" onClick={() => { deleteNote(index, note.notePriority, note.userGoogleId) }}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Tooltip>

                                                                    <ChangePriority currentPriority={note.notePriority} index={index} userGoogleId={note.userGoogleId} changePriorityRequest={changePriorityRequest} />
                                                                </div>
                                                            </div>
                                                    }
                                                </div>}

                                    </div> : null}
                        </div>

                    )
                }

            </Masonry>
        </div>

    )

}

export default NotesGrid











