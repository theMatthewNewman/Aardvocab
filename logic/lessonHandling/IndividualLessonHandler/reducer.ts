import produce from "immer"
import { lessonType, lessonAction } from "./types"
import { exampleLesson } from "./exampleData"

export const LessonReducer = (state:lessonType = exampleLesson, action:lessonAction) => {
    return(produce(state, draft => {
        switch(action.type){
            case 'SET DATA':{
                draft = {...action.payload.data, lessonIndex:0}
                
                
                return(draft)
            }
            case "NEXT":{
                
                return(draft)
            }
            case 'CORRECT ANSWER':{
                draft.lessonIndex +=1
                return(draft)
            }
            
        }
    }))
}