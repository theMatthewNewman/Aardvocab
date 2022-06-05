import { concept } from "../lessons";

export type userState = {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:number
    level:number
    hearts:number
    lessonData:{subLessons:number, percentage:number,errors:number,concept:concept}[]
    promptData:{errors:number, id:string, concept:concept}[]
    daysPracticed:number[]
    levelsCompletedToday:{date:number, levels:number}
};

export type userFirebase = {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:number
    level:number
    hearts:number
    lessonData:{subLessons:number,percentageCompleted:number, errors:number,concept:concept}[]
    promptData:{errors:number, id:string, concept:concept}[]
    daysPracticed:number[]
    levelsCompletedToday:{date:number, levels:number}
};