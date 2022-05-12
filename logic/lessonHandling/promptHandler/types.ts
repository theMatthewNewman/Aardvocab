

export type multiChoiceType = {
    prompt: string
    choices: string[]
    correct: number
    type:'multi'
    photoURL?:string
}

export type buildUpType = {
    prompt: string
    parts: string[]
    correct: string
    type: 'build'
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