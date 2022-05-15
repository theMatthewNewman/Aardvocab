import produce from "immer"
import types from "./types";
import {Actions, actions} from "./actions"
import { pageState, } from "./dataTypes";


const example:pageState = {
    page:"Lessons",
    message:{
        active:false,
        message:"Error",
        type:"wrong"
    }

}

export const reducer = (state:pageState = example, action:Actions) => {
    return(produce(state,draft => {
        switch (action.type){
            case types.CHANGE_PAGE:{
                draft.page = action.payload.page
            return(draft);
            }
            case types.UPDATE_MESSAGE:{
                draft.message = action.payload.message
            return(draft);
            }
        }
    }))
}

