import { UPDATE_COMPLETED, UPDATE_INCOMPLETE } from "../Actions/types";
import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux'

const initialState = {
    incomplete: {
        incomplete: []
    },
    completed: {
        completed: []
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_COMPLETED:
            return {
                ...state,
                completed: action.payload.completed ? { completed: action.payload.completed } : state.completed,
            }
        case UPDATE_INCOMPLETE:
            return {
                ...state,
                incomplete: action.payload.incomplete ? { incomplete: action.payload.incomplete } : state.incomplete
            }
        default:
            return state
    }
}

// export default reducer
export default combineReducers({ values : reducer})