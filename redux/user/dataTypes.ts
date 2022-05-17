export type userState = {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:{
        nanoseconds:number,
        seconds:number
    }
    level:number
    hearts:number
    lessonData:{subLessons:number, percentage:number}[]
    daysPracticed:{
        nanoseconds:number,
        seconds:number
    }[]
};

export type userFirebase = {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    photoURL:string
    createdAt:{
        nanoseconds:number,
        seconds:number
    }
    level:number
    hearts:number
    lessonData:{subLessons:number,percentage:number}[]
    daysPracticed:{
        seconds:number,
        nanoseconds:number
    }[]
};