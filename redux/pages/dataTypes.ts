export type pageState = {
    page: "Lessons"| "Results" | "Profile" 
    message:{
        active:boolean
        type:"correct"|"wrong"
    } | {
        active:boolean
        type:'alert'
        message:string
    }

}
