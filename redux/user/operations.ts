import { Dispatch } from "redux";

import {actions, Actions} from "./actions";
import { createUser } from "./utils";
import { userState } from "./dataTypes";
import produce from "immer"

//firebase
import {setDoc, doc, getDoc} from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {User} from "firebase/auth";

import * as ImagePicker  from 'expo-image-picker';

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
    var newuser = produce(user, draft => {
    var newDay = new Date()
    var newDayNoTime = newDay.getFullYear()+'/'+(newDay.getMonth()+1)+'/'+newDay.getDate(); 
    var present = false
    draft.daysPracticed.forEach(day => {
        var date = new Date(day)
        var NoTimeDate = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(); 
        if (newDayNoTime === NoTimeDate){
            present = true
        }
    })
    if (!present){
        draft.daysPracticed.push(newDay.getSeconds())
        
    }
    return(draft)})
    setUserFirebase(newuser)
    dispatch<Actions>(actions.updateUser(user))

}




export const userAction = {
    loseHeart,
    gainHeart,
    updateUser,
    changeProfilePicture,
    newUser,
    getUserFirebase,
    setUserFirebase,
    addDay
}