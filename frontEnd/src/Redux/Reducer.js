import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'



const initialState = {
}


const userReducer = (state = initialState, action) => {

    switch (action.type) {

        // case ("USER_LOGGED_IN"):
        // const user = action.payload

        // return {
        //     ...state, user
        // }


        case ("NOTES_FROM_DB"):
            console.log("reducer")


            const user = action.payload


            return {
                ...state, user
            }

    }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(userReducer, composeEnhancers(applyMiddleware(thunk)))

export default store