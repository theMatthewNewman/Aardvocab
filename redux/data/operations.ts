import { Dispatch } from "redux";

import {actions, Actions} from "./actions";
import { userState } from "../user"
import { pageAction } from "../pages";


//firebase
import {setDoc, doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase.config";
import { dataFirebase, dataState, userMessage, userMessages} from "./dataTypes";

import {bucketUsers} from "./utils";

const setDataFirebase = async(user:userState, userLevels:dataFirebase) => {
    const docRef = doc(db,"data", "userLevels")
    let found = false
    const data:dataFirebase['users'] = userLevels.users.map((otherUser) => {
            if (otherUser.uid === user.uid) {
                found = true
                return({
                    level:user.level,
                    uid:user.uid,
                    levelsCompletedToday:user.levelsCompletedToday,
                    displayName:user.displayName,
                    photoURL:user.photoURL
                })
            } else{
                return(otherUser)
            }
        })
    if (found === false){
        data.push({
            level:user.level,
            uid:user.uid,
            levelsCompletedToday:user.levelsCompletedToday,
            displayName:user.displayName,
            photoURL:user.photoURL
        })
    }
    await setDoc(docRef,{users:data})
    return(data)
}
const setMessagesFirebase = async(user:userState, messages:userMessages) => {
    const docRef = doc(db,"data", user.uid)
    await setDoc(docRef,messages)
}
const getDataFirebase = async() => {
    const docRef = doc(db, "data", "userLevels");
    try{
        const document = await getDoc(docRef)
        const dat = document.data()!
        try{
            const data:dataFirebase = {
                users:dat.users
            }
            return(data)
        } catch(error:any){
            pageAction.updateMessage({type:'alert',active:true,message:error.toString()})
        }
    } catch(error:any){
        pageAction.updateMessage({type:'alert',active:true,message:error.toString()})
    }
}
const getMessagesFirebase = async(user:userState) => {
    const docRef = doc(db,"data", user.uid)
    const document = await getDoc(docRef)
    const dat = document.data()!
    const messages:userMessage[] = dat.messages
    return(messages)

}

const updateData = (user:userState) => async(dispatch:Dispatch) => {
    const userlevels = await getDataFirebase()
    if (userlevels) {
        const newData = await setDataFirebase(user, userlevels)
        const dat = bucketUsers({users:newData}, user)
        var messages:userMessages = {active:false}
        try{
            const mess = await getMessagesFirebase(user)
            messages = {messages:mess,active:true}
        } catch{
            await setMessagesFirebase(user, {active:false})
        }
        dispatch<Actions>(actions.updateUserdata({...dat,messages}))
    }

}

export const dataAction = {
    updateData,
    getDataFirebase,
    setDataFirebase,
    getMessagesFirebase,
    setMessagesFirebase
}