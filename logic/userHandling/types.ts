export type userData= {
    uid:string
    displayName:string
    email:string
    emailVerified:boolean
    phoneNumber:string
    photoUrl:string

    datasets:

        {
            grammarTestResults:number[] // results are how well they do on tests
            grammarLessonProgress:number// progress is how many lessons they have completed
            vocabTestResults:number[] // they can compare results to other users
            vocabLessonProgress:number // and they will get more lessons and rewards as they complete them.
            spellingTestResults:number[]
            spellingLessonProgress:number

        }
};

export type chartAction = {
    type: "NEW RESULT"
    payload:userData
}