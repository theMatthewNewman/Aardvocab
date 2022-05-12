import {View, Text, Image, Pressable, StyleSheet} from "react-native";
import { useState } from "react";

import {buildUpType} from '../../../../../logic/lessonHandling/IndividualLessonHandler/types'

import {useSelector, useDispatch} from '../../../../../logic/store';
import * as LmiddleWare from "../../../../../logic/lessonHandling/IndividualLessonHandler/middleware"
import {loseHeart} from "../../../../../logic/userHandler/middleware";

import {globalStyling, buttons, images} from '../../../../../componants/globalStyle';
import IncorrectMessage from "../../../../../componants/Alert/IncorrectMessage";


import {Audio} from 'expo-av';
import CorrectMessage from "../../../../../componants/Alert/CorrectMessage";
import Buttons from "../../../../../componants/Buttons/Button";

type buildup = {
    prompt:buildUpType
}

function BuildUp({prompt}:buildup) {
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const [activeCorrect, setActiveCorrect] = useState(false)
    const user = useSelector(state => state.user)

    const checkAnswer = async() => {
        if (answer=== prompt.correct){
            /** 
            const {sound} = await Audio.Sound.createAsync(
                require('../../../assets/Correct.mp3')
            );
            await sound.playAsync();
            **/
            setActiveCorrect(true);
            setTimeout(() => {
                LmiddleWare.CorrectAnswer() (dispatch)
            },1000)
        } else {
            setActive(true)
            setAnswer('')
            loseHeart(user) (dispatch)

            
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
                {prompt.parts.map((choice, id) => 
                    <View key={id} style={styles.buttons}>
                        <Buttons onPress={() => {handleButton(choice)}} title={choice} style="Choice"/>
                    </View>
                )}
                
            </View>
            <Pressable onPress={checkAnswer} style={buttons.strong} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text style={buttons.strongText}>Check Answer</Text>
            </Pressable>
            </View>
            <IncorrectMessage active={active} setActive={setActive}/>
            <CorrectMessage active={activeCorrect} setActive={setActiveCorrect}/>
        </>
     );
}
const styles = StyleSheet.create({
    answer:{
        display:"flex",
        flex:1,
        
    },
    builder:{
        display:'flex',
        alignSelf:"center",
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent:'center',
        backgroundColor:"lightgray",
        width:"90%",
        marginBottom:20,
        padding:5,
        borderWidth:2,
        borderRadius:10,
    },
    buttons:{
        margin:5,
    },
    text:{
        width:"90%",
        alignSelf:"center",
        backgroundColor:"white",
        fontSize:20,
        minHeight:75,
        padding:10,
        marginVertical:20,
        borderWidth:2,
        textAlign:"center",
        borderRadius:10,

    }
})
export default BuildUp;