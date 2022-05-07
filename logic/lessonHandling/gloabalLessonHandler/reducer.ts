import produce from "immer"
import {globalLessonType, globalLessonActionType} from "./types"

import { exampleData } from "./exampleData"


export const globalLessonReducer = (state:globalLessonType = exampleData, action:globalLessonActionType) => {
    return(produce(state, draft => {
        switch (action.type){
            case 'SET GLOBAL DATA':{
                draft=action.payload
                return(draft)
            }
        }
    }))
}