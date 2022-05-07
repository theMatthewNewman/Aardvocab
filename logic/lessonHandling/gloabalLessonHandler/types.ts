export type lessonLink = {
    name:string
    picture:string
    id:number
    type:'Vocabulary'|'Spelling'|'Grammar'
}

export type globalLessonType = {
    lessons:lessonLink[]
}

export type globalLessonActionType = {
    type:'SET GLOBAL DATA'
    payload:{
        lessons:lessonLink[]
    }
}