import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const EditField = (props) => {

    const [text, setText] = useState("")

    const editText = (e) => {
        console.log(text)
        setText(e.target.value)
    }

    return (
        <div>

            <TextField
                id="outlined-multiline-static"
                fullWidth="true"
                multiline
                rows={11}
                onChange={editText}
                defaultValue={props.note.noteText}
                variant="outlined"
            >


            </TextField>
            <Button variant="contained" color="primary" size="small" onClick={(e) => {
                props.sendEditReq(props.note.notePriority, props.note.userGoogleId, text)
                setText("")
            }
            }>edit</Button>
        </div>
    )
}


export default EditField