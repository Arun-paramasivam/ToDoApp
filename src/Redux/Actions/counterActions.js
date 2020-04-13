import {UPDATE_COMPLETED, UPDATE_INCOMPLETE} from './types'

export const updateCompleted = (completed) => {
    console.log('redux update completed called')
    return {
        type: UPDATE_COMPLETED,
        payload: completed
    }   
}

export const updateIncomplete = (incomplete) => {
    console.log('redux update incomplete called')
    return {
        type: UPDATE_INCOMPLETE,
        payload: incomplete
    }   
}