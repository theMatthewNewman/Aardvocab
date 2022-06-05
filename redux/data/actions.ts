import { dataState } from "./dataTypes";
import types from "./types";
import { lessonState } from "../lessons";


const updateUserdata = (data:dataState) => ({
    type: types.UPDATE_USERDATA,
    payload:{
        data
    }
});
const setTopUsers = (data:dataState) => ({
    type:types.SET_TOP_USERS,
    payload:{
        data
    }
})

export type Actions = ReturnType<typeof updateUserdata> |
                      ReturnType<typeof setTopUsers>



export const actions = {
    updateUserdata,
    setTopUsers

};
