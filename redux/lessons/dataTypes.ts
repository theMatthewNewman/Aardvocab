export type Prompt = {
                prompt: string
                choices: {
                    title:string
                    correct:boolean
                }[]
                type:'multi'
                photoURL?:string
                messages:{
                    title:string
                    definition:string
                    example:string
                }
              }|
              {
                prompt: string
                parts: string[]
                correct: string
                type: 'build'
                photoURL?:string
                messages:{
                    title:string
                    definition:string
                    example:string
                }
              }


export type lessonState = {
    globalLessons:{
        active:true
        lessons:{
            name:string
            pictureURL:string
            level:number
            id:number
            type:'Vocabulary'| 'Spelling'|'Grammar'
            description:string
        }[]
    }|{active:false},
    lesson:{
        id:number
        level:number
        active:true
        type:'Vocabulary'|'Spelling'|'Grammar'
        promptIndex:number
        subLessonIndex:number
        subLessons:{
            prompts:Prompt[]
        }[]
    }|{active:false}
}

export type lessonFirebase ={
    type:'Vocabulary'|'Spelling'|'Grammar'
    id:number
    level:number
    subLessons:{
        prompts:number[]
    }[]
}

export type globalLessonFirebase = {
    lessons:{
        name:string
        pictureURL:string
        id:number
        type:'Vocabulary'| 'Spelling'|'Grammar'
        description:string
        level:number
    }[]
}