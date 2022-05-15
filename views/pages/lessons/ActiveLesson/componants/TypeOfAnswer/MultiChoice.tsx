import {View, StyleSheet, Button} from 'react-native'

import {Prompt} from "../../../../../../redux/lessons"
import {useDispatch, useSelector} from '../../../../../../redux/hooks';
import { lessonAction } from '../../../../../../redux/lessons';
import {useState} from 'react';
import Message from '../../../../../componants/Alert/Message';

import {Audio} from 'expo-av';
import Buttons from '../../../../../componants/Buttons/Button';
import {userAction} from "../../../../../../redux/user";


type multichoiceType = {
    prompt:Extract<Prompt, {type:"multi"}>
}

const MultiChoice = ({prompt}:multichoiceType) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const lesson = useSelector(state => state.lesson)

    const handlePress = async(correct:number, id:number) => {
        
        if (correct===id){
            lessonAction.correct(user, lesson) (dispatch)
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Correct.mp3')
            );
            await sound.playAsync();
            
        } else {
            lessonAction.Incorrect(user, lesson) (dispatch)
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Wrong.mp3')
            );
            await sound.playAsync();
        }
    }

    return ( 
        <>
            <View style={styles.buttons}>
                {prompt.choices.map((choice, id) => 
                    <Buttons onPress={()=>{handlePress(prompt.correct,id)}} style="Choice" title={choice}/>
                )}
            </View>
            
            
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