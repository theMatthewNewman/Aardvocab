import { dataState } from "./dataTypes";
import types from "./types";
import { lessonState } from "../lessons";


const updateUserdata = (data:dataState) => ({
    type: types.UPDATE_USERDATA,
    payload:{
        data
    }
});


export type Actions = ReturnType<typeof updateUserdata> 



export const actions = {
    updateUserdata

};
