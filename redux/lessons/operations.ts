import { Dispatch } from "redux";
import {actions, Actions} from "./actions";
import {Prompt, lessonState, lessonFirebase} from "./dataTypes"
import {userState, userAction}from "../user"
import {shuffleArray} from "./utils";

import {produce} from "immer"

//firebase
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase.config";


const getGlobalLessonsFirebase = async() => {
    const docRef = doc(db, "lessons", "globalLessons");
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
}
const getLessonFirebase = async(id:number) => {
    const docRef = doc(db, "lessons", `${id}`);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
}
const getPromptFirebase = async(id:number) => {
    const docRef = doc(db, "prompts", `${id}`);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
}
const setLessonState = (id:number, user:userState) => async(dispatch:Dispatch) => {
    const preLesson:lessonFirebase = await getLessonFirebase(id)
    const subLessons:any = await Promise.all(preLesson.subLessons.map(async(lesson) => {
        const prompts = shuffleArray(await Promise.all(lesson.prompts.map(async(id) => {
            const prompt:Prompt = await getPromptFirebase(id)
            return(prompt)
        })))
        return({prompts})
    }))
    const lesson = {...preLesson,
                    subLessons, 
                    active:true, 
                    promptIndex:0,
                    subLessonIndex:user.lessonData[preLesson.id].subLessons}
    dispatch<Actions>(actions.updateLesson(lesson))
}
const setGlobalLessonsState = () => async(dispatch:Dispatch) => {
    const newGlobalLessonsState = await getGlobalLessonsFirebase()
    dispatch<Actions>(actions.updateGlobalLessons({...newGlobalLessonsState, active:true}))
}
const updateLesson = (lesson:lessonState) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.updateLesson(lesson["lesson"]))
}
const correct = (user:userState, lesson:lessonState) => (dispatch:Dispatch) => {
    if (lesson.lesson.active) {
        
        if (lesson.lesson.promptIndex +1 >= lesson.lesson.subLessons[lesson.lesson.subLessonIndex].prompts.length){
            completeLesson(user, lesson) (dispatch)
        } else {
            dispatch<Actions>(actions.completePrompt())
        }
        
    }
}
const Incorrect = (user:userState, lesson:lessonState) => (dispatch:Dispatch) => {
    userAction.loseHeart(user) (dispatch)
    const newLessonState:lessonState = produce(lesson, draft => {
        if (draft.lesson.active && lesson.lesson.active){
            const subLessonIndex = lesson.lesson.subLessonIndex
            const promptIndex = lesson.lesson.promptIndex
            draft.lesson.subLessons[subLessonIndex].prompts.splice(promptIndex,1)
            draft.lesson.subLessons[subLessonIndex].prompts.push(lesson.lesson.subLessons[subLessonIndex].prompts[promptIndex])
            console.log(draft.lesson.subLessons[subLessonIndex].prompts)
        }
        return(draft)
    })
    dispatch<Actions>(actions.updateLesson(newLessonState["lesson"]))
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
    userAction.addDay(newUser) (dispatch)
    updateLesson(newLesson) (dispatch)
    
}

export const lessonAction = {
    getLessonFirebase,
    getPromptFirebase,
    getGlobalLessonsFirebase,
    setLessonState,
    setGlobalLessonsState,
    correct,
    Incorrect,
    updateLesson,
    completeLesson
}