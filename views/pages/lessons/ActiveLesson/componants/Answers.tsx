
import BuildUp from "./TypeOfAnswer/BuildUp";
import MultiChoice from "./TypeOfAnswer/MultiChoice";
import {Prompt} from "../../../../../redux/lessons";
import Match from "./TypeOfAnswer/Match";


type answerType = {
    prompt:Prompt
}


function Answers({prompt}:answerType) {
    return ( 
        <>
        {prompt.active?
            <>
            {prompt.type==="build"? <BuildUp prompt={prompt}/>:
             prompt.type==="multi"? <MultiChoice prompt={prompt}/>:
             prompt.type==="match"? <Match prompt={prompt}/>: null}
            </>
        :null}
        </>
     );
}

export default Answers;