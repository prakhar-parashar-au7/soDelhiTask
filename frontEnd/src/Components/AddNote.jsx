import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'
import Axios from 'axios'
import Priority from './Priority'
//import './styles/postTextModel.css'
import { Image } from 'cloudinary-react'
//import ProfileButton from './profileButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PhotoUploader from './PhotoUploader';
import { noteCreateRequestAction } from '../Redux/Actions'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const MyVerticallyCenteredModal = (props) => {

    const [noteText, setNoteText] = useState("")
    const [photoInfo, setPhotoInfo] = useState("")
    const [notePriority, setNotePriority] = useState("")
    const dispatch = useDispatch()

    const userGoogleId = useSelector(state => state.user.googleId)

    const addNote = () => {
        console.log(notePriority)
        props.closeModal()
        dispatch(noteCreateRequestAction({ userGoogleId, noteText, photoInfo, notePriority }))
    }

    const setPriority = (priority) => {

        setNotePriority(priority)
    }
    const savePhotoInfo = (assetId) => {
        console.log("heuu")
        setPhotoInfo(assetId)
    }


    const photoStyle = {
        width: "560px",
        height: "400px",
        boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    }

    return (

        <Modal id="modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                    <div style={{ display: "grid", gridTemplateColumns: "500px auto auto", gridGap: "" }}>
                        <div>
                            Add a note
                        </div>
                        <div>
                            <small>Set Priority</small>
                        </div>
                        <div>


                            <Priority sendSelected={setPriority} />

                        </div>
                    </div>
                </Modal.Title>

            </Modal.Header>


            <Modal.Body>



                <div id="note" style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>

                    <TextField
                        id="filled-textarea"
                        label="Add a note"
                        placeholder="Set it's priority too"
                        multiline
                        variant="filled"
                        style={{ width: "400px" }}
                        defaultValue={noteText}
                        value={noteText}
                        onChange={(e) => { setNoteText(e.target.value) }}
                    />

                    <PhotoUploader photoInfo={savePhotoInfo} />

                    <Button variant="contained" size="small" color="primary" onClick={addNote}>Add Note</Button>

                </div>
                <br></br>
                {(photoInfo === "") ? null
                    :
                    <Image publicId={photoInfo} cloudName="prakhar-parashar" width="300" height="300" />}
            </Modal.Body>
        </Modal>

    );
}


export default MyVerticallyCenteredModal;