import { userState } from "../user"

export type pageState = {
    page: "Lessons"| "Results" | "Profile" |"OtherProfile"| "Chat"
    otherUser:userState|{active:false}
    message:{
        active:boolean
        type:"correct"|"wrong"
    } | {
        active:boolean
        type:'alert'
        message:string
    } | {
        active:boolean
        type:'unlockLesson'
        run:any
    }

}
