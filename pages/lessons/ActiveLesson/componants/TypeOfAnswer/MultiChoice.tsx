import {View, StyleSheet, Button} from 'react-native'
import { multiChoiceType} from '../../../../../logic/lessonHandling/IndividualLessonHandler/types'

import {useDispatch, useSelector} from '../../../../../logic/store';
import * as LmiddleWare from '../../../../../logic/lessonHandling/IndividualLessonHandler/middleware'
import {useState} from 'react';
import IncorrectMessage from '../../../../../componants/Alert/IncorrectMessage';
import CorrectMessage from '../../../../../componants/Alert/CorrectMessage';

import {Audio} from 'expo-av';
import Buttons from '../../../../../componants/Buttons/Button';
import {loseHeart, gainHeart} from "../../../../../logic/userHandler/middleware"


type multichoiceType = {
    prompt:multiChoiceType
}

const MultiChoice = ({prompt}:multichoiceType) => {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const [activeCorrect, setActiveCorrect] = useState(false)
    const user = useSelector((state) => state.user)

    const handlePress = async(correct:number, id:number) => {
        
        if (correct===id){
            /** 
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../assets/Correct.mp3')
            );
            await sound.playAsync();
            **/
            setActiveCorrect(true);
            setTimeout(() => {
                LmiddleWare.CorrectAnswer() (dispatch)
            },1000)
        } else {
            setActive(true)
            loseHeart(user) (dispatch)
        }
    }

    return ( 
        <>
            <View style={styles.buttons}>
                {prompt.choices.map((choice, id) => 
                    <Buttons onPress={()=>{handlePress(prompt.correct,id)}} style="Choice" title={choice}/>
                )}
            </View>
            
            <IncorrectMessage active={active} setActive={setActive}/>
            <CorrectMessage active={activeCorrect} setActive={setActiveCorrect}/>
        </>
     );
}
const styles = StyleSheet.create({
    buttons:{
        display:"flex",
        justifyContent:"space-evenly",
        padding:10,
        flex:1,
    }
})

export default MultiChoice;