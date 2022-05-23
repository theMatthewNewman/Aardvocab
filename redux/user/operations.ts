import { Dispatch } from "redux";

import {actions, Actions} from "./actions";
import { createUser } from "./utils";
import { userState } from "./dataTypes";
import { lessonState, lessonAction } from "../lessons";
import produce from "immer"

//firebase
import {setDoc, doc, getDoc} from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {User} from "firebase/auth";

import * as ImagePicker  from 'expo-image-picker';
import DaysPracticed from "../../views/pages/Results/graphs/DaysGraph";

const setUserFirebase = async(user:userState) => {
    const docRef = doc(db,"users",user.uid)
    await setDoc(docRef,user)
    return(true)
}

const getUserFirebase = (uid:string) => async(dispatch:Dispatch) => {
    const docRef = doc(db, "users", uid);
    try{
        const document = await getDoc(docRef)
        const dat = document.data()!
        try{
            const data:userState = {
                uid:dat.uid,
                displayName:dat.displayName,
                email:dat.email,
                photoURL:dat.photoURL,
                emailVerified:dat.emailVerified,
                createdAt:dat.createdAt,
                level:dat.level,
                hearts:dat.hearts,
                lessonData:dat.lessonData,
                daysPracticed:dat.daysPracticed
            }
            dispatch<Actions>(actions.updateUser(data))
        } catch(error){
                console.log("data is not in correct format")
                console.log(error)
        }
    } catch(error){
        console.log("error Connecting to database")
        console.log(error)
    }   
}

const updateUser = (user:userState) => (dispatch:Dispatch) => {
    setUserFirebase(user)
    dispatch<Actions>(actions.updateUser(user))
}
const loseHeart = (user:userState) => (dispatch:Dispatch) => {
    const newUser = produce(user,draft => {
        draft.hearts -= 1
        return(draft)
    })
    updateUser(newUser) (dispatch)
}
const gainHeart = (user:userState) => (dispatch:Dispatch) => {
    const newUser = produce(user,draft => {
        draft.hearts += 1
        return(draft)
    })
    updateUser(newUser) (dispatch)
}
const completeLesson = (user:userState, lesson:lessonState) => (dispatch:Dispatch) => {
    const newUser = produce(user,draft => {
        if (lesson.lesson.active){
            draft.lessonData[lesson.lesson.id].subLessons += 1
            draft.lessonData[lesson.lesson.id].percentage += (100/lesson.lesson.subLessons.length)
        }
        draft.level +=1
        return(draft)
    })
    const newLesson = produce(lesson, draft => {
        draft.lesson={active:false}
        return(draft)
    })
    updateUser(newUser) (dispatch)
    lessonAction.updateLesson(newLesson) (dispatch)
    
}
const newUser = (authorizedUser:User, username?:string) => async(dispatch:Dispatch) => {
    const user = createUser(authorizedUser, username);
    console.log(user)
    updateUser(user) (dispatch)
}

const changeProfilePicture = (user:userState) => async(dispatch:Dispatch) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images
    })
    if (!result.cancelled) {
        const {height, width, type, uri} = result;
        dispatch<Actions>(actions.changePicture(uri))
        const blob = await fetch(uri);
        const file = await blob.blob();
        const fileLink = `profileImages/${user.uid}`;
        const storageRef = ref(storage,fileLink);
        await uploadBytes(storageRef,file)
        const url = await getDownloadURL(storageRef)
        setUserFirebase({...user, photoURL:url})
        
    }
}

const addDay = (user:userState) => async(dispatch:Dispatch) =>{
    const newDay = new Date()
    user.daysPracticed.push(newDay.getSeconds())

}




export const userAction = {
    loseHeart,
    gainHeart,
    updateUser,
    changeProfilePicture,
    newUser,
    getUserFirebase,
    completeLesson,
    setUserFirebase,
}