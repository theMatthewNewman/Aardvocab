import produce from "immer"
import types from "./types";
import {Actions, actions} from "./actions"
import { dataState } from "./dataTypes";


const example:dataState = {
    platform:"android",
    adLoaded:false
}

export const reducer = (state:dataState = example, action:Actions) => {
    return(produce(state,draft => {
        switch (action.type){
            case types.SET_PLATFORM:{
                draft.platform = action.payload.data.platform
            return(draft);
            }
            case types.LOAD_AD:{
                draft.adLoaded = true
            return(draft);
            }
        }
    }))
}

