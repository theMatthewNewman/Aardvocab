import { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, TouchableHighlight} from "react-native";
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
    const [answer, setAnswer] = useState(prompt.prompt.map(value => value.content))
    const [activeIndex, setActiveIndex] = useState(0)
    const randomOpts = prompt.options
    
    const dispatch = useDispatch()

    const [inputIndex, setInputIndex] =  useState(prompt.prompt.map((prompt,index) => {
        return({input:prompt.input,index})
    }).filter((prompt) => prompt.input)
    .map((prompt) =>prompt.index))

    

    const handlePress = (e:string, index:number) => {
        console.log(prompt.options)
        setActiveIndex(activeIndex+1)
        setAnswer(answer.map((input,ind) => {
            if (ind===inputIndex[index]){
                return(e)
            }else{
                return(input)
            }
        }))
        if (index>=inputIndex.length){
            clear()
        }
        
    }

    const clear = () => {
        setActiveIndex(0)
        setAnswer(prompt.prompt.map(prompt => {
            return(prompt.content)
        }))
    }
    const checkAnswer = async() => {
        const ans = answer.join(" ");
        setAnswer([])
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
                        {!part.input?
                            <Text style={styles.part}>{part.content}</Text>:
                            <>
                            {inputIndex[activeIndex]===index? 
                            <Text style={styles.input}>{answer[index]}</Text>:<Text style={styles.active}>{answer[index]}</Text>}
                            </>
                        }
                    </View>
                )}
            </View>
                {randomOpts.map((choice:string, index:number) => 
                    <Buttons key={index} onPress={()=>{handlePress(choice,activeIndex)}} style="Choice" title={choice}/>
                )}
            <TouchableHighlight onPress={checkAnswer} style={buttons.strong}>
                <Text style={buttons.strongText}>Check Answer</Text>
            </TouchableHighlight>

        </View>
     );
}

export default Sentence;

const styles = StyleSheet.create({
    sentence:{
        
        backgroundColor:'lightgrey',
        padding:size.small,
        borderWidth:size.thin,
        borderRadius:size.curve,
        display:'flex',
        flexDirection:"column",
        justifyContent:'center',
        
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
        marginHorizontal:size.small,
        marginVertical:size.small,
        
    },
    active:{
        backgroundColor:'lightgrey',
        fontSize:size.medium,
        minWidth:size.giant,
        borderWidth:size.thin,
        textAlign:'center',
        borderRadius:size.small,
        marginHorizontal:size.small,
        marginVertical:size.small,
    },
    all:{
        paddingHorizontal:size.small,
        display:'flex',
        justifyContent:'space-evenly',
        flex:1,
    }
})