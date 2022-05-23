export type pageState = {
    page: "Lessons"| "Results" | "Profile" | "Chat"|"Login"
    message:{
        active:boolean
        type:"correct"|"wrong"
    }
}
