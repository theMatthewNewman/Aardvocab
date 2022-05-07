import {userState, userAction} from "./types"
import { exampleUser } from "./exampleData"
import produce from "immer"

export const example:userState = exampleUser;
// currently i am storing all results inside of one global context for all users
// if i want to reference to the current user than i have to loop through all of it to 
// get that user... this is dumb i am sure.
// if I put all the averages in one file that would be better.
export const userReducer = (state:userState = example, action:userAction) => {
    return(produce(state,draft => {
        switch (action.type){
            case "NEW RESULT":{
                draft=action.payload;
            return(draft);
            }
            case "COMPLETED LESSON":{
                draft.datasets.lessonProgress +=1
                return(draft);
            }
            case "GET USER OBJECT":{
                
                return(action.payload.user)
                
            }
            case "CHANGE PICTURE":{
                draft.photoUrl = action.payload
                return(draft)
            }
        }
    }))
}