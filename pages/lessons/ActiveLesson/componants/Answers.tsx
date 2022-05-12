import { View } from "react-native";
import BuildUp from "./TypeOfAnswer/BuildUp";
import MultiChoice from "./TypeOfAnswer/MultiChoice";
import * as types from "../../../../logic/lessonHandling/IndividualLessonHandler/types";


type answerType = {
    prompt:types.promptType
}


function Answers({prompt}:answerType) {
    return ( 
        <>
            {prompt.typeOfPrompt==="BuildUp"? <BuildUp prompt={prompt}/>:
            prompt.typeOfPrompt==="MultiChoice"? <MultiChoice prompt={prompt}/>: null}
        </>
     );
}

export default Answers;