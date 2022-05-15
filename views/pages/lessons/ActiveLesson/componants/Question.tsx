import { View, Text, StyleSheet, Image } from "react-native";
import {Prompt} from "../../../../../redux/lessons";


type questionType = {
    prompt:Prompt
}

function Question({prompt}:questionType) {
    return ( 
        <View>
            {prompt.type==="build"? 
                <View style={styles.background}>
                    <Text style={styles.title}>{prompt.prompt}</Text>
                    <Image source={{uri: prompt.photoURL}} style={styles.picture}/>
                </View>:
            prompt.type==="multi"?
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
        height:180,
        width:180,
        resizeMode:"contain",
        margin:10,
        alignSelf:"center",
        
    }
})
export default Question;