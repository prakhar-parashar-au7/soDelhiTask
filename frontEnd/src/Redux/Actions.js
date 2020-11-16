import Axios from 'axios'


export const userLoggedIn = (userInfo, history, setIsLoading,) => {

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
            localStorage.clear()
            localStorage.setItem("userGoogleId", userInfo.profileObj.googleId)
            dispatch(storeInfoInRedux(response.data))
            if (setIsLoading) {
                setIsLoading(false)
            }
            if (history) {
                history.push('/Home')
            }

        })

    }






}




export const noteCreateRequestAction = (note, closeModal, setIsLoading) => {

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
            dispatch(getUpdatedNotesAction(note.userGoogleId, closeModal, setIsLoading))
        })


    }
}

export const getUpdatedNotesAction = (userGoogleId, closeModal, setIsLoading) => {
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
            setIsLoading(false)
            if (closeModal) {
                closeModal()
            }

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
