import {View, Text, Image, Pressable} from 'react-native'
import {promptType, multiChoiceType} from '../../../../../logic/lessonHandling/IndividualLessonHandler/types'
import {globalStyling, buttons, images} from "../../../../../componants/globalStyle"

import {useDispatch} from '../../../../../logic/store';
import * as LmiddleWare from '../../../../../logic/lessonHandling/IndividualLessonHandler/middleware'
import {useState} from 'react';
import IncorrectMessage from '../../../../../componants/Alert/IncorrectMessage';
import CorrectMessage from '../../../../../componants/Alert/CorrectMessage';

import {Audio} from 'expo-av';


type multichoiceType = {
    prompt:multiChoiceType
}

const MultiChoice = ({prompt}:multichoiceType) => {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const [activeCorrect, setActiveCorrect] = useState(false)

    const handlePress = async(correct:number, id:number) => {
        if (correct===id){
            const {sound} = await Audio.Sound.createAsync(
                require('../../../assets/Correct.mp3')
            );
            await sound.playAsync();
            setActiveCorrect(true);
            setTimeout(() => {
                LmiddleWare.CorrectAnswer() (dispatch)
            },2000)
        } else {
            setActive(true)
        }
    }

    return ( 
        <View>
            <Text style={globalStyling.promptTitle}>{prompt.prompt}</Text>
            <Image source={{uri: prompt.photoURL}} style={images.promptImage}/>
            <View>
                {prompt.choices.map((choice, id) => 
                    <Pressable onPress={()=>handlePress(prompt.correct,id)} key={id} style={buttons.MultiChoice} android_ripple={{color: 'rgb(200,200,200)'}}>
                        <Text style={buttons.MultiChoiceText}>{choice}</Text>
                    </Pressable>
                )}
            </View>
            <IncorrectMessage active={active} setActive={setActive}/>
            <CorrectMessage active={activeCorrect} setActive={setActiveCorrect}/>
        </View>
     );
}

export default MultiChoice;