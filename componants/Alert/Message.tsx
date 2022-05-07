import {View, Text, StyleSheet} from 'react-native';
import { BoxStyle, TextStyle } from './MessageStyle';
import {Audio} from 'expo-av';
import { useEffect } from 'react';

type messageType = {
    active:boolean
    setActive:any
    type:"Correct"|"Wrong"
    message:string
}

function Message({active, setActive, type, message}:messageType) {

    const activate = async(type:string) => {
        
        if (type === "Correct"){
                var {sound} = await Audio.Sound.createAsync(
                    require('../../assets/Correct.mp3')
                );
                await sound.playAsync();
        } else {
            var {sound} = await Audio.Sound.createAsync(
                require('../../assets/Wrong.mp3')
            );
            await sound.playAsync();
        }
        setTimeout(() => {setActive(false)}, 2000)
    }

    useEffect(() => {
        if (active) {
            activate(type)
        }
    },[active])

    var box = BoxStyle.default
    var text = TextStyle.default

    switch (type){
        case "Correct":
            box = BoxStyle.Correct;
            text = TextStyle.Correct;
            break;
        case "Wrong":
            box = BoxStyle.Wrong;
            text = TextStyle.Wrong;
            break;
        default:
            break;
    }

    return ( 
        <View>
            {active?
                <View style={box}>
                    <Text style={text}>{message}</Text>
                </View>
            : null}
        </View>
     );
}


export default Message;