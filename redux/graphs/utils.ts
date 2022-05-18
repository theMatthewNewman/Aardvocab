import { User } from "firebase/auth"
import { dataFirebase, dataState } from "./dataTypes";
import { userState } from "../user";
import produce from "immer";

export type graphData = {
    labels:string[]
    datasets:{
        data:number[]
        strokeWidth:number
    }[]
    legend:string[]
}

export const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 1,
    decimalPlaces:0,
    color: (opacity = 1) => 'cornflowerblue',
    labelColor: (opacity = 1) => 'black',
    strokeWidth: 3, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots:{
        r: "6",
        strokeWidth: "2",
    }
};

export const bucketUsers = (data:dataFirebase, user:userState) => {
    const levels = data.levels.map(level => level.level)
    let selfIndex = 0
    const largestLevel = Math.max(...levels)
    const numberOfBuckets = 30
    const buckets = new Array(numberOfBuckets).fill(0)
    const bucketedLevels = buckets.map((count:number, index) => {
        
        let top = (largestLevel/numberOfBuckets)*(index+1)
        const bottom = (largestLevel/numberOfBuckets)*(index)
        if (index===buckets.length-1){ // make sure highest number gets bucketed
            top+=1;
        }
        data.levels.forEach((level)=>{
            if(level.level >= bottom && level.level < top ){
                count+=1;
            }
            if (level.uid === user.uid){
                selfIndex = index
            }
        })
        return(count)
    })
    return({bucketedLevels,selfIndex})

}
