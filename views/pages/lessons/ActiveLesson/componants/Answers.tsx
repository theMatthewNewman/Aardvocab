
import BuildUp from "./TypeOfAnswer/BuildUp";
import MultiChoice from "./TypeOfAnswer/MultiChoice";
import {Prompt} from "../../../../../redux/lessons";
import Match from "./TypeOfAnswer/Match";
import Sentence from "./TypeOfAnswer/Sentence";


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
             prompt.type==="match"? <Match prompt={prompt}/>:
             prompt.type==='sentence'? <Sentence prompt={prompt}/>: null}
            </>
        :null}
        </>
     );
}

export default Answers;