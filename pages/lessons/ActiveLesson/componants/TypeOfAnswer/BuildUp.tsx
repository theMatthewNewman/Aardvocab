import {View, Text, Image, Pressable} from "react-native";
import { useState } from "react";

import {buildUpType} from '../../../../../logic/lessonHandling/IndividualLessonHandler/types'

import {useSelector, useDispatch} from '../../../../../logic/store';
import * as LmiddleWare from "../../../../../logic/lessonHandling/IndividualLessonHandler/middleware"

import {globalStyling, buttons, images} from '../../../../../componants/globalStyle';
import IncorrectMessage from "../../../../../componants/Alert/IncorrectMessage";


import {Audio} from 'expo-av';
import CorrectMessage from "../../../../../componants/Alert/CorrectMessage";

type buildup = {
    prompt:buildUpType
}

function BuildUp({prompt}:buildup) {
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const [activeCorrect, setActiveCorrect] = useState(false)

    const checkAnswer = async() => {
        if (answer=== prompt.correct){
            const {sound} = await Audio.Sound.createAsync(
                require('../../../assets/Correct.mp3')
            );
            await sound.playAsync();
            setActiveCorrect(true);
            setTimeout(() => {
                LmiddleWare.CorrectAnswer() (dispatch)
            },2000)
        } else {
            console.log(prompt.correct)
            console.log(answer)
            setActive(true)
            setAnswer('')
            
        }
    }
    // currently correct answers have to have a space at the end... this is dumb and I should fix it.

    return ( 
        <View>
            <Text style={globalStyling.promptTitle}>{prompt.prompt}</Text>
            <Image source={{uri: prompt.photoURL}} style={images.promptImage}/>
            <Text style={globalStyling.answer}>{answer}</Text>
            <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
                {prompt.parts.map((choice, id) => 
                    <Pressable onPress={()=>{setAnswer(answer + choice + ' ')}} key={id} style={buttons.buildUp} android_ripple={{color: 'rgb(200,200,200)'}}>
                        <Text style={buttons.buildUpText}>{choice}</Text>
                    </Pressable>
                )}
                
            </View>
            <Pressable onPress={checkAnswer} style={buttons.strong} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text style={buttons.strongText}>Check Answer</Text>
            </Pressable>
            <IncorrectMessage active={active} setActive={setActive}/>
            <CorrectMessage active={activeCorrect} setActive={setActiveCorrect}/>
        </View>
     );
}

export default BuildUp;