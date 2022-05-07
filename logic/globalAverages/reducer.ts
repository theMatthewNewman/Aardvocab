import { averageAction, averageState } from "./types";
import { exampleAverages } from "./exampleData";
import produce from "immer";

const arrAvg = (arr:number[]) => arr.reduce((a:number,b:number) => a + b, 0) / arr.length

export const averageReducer = (state:averageState = exampleAverages, action:averageAction) => {
    return(produce(state, draft => {
        switch (action.type){
            case "UPDATE PROGRESS":{
                draft.forEach(average => {
                    if (average.uid === action.payload.user.uid){
                        average.grammarLessonProgress = action.payload.user.datasets.grammarLessonProgress
                        average.spellingLessonProgress = action.payload.user.datasets.spellingLessonProgress
                        average.vocabLessonProgress = action.payload.user.datasets.vocabLessonProgress
                        average.averageGrammarTestResults = arrAvg(action.payload.user.datasets.grammarTestResults)
                        average.averageSpellingTestResults = arrAvg(action.payload.user.datasets.spellingTestResults)
                        average.averageSpellingTestResults = arrAvg(action.payload.user.datasets.spellingTestResults)
                    }
                    return(draft);
                });
            }
        }
    }))
}