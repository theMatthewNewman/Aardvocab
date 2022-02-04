import {userData, chartAction} from "./types"
import { exampleUser } from "./exampleData"
import produce from "immer"

export const example:userData = exampleUser;
// currently i am storing all results inside of one global context for all users
// if i want to reference to the current user than i have to loop through all of it to 
// get that user... this is dumb i am sure.
// if I put all the averages in one file that would be better.
export const userDataReducer = (state:userData = example, action:chartAction) => {
    return(produce(state,draft => {
        switch (action.type){
            case "NEW RESULT":{
                draft=action.payload;
            return(draft);
            }
        }
    }))
}