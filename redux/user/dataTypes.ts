export type userState = {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:number
    level:number
    hearts:number
    lessonData:{subLessons:number, percentage:number,accuracy:number,type:string}[]
    daysPracticed:number[]
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
    lessonData:{subLessons:number,percentageCompleted:number, accuracy:number,type:string}[]
    daysPracticed:number[]
};