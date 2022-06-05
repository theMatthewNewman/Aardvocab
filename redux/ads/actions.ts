import { dataState } from "./dataTypes";
import types from "./types";
import { lessonState } from "../lessons";


const setPlatform = (data:dataState) => ({
    type: types.SET_PLATFORM,
    payload:{
        data
    }
});
const loadAd = () => ({
    type: types.LOAD_AD,

});
const setCount = (increase:boolean) => ({
    type: types.SET_COUNT,
    payload:{
        increase
    }
})

export type Actions = ReturnType<typeof setPlatform> |
                      ReturnType<typeof loadAd> |
                      ReturnType<typeof setCount>



export const actions = {
    setPlatform,
    loadAd,
    setCount

};
