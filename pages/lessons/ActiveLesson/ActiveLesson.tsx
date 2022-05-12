import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

import {useDispatch, useSelector} from "../../../logic/store"
import { useState, useEffect } from 'react';

import ProgressBar from "./componants/ProgressBar";

import * as UmiddleWare from '../../../logic/userHandler/middleware'

import Message from './componants/TypeOfAnswer/Message';
import Question from './componants/Question';
import Hearts from "./componants/Hearts";
import Answers from './componants/Answers';


type activeLessonType ={
    lessonId:number
    setActive:any
}

function ActiveLesson({lessonId, setActive}:activeLessonType) {
    const lesson = useSelector(state => state.lesson)
    const user = useSelector(state => state.user)
    const [choice, setChoice] = useState(0);
    const dispatch = useDispatch();
    const progress=5

    return ( 
        <>
            {prompt?
                <View style={styles.all}>
                    <Question prompt={prompt}/>
                    <Hearts/>
                    <ProgressBar progress={progress*100}/>
                    <Answers prompt={prompt}/>
                </View>
            : null}
        </> 
    );
}

const styles = StyleSheet.create({
    all:{
        display:'flex',
        height:"100%",
    }
})

export default ActiveLesson;