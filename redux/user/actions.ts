import { userState } from "./dataTypes";
import types from "./types";
import { concept, lessonState } from "../lessons";


const completeLesson = (type:concept) => ({
    type: types.COMPLETE_LESSON,
    payload:{
        type
    }
});


const changePicture = (photoURL:string) => ({
    type: types.CHANGE_PICTURE,
    payload:{
        photoURL
    }
});

const changeName = (displayName:string) => ( {
    type: types.CHANGE_NAME,
    payload:{
        displayName
    }
})

const updateUser = (user:userState) => ({
    type: types.UPDATE_USER,
    payload:{
        user
    }
})

const increaseLessonPercentage = (lesson:lessonState) => ({
    type: types.INCREASE_LESSON_PERCENTAGE,
    payload:{
        lesson
    }
})


export type Actions = ReturnType<typeof completeLesson> | 
                      ReturnType<typeof changePicture> |
                      ReturnType<typeof changeName> |
                      ReturnType<typeof updateUser> |
                      ReturnType<typeof increaseLessonPercentage> 



export const actions = {
    completeLesson,
    changePicture,
    changeName,
    updateUser,
    increaseLessonPercentage
};
