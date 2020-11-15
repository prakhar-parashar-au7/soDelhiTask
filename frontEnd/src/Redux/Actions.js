import Axios from 'axios'


export const userLoggedIn = (userInfo, history) => {
    console.log(userInfo)
    console.log(process.env.BACKEND_URL)
    return async (dispatch) => {

        Axios({
            method: "post",
            url: "https://cryptic-reef-81818.herokuapp.com/userLogin",
            data: {
                userInfo: userInfo.profileObj,
                token: userInfo.accessToken
            }
        }).then((response) => {
            console.log(response.data)
            dispatch(storeInfoInRedux(response.data))
            history.push('/Home')
        })

    }






}




export const noteCreateRequestAction = (note) => {
    console.log("postcreateaction")
    return async (dispatch) => {

        await Axios({
            method: "post",
            url: 'https://cryptic-reef-81818.herokuapp.com/addNote',
            data: {
                userGoogleId: note.userGoogleId,
                noteText: note.noteText,
                photoInfo: note.photoInfo,
                notePriority: note.notePriority
            }
        }).then((response) => {
            dispatch(getUpdatedNotesAction(note.userGoogleId))
        })


    }
}

export const getUpdatedNotesAction = (userGoogleId) => {
    console.log("getUpdatedNotesAction")
    return async (dispatch) => {
        await Axios({
            method: "post",
            url: "https://cryptic-reef-81818.herokuapp.com/getUpdatedNotes",
            data: {
                userGoogleId: userGoogleId
            }

        }).then((res) => {
            console.log(res.data[0])
            dispatch(storeInfoInRedux(res.data[0]))
        })



    }
}


export const storeInfoInRedux = (info) => {
    console.log(info)
    return {
        type: "NOTES_FROM_DB",
        payload: info
    }
}
