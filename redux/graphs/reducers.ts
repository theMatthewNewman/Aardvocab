import produce from "immer"
import types from "./types";
import {Actions, actions} from "./actions"
import { dataState } from "./dataTypes";


const example:dataState = {
    levels:[
        {
            uid:"example",
            level:5
        },
        {
            uid:"example2",
            level:7
        },
        {
            uid:"example3",
            level:0
        },
        {
            uid:"example3",
            level:3
        }
    ]
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

