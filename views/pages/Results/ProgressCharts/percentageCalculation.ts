export const bucketUsers = (averages:number[]) =>{
    const max = Math.max(...averages);
    const total = averages.length;
    let buckets = new Array(max).fill(0);
    let countedBuckets = buckets.map((userCount, index) =>{
        let bucketTop = (max/total)*(index+1)
        let bucketBottom = (max/total)*(index)
        if (index===buckets.length-1){ // make sure highest number gets bucketed
            bucketTop+=1;
        }
        averages.forEach((average)=>{
            if(average >= bucketBottom ){
                console.log("check")
                console.log(bucketBottom)
                console.log(average)
                userCount+=1;
            }
        })
        return(userCount);
    })
    return(countedBuckets);
}

export const genLessons = (averages:number[]) => {
    const max = Math.max(...averages);
    let buckets= new Array(max).fill(0);
    console.log(buckets.length-1)
    let labels = buckets.map((value, index) => {
        return(Math.floor(((max/(buckets.length-1))*index)).toString())
    })
    return(labels)
}