import {pageAction} from "./types"
import {pageState} from "./types"
import produce from "immer"

export const initialPageState:pageState ={
    page:"Login"

}

export const pageReducer = (state:pageState = initialPageState, action:pageAction) => {
    return(produce(state,draft => {
        switch (action.type){
            case"CHANGE PAGE":{
                draft.page=action.payload.page
                return(draft);
            }
        }
    }))
}