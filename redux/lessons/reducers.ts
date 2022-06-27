import produce from "immer"
import types from "./types";

import {Actions, actions} from "./actions"
import { lessonState } from "./dataTypes";

const example:lessonState = {
    globalLessons:{
        active:false
    },
    lesson:{
        active:false
    }
}

export const reducer = (state:lessonState = example, action:Actions) => {
    return(produce(state,draft => {
        switch (action.type){
            case types.ACTIVATE_GLOBAL_LESSONS:{
                draft.globalLessons = {lessons:action.payload.store, active:true}
                
                return(draft)
            }
            case types.DEACTIVATE_LESSON:{
                draft.globalLessons = {active:false}
                return(draft)
            }
            case types.UPDATE_LESSON:{
                draft.lesson = action.payload.lesson
                return(draft)
            }
            case types.COMPLETE_LESSON:{
                draft.lesson = {active:false}
                return(draft)
            }
            case types.COMPLETE_PROMPT:{

                if (draft.lesson.active){
                    draft.lesson.promptIndex +=1
                    
                }
                return(draft)
            }
            
        }
    }))
}

