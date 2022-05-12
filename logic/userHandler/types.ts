import { lessonType } from "../lessonHandling/IndividualLessonHandler/types";

export type userState= {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    phoneNumber:string
    photoUrl:string
    createdAt:any

    datasets:

        {
            lessonResults:number[] // results are how well they do on tests
            lessonProgress:number// progress is how many lessons they have completed

        },
    hearts:number
};

type newRes = {
    type: "NEW RESULT"
    payload:userState
}

type completedLesson = {
    type:"COMPLETED LESSON"
}

type userObjAction = {
    type: "CREATE USER OBJECT"| "GET USER OBJECT"
    payload:{user:userState}
}
type pictureAction = {
    type: "CHANGE PICTURE"
    payload:string
}
type changeHeart = {
    type: "CHANGE HEARTS"
    payload:{hearts:number}
}
type correct = {
    type: "CORRECT ANSWER"
    payload:{
        userLevel:number
    }
}
export type userAction = newRes | completedLesson | userObjAction | pictureAction | changeHeart | correct
