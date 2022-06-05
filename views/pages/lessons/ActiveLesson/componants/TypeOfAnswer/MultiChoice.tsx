import {View, StyleSheet} from 'react-native'

import {Prompt, shuffleArray} from "../../../../../../redux/lessons"
import {useDispatch, useSelector} from '../../../../../../redux/hooks';

import {Audio} from 'expo-av';
import Buttons from '../../../../../componants/Buttons/Button';
import {pageAction} from "../../../../../../redux/pages";

import {size} from "../../../../../componants/globalStyle";


type multichoiceType = {
    prompt:Extract<Prompt, {type:"multi"}>
}

const MultiChoice = ({prompt}:multichoiceType) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const lesson = useSelector(state => state.lesson)
    const randomPrompts:any = shuffleArray(prompt.choices)

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
                {randomPrompts.map((choice:any, id:number) => 
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
        paddingHorizontal:size.small,
        flex:1,
    }
})

export default MultiChoice;