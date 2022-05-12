import { lessonAction, lessonType } from "./types";
import {Dispatch} from "redux";

import { doc, getDoc } from "firebase/firestore";
import {db} from "../../../firebase.config";

import { userAction, userState } from "../../userHandler/types";
import { async } from "@firebase/util";

export const CompletePrompt = (answer:number) => (dispatch:Dispatch) => {
    dispatch<lessonAction>({payload:{choice:answer},type:"NEXT"})
}

export const CorrectAnswer = (user:userState) => (dispatch:Dispatch) => {
    dispatch<lessonAction>({type:"CORRECT ANSWER", payload:{userLevel:user.datasets.lessonProgress}})
}

export const getLessonFromDatabase = async(id:number) => {
    const docRef = doc(db, "lessons", `${id}`);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
}

export const getPromptFromDatabase = async(id:number) => {
    const docRef = doc(db, "prompts", `${id}`);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
}

export const selectedLesson = (id:number, user:userState) => async() => {
    var lesson = await getLessonFromDatabase(id)
    var promptIDS = lesson.sublessons[0].prompts
    var prompts = promptIDS.map(async(promptId:number) => {await getPromptFromDatabase(promptId)})
    console.log(prompts)
}