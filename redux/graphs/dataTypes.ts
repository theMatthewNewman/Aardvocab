export type dataState = {
    bucketedLevels:number[]
    selfIndex:number

};

export type dataFirebase = {
    levels:{
        uid:string
        level:number
    }[]
};