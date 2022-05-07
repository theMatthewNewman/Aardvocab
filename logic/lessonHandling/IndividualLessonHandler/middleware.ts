import { lessonAction, lessonType } from "./types";
import {Dispatch} from "redux";

import { doc, getDoc } from "firebase/firestore";
import {db} from "../../../firebase.config";

export const CompletePrompt = (answer:number) => (dispatch:Dispatch) => {
    dispatch<lessonAction>({payload:{choice:answer},type:"NEXT"})
}

export const CorrectAnswer = () => (dispatch:Dispatch) => {
    dispatch<lessonAction>({type:"CORRECT ANSWER"})
}

export const getLessonFromDatabase = (id:number) => async(dispatch:Dispatch) => {
    const docRef = doc(db, "lessons", `${id}`);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    if (dat) dispatch<lessonAction>({type:'SET DATA', payload:{data:dat}})
    else {
        return(false)
    }
return (true)
}