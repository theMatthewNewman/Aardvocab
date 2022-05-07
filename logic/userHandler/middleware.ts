import {Dispatch} from "redux";
import { lessonType } from "../lessonHandling/IndividualLessonHandler/types";
import { userAction, userState } from "./types";
import {createUserLogic} from "./logic";

import * as ImagePicker  from 'expo-image-picker';


//firebase
import {setDoc, doc, getDoc} from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

import {User} from "firebase/auth";
import { ImagePickerIOS } from "react-native";
import { userReducer } from "./userReducer";


export const completedLesson = () => (dispatch:Dispatch) => {
    dispatch<userAction>({type:"COMPLETED LESSON"})
}

export const updateUserState = (user:userState) => (dispatch:Dispatch) => {
    dispatch<userAction>({type:"NEW RESULT", payload:user})
}

export const setUserObjectOnDatabase = async(user:userState) => {
    if (user.uid) setDoc(doc(db, "users", user.uid),{
       ...user 
    })
}

export const getUserFromDatabase = (uid:string) => async(dispatch:Dispatch) => {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    if (dat) dispatch<userAction>({type: "GET USER OBJECT", payload:{user:dat}})
    else {
        return(false)
    }
return (true)
}

export const newUser = (authorizedUser:User, username?:string, phoneNumber?:string) => async(dispatch:Dispatch) => {
    const user = createUserLogic(authorizedUser, username, phoneNumber)
    dispatch<userAction>({type: "CREATE USER OBJECT", payload:{user:user}})
    return(undefined)

}

export const changeProfilePicture = (user:userState) => async(dispatch:Dispatch) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images
    })
    if (!result.cancelled) {
        const {height, width, type, uri} = result;
        dispatch<userAction>({type:"CHANGE PICTURE", payload:uri})
        const blob = await fetch(uri);
        const file = await blob.blob();
        const fileLink = `profileImages/${user.uid}`;
        const storageRef = ref(storage,fileLink);
        await uploadBytes(storageRef,file)
        const url = await getDownloadURL(storageRef)
        setUserObjectOnDatabase({...user, photoUrl:url})
        
    }
}

export const saveChanges = (user:userState) => (dispatch:Dispatch) => {
    setUserObjectOnDatabase(user)
    updateUserState(user) (dispatch)
}