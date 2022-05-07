import { View } from "react-native";
import BuildUp from "./TypeOfAnswer/BuildUp";
import MultiChoice from "./TypeOfAnswer/MultiChoice";
import Message from "./TypeOfAnswer/Message";

type AnswersType = {
    typeOfPrompt:string,
    prompt:any,
}

function Answers(props:AnswersType) {
    return ( 
        <View>

        </View>
     );
}

export default Answers;