export type userState = {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:any
    level:number
    hearts:number
    lessonData:{subLessons:number, percentage:number}[]
};

export type userFirebase = {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:any
    level:number
    hearts:number
    lessonData:{subLessons:number,percentage:number}[]
};