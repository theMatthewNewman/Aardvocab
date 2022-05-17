import { Dispatch } from "redux";

import {actions, Actions} from "./actions";
import { createUser } from "./utils";
import { userState } from "../user"
import { lessonState, lessonAction } from "../lessons";
import produce from "immer"

//firebase
import {setDoc, doc, getDoc} from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {User} from "firebase/auth";

import * as ImagePicker  from 'expo-image-picker';
import { dataState } from "./dataTypes";

const setDataFirebase = async(user:userState, userLevels:dataState) => {
    const docRef = doc(db,"data", "userLevels")
    const data:dataState ={
        levels:userLevels.levels.map((level) => {
            if (level.uid === user.uid) {
                return({
                    level:user.level,
                    uid:user.uid
                })
            } else{
                return(level)
            }
        })
    }
    await setDoc(docRef,data)
    return(data)
}

const getDataFirebase = async() => {
    const docRef = doc(db, "data", "userLevels");
    try{
        const document = await getDoc(docRef)
        const dat = document.data()!
        try{
            const data:dataState = {
                levels:dat.levels
            }
            return(data)
        } catch(error){
                console.log("data is not in correct format")
                console.log(error)
        }
    } catch(error){
        console.log("error Connecting to database")
        console.log(error)
    }   
}

const updateData = (user:userState) => async(dispatch:Dispatch) => {
    const userlevels = await getDataFirebase()
    if (userlevels) {
        const newData = await setDataFirebase(user, userlevels)
        dispatch<Actions>(actions.updateUserdata(newData))
    }

}

export const dataAction = {
    updateData,
    getDataFirebase,
    setDataFirebase,
}