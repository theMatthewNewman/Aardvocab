

export type multiChoiceType = {
    prompt: string
    choices: string[]
    correct: number
    typeOfPrompt:'MultiChoice'
    photoURL?:string
}

export type buildUpType = {
    prompt: string
    parts: string[]
    correct: string
    typeOfPrompt: 'BuildUp'
    photoURL?:string
}
export type message = {
    title:string
    photoURL?:string
    description:string
    example:string
    typeOfPrompt:'Message'
}

export type promptType = multiChoiceType | buildUpType | message





export type lessonType = {
    prompts:promptType[]
    lessonType:"Grammar"|"Vocabulary"|"Spelling"
    lessonIndex:0|1|2|3|4|5|6|7|8|9
}

type next = {
    type:'NEXT'
    payload:{
        choice:number
    }
}

type setDataType = {
    type: 'SET DATA'
    payload:{
        data:lessonType
    }
}

type correctAnswer = {
    type:'CORRECT ANSWER'
}

export type lessonAction = next | setDataType | correctAnswer