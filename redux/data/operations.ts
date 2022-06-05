import { Dispatch } from "redux";

import {actions, Actions} from "./actions";
import { userState } from "../user"
import { pageAction } from "../pages";


//firebase
import {setDoc, doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase.config";
import { dataFirebase} from "./dataTypes";

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
                    levelsCompletedToday:user.levelsCompletedToday
                })
            } else{
                return(otherUser)
            }
        })
    if (found === false){
        data.push({level:user.level,uid:user.uid,levelsCompletedToday:user.levelsCompletedToday})
    }
    await setDoc(docRef,{users:data})
    return(data)
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
            console.log(data)
            return(data)
        } catch(error:any){
            pageAction.updateMessage({type:'alert',active:true,message:error.toString()})
        }
    } catch(error:any){
        pageAction.updateMessage({type:'alert',active:true,message:error.toString()})
    }   
}

const updateData = (user:userState) => async(dispatch:Dispatch) => {
    const userlevels = await getDataFirebase()
    if (userlevels) {
        const newData = await setDataFirebase(user, userlevels)
        const dat = bucketUsers({users:newData}, user)
        dispatch<Actions>(actions.updateUserdata(dat))
    }

}

export const dataAction = {
    updateData,
    getDataFirebase,
    setDataFirebase,
}