import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

import {useDispatch, useSelector} from "../../../logic/store"
import { useState, useEffect } from 'react';
import {CompletePrompt} from "../../../logic/lessonHandling/IndividualLessonHandler/middleware"

import MultiChoice from "./componants/TypeOfAnswer/MultiChoice";
import BuildUp from "./componants/TypeOfAnswer/BuildUp";

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




    const prompt = lesson.prompts[lesson.lessonIndex]
    const progress = lesson.lessonIndex / lesson.prompts.length

    useEffect(() => {
    if (lesson.lessonIndex === lesson.prompts.length){
        UmiddleWare.completedLesson() (dispatch)
        const lessonResults = user.datasets.lessonResults
        const lessonProgress = user.datasets.lessonProgress
        UmiddleWare.setUserObjectOnDatabase({...user, datasets:{lessonResults,lessonProgress:lessonProgress+1}})
        setActive(false)
    }}, [lesson.lessonIndex])

    return ( 
        <>
            {prompt?
                <>
                    <Question />
                    <ProgressBar progress={progress*100}/>
                    <Hearts/>
                    <Answers typeOfPrompt={prompt.typeOfPrompt} prompt={prompt}/>
                </>
            : null}
        </> 
    );
}

export default ActiveLesson;