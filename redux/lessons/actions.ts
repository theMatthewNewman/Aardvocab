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

const deactivate_lesson = () =>({
    type: types.DEACTIVATE_LESSON
})


export type Actions = ReturnType<typeof completeLesson> |
                      ReturnType<typeof updateGlobalLessons> |
                      ReturnType<typeof updateLesson> |
                      ReturnType<typeof completePrompt> |
                      ReturnType<typeof deactivate_lesson>

export const actions = {
    completeLesson,
    updateGlobalLessons,
    updateLesson,
    completePrompt,
    deactivate_lesson
};
