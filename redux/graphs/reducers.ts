import produce from "immer"
import types from "./types";
import {Actions, actions} from "./actions"
import { dataState } from "./dataTypes";


const example:dataState = {
    bucketedLevels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
    selfIndex:10
}

export const reducer = (state:dataState = example, action:Actions) => {
    return(produce(state,draft => {
        switch (action.type){
            case types.UPDATE_USERDATA:{
                draft = action.payload.data
            return(draft);
            }
        }
    }))
}

