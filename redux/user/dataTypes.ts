import { concept } from "../lessons";

export type userState = {
    active:true
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:number
    level:number
    grammarLevel:number
    spellingLevel:number
    prosLevel:number
    vocabLevel:number
    hearts:number
    lessonData:{subLessons:number, percentage:number,errors:number,concept:concept}[]
    promptData:{errors:number, id:string, concept:concept}[]
    daysPracticed:number[]
    levelsCompletedToday:{date:number, levels:number}
};

export type userFirebase = {
    active:true
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:number
    level:number
    grammarLevel:number
    spellingLevel:number
    vocabLevel:number
    prosLevel:number
    hearts:number
    lessonData:{subLessons:number,percentageCompleted:number, errors:number,concept:concept}[]
    promptData:{errors:number, id:string, concept:concept}[]
    daysPracticed:number[]
    levelsCompletedToday:{date:number, levels:number}
};