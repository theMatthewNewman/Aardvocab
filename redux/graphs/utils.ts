import { dataFirebase } from "./dataTypes";
import { userState } from "../user";

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
    const levelValues = data.levels.map(level => level.level)
    const largestLevel = Math.max(...levelValues)
    let bucketedLevels = new Array(largestLevel+1).fill(0)
    let selfIndex = user.level
    data.levels.forEach(level => {
        bucketedLevels[level.level] +=1
    })
    return({bucketedLevels,selfIndex})

}
