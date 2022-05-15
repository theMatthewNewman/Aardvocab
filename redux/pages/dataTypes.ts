export type pageState = {
    page: "Lessons"| "Results" | "Profile" | "Chat"|"Login"
    message:{
        active:boolean
        message:string
        type:"correct"|"wrong"
    }
}
