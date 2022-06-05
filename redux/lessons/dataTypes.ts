export type concept = 'Vocabulary'| 'Spelling'|'Grammar'| 'Pros'

export type Prompt = {
                concept:concept
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
                active:true
              }|
              {
                concept:concept
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
                active:true
              }|
              {
                  concept:concept
                  type:"match"
                  prompt:string
                  match:{
                      from:{
                          title:string
                          id:number
                      }
                      to:{
                          title:string
                          id:number
                      }
                  }[]
                  active:true
                  photoURL?:string
              }|{active:false}|
              {
                  type:'sentance'
                  active:true
              }


export type lessonState = {
    globalLessons:{
        active:true
        lessons:{
            name:string
            pictureURL:string
            level:number
            id:number
            concept:concept
            description:string
        }[]
    }|{active:false},
    lesson:{
        id:number
        level:number
        active:true
        concept:concept
        promptIndex:number
        subLessonIndex:number
        subLessons:{
            prompts:Prompt[]
        }[]
    }|{active:false}
}

export type lessonFirebase ={
    concept:concept
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
        concept:concept
        description:string
        level:number
    }[]
}