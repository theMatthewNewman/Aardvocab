import { useState } from "react";
import { Text, View, Pressable, StyleSheet} from "react-native";
import {Prompt, shuffleArray} from "../../../../../../redux/lessons";
import Buttons from "../../../../../componants/Buttons/Button";
import {buttons, size} from "../../../../../componants/globalStyle";

import {pageAction} from "../../../../../../redux/pages";
import {Audio} from 'expo-av';
import {useDispatch} from '../../../../../../redux/hooks';

type input = {
    prompt:Extract<Prompt, {type:"sentence"}>
}

function Sentence({prompt}:input) {
    const [input, setInput] = useState('')
    const [answer, setAnswer] = useState([''])
    const randomOpts:any = shuffleArray(prompt.options)
    const dispatch = useDispatch()
    console.log(answer)

    const handlePress = (e:string) => {
        setInput(e)
        setAnswer(prompt.prompt.map((opt) => {
            if (opt.input){
                return(e);
            } else{
                return(opt.content)
            }
        }))
    }
    const checkAnswer = async() => {
        const ans = answer.join(" ");
        if (ans===prompt.correct){
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
        <View style={styles.all}>
            <View style={styles.sentence}>        
                {prompt.prompt.map((part, index) => 
                    <View key={index}>
                        {part.input?<>
                            <Text style={styles.input}>{input}</Text>
                        </>:<>
                            <Text style={styles.part}>{part.content}</Text>
                        </>}
                    </View>
                )}
            </View>
            <View>
                {randomOpts.map((choice:string, index:number) => 
                    <Buttons key={index} onPress={()=>{handlePress(choice)}} style="Choice" title={choice}/>
                )}

            </View>
            <Pressable onPress={checkAnswer} style={buttons.strong}>
                <Text style={buttons.strongText}>Check Answer</Text>
            </Pressable>

        </View>
     );
}

export default Sentence;

const styles = StyleSheet.create({
    sentence:{
        margin:size.small,
        backgroundColor:'lightgrey',
        padding:size.small,
        borderWidth:size.thin,
        borderRadius:size.curve,
        display:'flex',
        flexDirection:"row",
        flexWrap:'wrap',
    },
    part:{
        fontSize:size.medium,
        textAlign:'center'
    },
    input:{
        backgroundColor:'white',
        fontSize:size.medium,
        minWidth:size.giant,
        borderWidth:size.thin,
        textAlign:'center',
        borderRadius:size.small,
        marginHorizontal:size.small
    },
    all:{
        paddingHorizontal:size.small
    }
})