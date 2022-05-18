import produce from "immer"
import types from "./types";
import {Actions, actions} from "./actions"
import { userState } from "./dataTypes";
import DaysPracticed from "../../views/pages/Results/graphs/DaysGraph";


const example:userState = {
    uid:"example",
    displayName:"example",
    email:"example@example.com",
    emailVerified:false,
    photoURL:"https://avatars.dicebear.com/api/identicon/5.8906013843601315.png",
    createdAt:{
        nanoseconds:423000000,
        seconds:1652651988
    },
    level:0,
    hearts:5,
    lessonData:new Array(100).fill({subLessons:0, percentage:0}),
    daysPracticed:[{
        nanoseconds:423000000,
        seconds:1652651988
    }]
}

export const reducer = (state:userState = example, action:Actions) => {
    return(produce(state,draft => {
        switch (action.type){
            case types.UPDATE_USER:{
                draft = action.payload.user
            return(draft);
            }
            case types.COMPLETE_LESSON:{
                draft.level += 1;
            return(draft);
            }
            case types.CHANGE_NAME:{
                draft.displayName= action.payload.displayName;
                return(draft);
            }
            case types.CHANGE_PICTURE:{
                draft.photoURL=action.payload.photoURL;
            return(draft);
            }
        }
    }))
}

