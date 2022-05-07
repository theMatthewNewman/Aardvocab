import { Dispatch } from "redux";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";

import { globalLessonActionType } from "./types";

export const getGlobalLessonsFromDatabase = () => async(dispatch:Dispatch) => {
    const docRef = doc(db, "lessons", "globalLessons");
    const document = await getDoc(docRef)
    const dat:any = document.data()
    if (dat) dispatch<globalLessonActionType>({type:'SET GLOBAL DATA',payload:dat})
    else {
        return(false)
    }
return (true)
}