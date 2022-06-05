export type dataState = {
    bucketedLevels:number[]
    selfIndex:number
    dailyTopUsers:string[]

};

export type dataFirebase = {
    users:{
        uid:string
        level:number
        levelsCompletedToday:{date:number, levels:number}

    }[]
};