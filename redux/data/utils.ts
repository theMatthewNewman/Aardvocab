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
    const levelValues = data.users.map(level => level.level)
    const largestLevel = Math.max(...levelValues)
    let bucketedLevels = new Array(largestLevel+1).fill(0)
    let selfIndex = user.level
    data.users.forEach(level => {
        bucketedLevels[level.level] +=1
    })
    const dailyTopUsers = dailyUsers(data,user)
    return({bucketedLevels,selfIndex,dailyTopUsers})

}
const dailyUsers = (data:dataFirebase, user:userState) => {
    const newDay = new Date()
    const today = newDay.getFullYear()+'/'+(newDay.getMonth()+1)+'/'+newDay.getDate(); 
    const userTimes = data.users.slice(0,10).map(user => {
        const day = new Date(user.levelsCompletedToday.date*1000)
        const lastDayPracticed = day.getFullYear()+'/'+(day.getMonth()+1)+'/'+day.getDate();
        if (lastDayPracticed === today){
            return({uid:user.uid,time:user.levelsCompletedToday.levels})
        } else{
            return({uid:user.uid,time:0})
        }
    })
    
    userTimes.sort((a, b) => b.time - a.time)
    return(userTimes)
    
}