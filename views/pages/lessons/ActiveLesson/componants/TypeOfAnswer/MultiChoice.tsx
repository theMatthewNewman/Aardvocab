import {View, StyleSheet, Button} from 'react-native'

import {Prompt, shuffleArray} from "../../../../../../redux/lessons"
import {useDispatch, useSelector} from '../../../../../../redux/hooks';
import { lessonAction } from '../../../../../../redux/lessons';
import {useState} from 'react';
import Message from '../../../../../componants/Alert/Message';

import {Audio} from 'expo-av';
import Buttons from '../../../../../componants/Buttons/Button';
import {userAction} from "../../../../../../redux/user";
import {pageAction} from "../../../../../../redux/pages";


type multichoiceType = {
    prompt:Extract<Prompt, {type:"multi"}>
}

const MultiChoice = ({prompt}:multichoiceType) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const lesson = useSelector(state => state.lesson)
    const randomPrompts = shuffleArray(prompt.choices)

    const handlePress = async(choice:{title:string, correct:boolean}) => {
        
        if (choice.correct){
            
            pageAction.updateMessage({active:true, type:"correct"}) (dispatch)
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Correct.mp3')
            );
            await sound.playAsync();
            
        } else {
            pageAction.updateMessage({active:true, type:"wrong"}) (dispatch)
            const {sound} = await Audio.Sound.createAsync(
                require('../../../../../../assets/Wrong.mp3')
            );
            await sound.playAsync();
        }
    }

    return ( 
        <>
            <View style={styles.buttons}>
                {randomPrompts.map((choice, id) => 
                    <Buttons key={id} onPress={()=>{handlePress(choice)}} style="Choice" title={choice.title}/>
                )}
            </View>
            
            
        </>
     );
}
const styles = StyleSheet.create({
    buttons:{
        display:"flex",
        justifyContent:"space-evenly",
        paddingHorizontal:20,
        flex:1,
        paddingBottom:50,
    }
})

export default MultiChoice;