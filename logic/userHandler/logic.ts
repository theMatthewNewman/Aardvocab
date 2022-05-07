import { User } from "firebase/auth"
import {userState} from "./types"

export const createUserLogic =(user:User, username?:string, phoneNum?:string):userState => {
    let photoUrl="anon"

    if (user.photoURL){
        photoUrl = user.photoURL
    }else{
        let seed = String(Math.random()*12)
        photoUrl = "https://avatars.dicebear.com/api/identicon/"+seed+".png";
    }
    
    let displayName = "anon";
    if (user.displayName){
        displayName = user.displayName
    }
    if (username){
        displayName=username
    }

    let email = "anon"
    if (user.email){
        email=user.email
    }
    let uid = "anon"
    if (user.uid){
        uid = user.uid
    }

    let phoneNumber = "anon"
    if (user.phoneNumber){
        phoneNumber=user.phoneNumber
    }


    const userInfo = {
        displayName,
        phoneNumber,
        email,
        photoUrl,
        emailVerified: user.emailVerified,
        uid,
        datasets:{
            lessonResults:[0],
            lessonProgress:0
        },
        createdAt:new Date(),
        hearts:5
    }
    return({...userInfo})
}

export const changePictureLogic = (user:userState,photoURL:string) => {
    const userInfo = {
        ...user, photoURL
    }
    return({...userInfo})
}