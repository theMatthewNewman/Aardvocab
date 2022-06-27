export type concept = 'Vocabulary'| 'Spelling'|'Grammar'| 'Pros'|'any'

export type Prompt = {
                concept:concept
                id:string
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
                id:string
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
                  id:string
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
                  type:'sentence'
                  active:true
                  prompt:{input:boolean,content:string}[]
                  options:string[]
                  correct:string

              }


export type lessonState = {
    globalLessons:{
        active:true
        lessons:gLesson[]
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
export type gLesson = {
    name:string
    pictureURL:string
    level:number
    id:number
    concept:concept
    description:string
    active:boolean
    
}

export type lessonFirebase ={
    concept:concept
    id:number
    level:number
    subLessons:{
        prompts:{id:string, concept:concept}[]
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