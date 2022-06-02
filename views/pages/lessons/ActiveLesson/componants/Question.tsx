import { View, Text, StyleSheet, Image } from "react-native";
import {Prompt} from "../../../../../redux/lessons";
import { size } from "../../../../componants/globalStyle";


type questionType = {
    prompt:Prompt
}

function Question({prompt}:any) {
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
                </View>: 
            prompt.type==='match'? 
                <View style={styles.background}>
                    <Text style={styles.title}>{prompt.prompt}</Text>
                </View>
            :null}
        </View>
     );
}


const styles = StyleSheet.create({
    title:{
        textAlign:"center",
        fontSize:size.large,
        backgroundColor:"lightgray",
        borderRadius:size.smaller,
    },
    background:{
        backgroundColor:"white",
        display:"flex",
        padding:size.small,
        borderBottomWidth:size.thin,
        
    },
    picture:{
        height:size.giant,
        width:size.giant,
        resizeMode:"contain",
        margin:size.small,
        alignSelf:"center",
        
    }
})
export default Question;