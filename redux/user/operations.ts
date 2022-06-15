import { Dispatch } from "redux";

import {actions, Actions} from "./actions";
import { createUser } from "./utils";
import { userState } from "./dataTypes";
import produce from "immer"
import { pageAction } from "../pages";

//firebase
import {setDoc, doc, getDoc} from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {User} from "firebase/auth";

import * as ImagePicker  from 'expo-image-picker';
import { lessonState } from "../lessons";
import { Value } from "react-native-reanimated";


const setUserFirebase = async(user:userState) => {
    const docRef = doc(db,"users",user.uid)
    await setDoc(docRef,user)
    return(true)
}

const getUserFirebase = (uid:string) => async(dispatch:Dispatch) => {
    const data:any = await asyncFirebaseData(uid)
    dispatch<Actions>(actions.updateUser(data))
}

const asyncFirebaseData = async(uid:string) => {
    const docRef = doc(db, "users", uid);
    try{
        const document = await getDoc(docRef)
        const dat = document.data()!
        try{
            const data:userState = {
                active:true,
                uid:dat.uid,
                displayName:dat.displayName,
                email:dat.email,
                photoURL:dat.photoURL,
                emailVerified:dat.emailVerified,
                createdAt:dat.createdAt,
                level:dat.level,
                hearts:dat.hearts,
                lessonData:dat.lessonData,
                promptData:dat.promptData,
                daysPracticed:dat.daysPracticed,
                levelsCompletedToday:dat.levelsCompletedToday

            }
            return(data)
        } catch(error:any){
            pageAction.updateMessage({type:'alert',active:true,message:error.toString()})
        }
    } catch(error:any){
        pageAction.updateMessage({type:'alert',active:true,message:error.toString()})
    }   
}

const updateUser = (user:userState) => (dispatch:Dispatch) => {
    setUserFirebase(user)
    dispatch<Actions>(actions.updateUser(user))
}
const loseHeart = (user:userState, lesson:lessonState['lesson']) => (dispatch:Dispatch) => {
    if (!lesson.active){return;}
    const newUser = produce(user,draft => {
        draft.hearts -= 1
        var found = false
        draft.promptData = user.promptData.map((value, index) => {
            if (lesson.id===value.id && lesson.concept===value.concept){
                found = true
                return{
                    errors:value.errors+2,
                    id:value.id,
                    concept:value.concept
                }
            }
            return{...value}
        })
        if (!found){
            draft.promptData.push({
                errors:2,
                id:lesson.id,
                concept:lesson.concept
            })
        }
        return(draft)
    })

    updateUser(newUser) (dispatch)
}
const gainHeart = (user:userState,lesson:lessonState['lesson']) => (dispatch:Dispatch) => {
    if (!lesson.active){return;}
    const newUser = produce(user,draft => {
        draft.hearts += 1
        var found = false
        draft.promptData = user.promptData.map((value, index) => {
            if (lesson.id===value.id&& lesson.concept===value.concept){
                found = true
                if (value.errors===0){return{...value}}
                return{
                    errors:value.errors-1,
                    concept:value.concept,
                    id:value.id                    
                }
            }
            return({...value})
        })
        if (!found){
            draft.promptData.push({
                id:lesson.id,
                concept:lesson.concept,
                errors:0
            })
        }
        return(draft)
    })
    updateUser(newUser) (dispatch)
}

const newUser = (authorizedUser:User, username?:string) => async(dispatch:Dispatch) => {
    const user = createUser(authorizedUser, username);
    dispatch<Actions>(actions.signIn(user))
}

const logIn = (user:userState) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.signIn(user))
}
const changeProfilePicture = (user:userState) => async(dispatch:Dispatch) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images
    })
    if (!result.cancelled) {
        try{
        const {height, width, type, uri} = result;
        dispatch<Actions>(actions.changePicture(uri))
        const blob = await fetch(uri);
        const file = await blob.blob();
        const fileLink = `profileImages/${user.uid}`;
        const storageRef = ref(storage,fileLink);
        await uploadBytes(storageRef,file)
        const url = await getDownloadURL(storageRef)
        setUserFirebase({...user, photoURL:url})
        }catch(error){
            console.log(error)
        }
    }
}

const addDay = (user:userState) => async(dispatch:Dispatch) =>{
    var newuser = produce(user, draft => {
    var newDay = new Date()
    var newDayNoTime = newDay.getFullYear()+'/'+(newDay.getMonth()+1)+'/'+newDay.getDate(); 
    var present = false
    draft.daysPracticed.forEach(day => {
        var date = new Date(day*1000)
        var NoTimeDate = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
        if (newDayNoTime === NoTimeDate){
            
            present = true
        }
    })
    if (!present){
        draft.daysPracticed.push(newDay.getTime()/1000)
        
    }

    return(draft)})
    setUserFirebase(newuser)
    dispatch<Actions>(actions.updateUser(newuser))

}




export const userAction = {
    loseHeart,
    gainHeart,
    updateUser,
    changeProfilePicture,
    newUser,
    getUserFirebase,
    setUserFirebase,
    addDay,
    asyncFirebaseData
}