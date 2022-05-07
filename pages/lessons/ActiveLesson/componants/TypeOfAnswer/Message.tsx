import {View, Text, Image, Pressable} from "react-native";
import { useState } from "react";

import {message} from '../../../../../logic/lessonHandling/IndividualLessonHandler/types'

import { useDispatch} from '../../../../../logic/store';
import * as LmiddleWare from "../../../../../logic/lessonHandling/IndividualLessonHandler/middleware"

import {globalStyling, buttons, images} from '../../../../../componants/globalStyle';

type messageType = {
    prompt:message
}

function Message({prompt}:messageType) {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)

    const next = async() => {

        LmiddleWare.CorrectAnswer() (dispatch)
    }
    

    return ( 
        <View>
            <Image source={{uri: prompt.photoURL}} style={images.promptImage}/>
            <Text style={globalStyling.promptTitle}>{prompt.title}</Text>
            <Text style={globalStyling.textBox}>{prompt.description}</Text>
            <Text style={globalStyling.textBox}>For Example: {prompt.example}</Text>
            <Pressable onPress={next} style={buttons.strong} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text style={buttons.strongText}>Continue</Text>
            </Pressable>
            
        </View>
     );
}

export default Message;