import {userState} from "../userHandler/types"
import { lessonType } from "../lessonHandling/IndividualLessonHandler/types"


export type averageState = {
    uid:string
    grammarLessonProgress:number
    averageGrammarTestResults:number
    vocabLessonProgress:number
    averageVocabTestResults:number
    spellingLessonProgress:number
    averageSpellingTestResults:number
}[]

type update = {
    type:"UPDATE PROGRESS"
    payload:{
        user:userState
    }
}

export type averageAction = update 