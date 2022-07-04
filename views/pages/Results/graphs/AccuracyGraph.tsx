import { Image, Text, View } from "react-native";
import { useSelector } from "../../../../redux/hooks";
import {ProgressChart} from "react-native-chart-kit";
import {dayStyles} from "./DaysGraph";
import { color, size } from "../../../componants/globalStyle";
import { DarkTheme } from "@react-navigation/native";
import { userState } from "../../../../redux/user";
import { concept } from "../../../../redux/lessons";

type props = {
    user:userState
}

function AccuracyGraph({user}:props) {
    

    const evaluate = (user:userState, type:concept) => {
        const prompts = user.promptData.filter(dat => {
            if (dat.concept===type){
                return(true);
            }
            return(false);
        })
        const lengthPrompts = prompts.length
        const vocabErrors = prompts.map(dat => {
            return(dat.errors)
        }).reduce((prevValue, currentValue) => {
            return(prevValue+currentValue)
        },1)
        
        var ret = 1
        if (vocabErrors<20){
            ret = 1-((vocabErrors)/20)
        }else{
            ret = 1/vocabErrors
        }
        if (lengthPrompts<20){
            ret= (ret*lengthPrompts)/20
        }
        return(ret);
    }
    const Vocab = evaluate(user,"Vocabulary")
    const Spelling = evaluate(user, "Spelling")
    const Grammar = evaluate(user, "Grammar")
    const pros = evaluate(user,"Pros")
    
    
    
    
    
    

    return ( 
        <View style={dayStyles.backdrop}>
            <Text style={dayStyles.note}>User Rating</Text>
            <ProgressChart data={{
                                data:[Spelling, Vocab, Grammar,pros],
                                labels:["Spelling","Vocabulary","Grammar","Pros"],
                                colors:[color.darkBlue,"cornflowerblue","yellow","red"]
                                }}
                            
                            width={size.Wlargester} height={size.gianter}
                            chartConfig={{
                            backgroundColor: 'white',
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            
                            color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
                            style: {
                                
                            },
                            }}
                            
                            strokeWidth={10}
                            withCustomBarColorFromData={true}
                            hideLegend={true}
                            style={{ 
                                marginTop: 10,
                                
                                borderRadius: 16,
                            }}
                            />
            <View style={dayStyles.key}>
                <Image style={dayStyles.dot} source={require('../../../../images/userDot.png')}/>
                <Text style={dayStyles.note}>Pros</Text>
            </View>
            <View style={dayStyles.key}>
                <Image style={dayStyles.dot} source={require('../../../../images/grammarDot.png')}/>
                <Text style={dayStyles.note}>Grammar</Text>
            </View>
            <View style={dayStyles.key}>
                <Image style={dayStyles.dot} source={require('../../../../images/dayDot.png')}/>
                <Text style={dayStyles.note}>Vocabulary</Text>
            </View>
            <View style={dayStyles.key}>
                <Image style={dayStyles.dot} source={require('../../../../images/spellingDot.png')}/>
                <Text style={dayStyles.note}>Spelling</Text>
            </View>
            
        </View>
     );
}

export default AccuracyGraph;