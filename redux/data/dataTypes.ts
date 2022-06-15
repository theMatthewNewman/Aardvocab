export type dataState = {
    bucketedLevels:number[]
    selfIndex:number
    dailyTopUsers:{uid:string, time:number}[]
    messages:userMessages

}
;

export type dataFirebase = {
    users:{
        uid:string
        level:number
        levelsCompletedToday:{date:number, levels:number}

    }[]
};

export type userMessage = {
        uid:string
        sent:boolean
        message:string
}
export type userMessages = {messages:userMessage[],active:true}|{active:false}
