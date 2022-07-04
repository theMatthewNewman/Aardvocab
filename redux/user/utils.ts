import { User } from "firebase/auth"
import { userState } from "./dataTypes";

export const createUser =(user:User, username?:string):userState => {
    var seed = String(Math.random()*12)
    var photoURL="https://avatars.dicebear.com/api/identicon/"+seed+".png";

    if (user.photoURL){
        photoURL = user.photoURL
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



    return({
        active:true,
        displayName,
        email,
        photoURL,
        emailVerified: user.emailVerified,
        uid,
        level:0,
        spellingLevel:0,
        grammarLevel:0,
        prosLevel:0,
        vocabLevel:0,
        createdAt: new Date().getTime(),
        hearts:5,
        lessonData: new Array(100).fill({subLessons:0, percentage:0, errors:0, concept:'Vocabulary'}),
        promptData: new Array(100).fill({errors:0, concept:'Vocabulary',id:'test'}),
        daysPracticed:[new Date().getTime()],
        levelsCompletedToday:{levels:0,date:new Date().getTime()}
    })
}

export const changePictureLogic = (user:userState,photoURL:string) => {
    const userInfo = {
        ...user, photoURL
    }
    return({...userInfo})
}

