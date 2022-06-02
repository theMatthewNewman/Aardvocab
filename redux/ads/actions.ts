import { dataState } from "./dataTypes";
import types from "./types";
import { lessonState } from "../lessons";


const setPlatform = (data:dataState) => ({
    type: types.SET_PLATFORM,
    payload:{
        data
    }
});
const loadAd = (data:dataState) => ({
    type: types.LOAD_AD,
    payload:{
        data
    }
});


export type Actions = ReturnType<typeof setPlatform> |
                      ReturnType<typeof loadAd>



export const actions = {
    setPlatform,
    loadAd

};
