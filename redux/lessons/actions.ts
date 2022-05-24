import { lessonState, globalLessonFirebase } from "./dataTypes";
import types from "./types";

const completeLesson = () => ({
    type: types.COMPLETE_LESSON
});

const updateGlobalLessons = (store:globalLessonFirebase) =>({
    type: types.ACTIVATE_GLOBAL_LESSONS,
    payload:{
        store
    }
});

const updateLesson = (lesson:lessonState['lesson']) => ({
    type: types.UPDATE_LESSON,
    payload:{
        lesson
    }
})

const completePrompt = () => ({
    type: types.COMPLETE_PROMPT,

})


export type Actions = ReturnType<typeof completeLesson> |
                      ReturnType<typeof updateGlobalLessons> |
                      ReturnType<typeof updateLesson> |
                      ReturnType<typeof completePrompt>

export const actions = {
    completeLesson,
    updateGlobalLessons,
    updateLesson,
    completePrompt
};
