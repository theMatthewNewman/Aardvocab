import { View, Text, StyleSheet, Image } from "react-native";
import * as types from "../../../../logic/lessonHandling/IndividualLessonHandler/types";


type questionType = {
    prompt:types.promptType
}

function Question({prompt}:questionType) {
    return ( 
        <View>
            {prompt.typeOfPrompt==="BuildUp"? 
                <View style={styles.background}>
                    <Text style={styles.title}>{prompt.prompt}</Text>
                    <Image source={{uri: prompt.photoURL}} style={styles.picture}/>
                </View>:
            prompt.typeOfPrompt==="MultiChoice"?
                <View style={styles.background}>
                    <Text style={styles.title}>{prompt.prompt}</Text>
                    <Image source={{uri: prompt.photoURL}} style={styles.picture}/>
                </View>: null}
        </View>
     );
}


const styles = StyleSheet.create({
    title:{
        textAlign:"center",
        fontSize:30,
        backgroundColor:"lightgray",
        borderRadius:5,
    },
    background:{
        backgroundColor:"white",
        display:"flex",
        padding:20,
        borderBottomWidth:2,
        
    },
    picture:{
        height:200,
        width:200,
        alignSelf:"center",
        
    }
})
export default Question;