


export type sublessonType = {
    prompts:string[]
    level:number
    lessonIndex:number

}


export type lessonType = {
    lessonType:"Grammar"|"Vocabulary"|"Spelling"
    sublessons:sublessonType[]


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
    payload:{
        userLevel:number
    }
}

export type lessonAction = next | setDataType | correctAnswer