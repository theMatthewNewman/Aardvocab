import { Dispatch } from "redux";
import {actions, Actions} from "./actions";
import {Prompt, lessonState, lessonFirebase, concept} from "./dataTypes"
import {userState, userAction}from "../user"
import { adAction, dataState } from "../ads";
import {shuffleArray} from "./utils";
import { pageAction } from "../pages";

import {produce} from "immer"

//firebase
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase.config";


const getGlobalLessonsFirebase = async() => {
    try{
    const docRef = doc(db, "lessons", "globalLessons");
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
    }
    catch(error){
        
    }
}
const getLessonFirebase = async(id:number) => {
    const docRef = doc(db, "lessons", `${id}`);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
}
const getPromptFirebase = async(id:string, concept:concept) => {
    const docRef = doc(db, `${concept}`, `${id}`);
    const document = await getDoc(docRef)
    const dat:any = document.data()
    return(dat)
}
const setLessonState = (id:number, user:userState) => async(dispatch:Dispatch) => {
    const preLesson:lessonFirebase = await getLessonFirebase(id)
    const subLessons:any = await Promise.all(preLesson.subLessons.map(async(lesson) => {
        const prompts = shuffleArray(await Promise.all(lesson.prompts.map(async(promptRef) => {
            const prompt:Prompt = await getPromptFirebase(promptRef.id,promptRef.concept)
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
const correct = (user:userState, lesson:lessonState, ad:dataState) => (dispatch:Dispatch) => {
    if (lesson.lesson.active) {
        
        if (lesson.lesson.promptIndex +1 >= lesson.lesson.subLessons[lesson.lesson.subLessonIndex].prompts.length){
            completeLesson(user, lesson, ad) (dispatch)
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
const completeLesson = (user:userState, lesson:lessonState, ad:dataState) => async(dispatch:Dispatch) => {
    await adAction.playAd(ad) (dispatch)
    const newUser = produce(user,draft => {
        if (lesson.lesson.active){
            draft.lessonData[lesson.lesson.id].subLessons += 1
            draft.lessonData[lesson.lesson.id].percentage += (100/lesson.lesson.subLessons.length)
        }
        draft.level +=1
        const newDay= new Date()
        const today = newDay.getFullYear()+'/'+(newDay.getMonth()+1)+'/'+newDay.getDate(); 
        const day = new Date(draft.levelsCompletedToday.date*1000)
        const lastDayPracticed = day.getFullYear()+'/'+(day.getMonth()+1)+'/'+day.getDate();
        if (lastDayPracticed === today){
            draft.levelsCompletedToday.levels +=1
        } else{
            draft.levelsCompletedToday.date = (newDay.getTime()/1000)
            draft.levelsCompletedToday.levels = 1
        }
        return(draft)
    })
    const newLesson = produce(lesson, draft => {
        draft.lesson={active:false}
        return(draft)
    })
    userAction.addDay(newUser) (dispatch)
    updateLesson(newLesson) (dispatch)
    
    
}
const deactivateLesson = () => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.deactivate_lesson())
}

const allIDs = () => {
    db.collection("Vocabulary")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id); // For doc name
            })
        })
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
    completeLesson,
    deactivateLesson,
    allIDs
    
}