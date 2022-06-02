import {View, Text, Pressable, StyleSheet} from "react-native";
import { useState } from "react";

import {useSelector, useDispatch} from '../../../../../../redux/hooks';
import {lessonAction} from "../../../../../../redux/lessons"
import {Prompt, shuffleArray} from "../../../../../../redux/lessons"
import { pageAction } from "../../../../../../redux/pages";
import {Audio} from 'expo-av';

import { buttons, size} from '../../../../../componants/globalStyle';


type buildup = {
    prompt: Extract<Prompt,{type:"build"}>
}

function BuildUp({prompt}:buildup) {
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    const [randomPrompts, setRandomPrompts] = useState(shuffleArray(prompt.parts))
    


    const checkAnswer = async() => {
                
            if (answer === prompt.correct){
                setAnswer("")
                pageAction.updateMessage({active:true, type:"correct"}) (dispatch)
                const {sound} = await Audio.Sound.createAsync(
                    require('../../../../../../assets/Correct.mp3')
                );
                await sound.playAsync();
                
            } else {
                setAnswer("")
                pageAction.updateMessage({active:true, type:"wrong"}) (dispatch)
                const {sound} = await Audio.Sound.createAsync(
                    require('../../../../../../assets/Wrong.mp3')
                );
                await sound.playAsync();
            }
        }
    // currently correct answers have to have a space at the end... this is dumb and I should fix it.

    const handleButton = (choice:string) => {
        setAnswer(answer + choice + ' ')
    }

    return ( 
        <>
            <View style={styles.answer}>
            <Text style={styles.text}>{answer}</Text>
            <View style={styles.builder}>
                {randomPrompts.map((choice:string, id:number) => 
                    <Pressable key={id} onPress={() =>{handleButton(choice)}} style={styles.choice} android_ripple={{color: 'rgb(200,200,200)'}}>
                        <Text style={styles.choiceText}>{choice}</Text>
                    </Pressable>
                )}
                
            </View>
            <Pressable onPress={checkAnswer} style={buttons.strong}>
                <Text style={buttons.strongText}>Check Answer</Text>
            </Pressable>
            </View>
        </>
     );
}
const styles = StyleSheet.create({
    answer:{
        display:"flex",
        justifyContent:"space-evenly",
        paddingHorizontal:size.small,
        flex:1,
        
    },
    builder:{
        display:'flex',
        flexWrap:'wrap', 
        flexDirection:'row',
        backgroundColor:"lightgray",
        justifyContent:'space-evenly',
        margin:size.smaller,
        padding:size.smallest,
        borderWidth:size.thin,
        borderRadius:size.small,
    },
    choice:{
        backgroundColor:'white',
        borderRadius:size.smaller,
        borderWidth:size.thin,
        borderColor:'black',
        padding:size.smallest,
        marginVertical:size.medium,
        marginHorizontal:size.smallest
    },
    choiceText:{
        fontSize:size.medium
    },
    text:{
        width:"90%",
        alignSelf:"center",
        backgroundColor:"white",
        fontSize:size.medium,
        padding:size.smallest,
        marginVertical:size.medium,
        borderWidth:size.thin,
        textAlign:"center",
        borderRadius:size.small,
        minHeight:size.larger,

    }
})
export default BuildUp;