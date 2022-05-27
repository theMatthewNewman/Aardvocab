
import BuildUp from "./TypeOfAnswer/BuildUp";
import MultiChoice from "./TypeOfAnswer/MultiChoice";
import {Prompt} from "../../../../../redux/lessons";


type answerType = {
    prompt:Prompt
}


function Answers({prompt}:answerType) {
    return ( 
        <>
        {prompt.active?
            <>
            {prompt.type==="build"? <BuildUp prompt={prompt}/>:
            prompt.type==="multi"? <MultiChoice prompt={prompt}/>: null}
            </>
        :null}
        </>
     );
}

export default Answers;