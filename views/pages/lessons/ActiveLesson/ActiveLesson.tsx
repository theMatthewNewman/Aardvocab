import { StyleSheet,  View} from 'react-native';

import {useDispatch, useSelector} from "../../../../redux/hooks"
import { useEffect, useState} from 'react';

import ProgressBar from "./componants/ProgressBar";


import Question from './componants/Question';
import Hearts from "./componants/Hearts";
import Answers from './componants/Answers';


type activeLessonType ={
    lessonId:number
    setActive:any
}

function ActiveLesson() {
    const lesson = useSelector(state => state.lesson.lesson)
    const user = useSelector(state => state.user)
    const page = useSelector(state => state.page)
    const [choice, setChoice] = useState(0);
    const dispatch = useDispatch();

    return ( 
        <>
            {lesson.active?
                <View style={styles.all}>
                    <Question prompt={lesson.subLessons[lesson.subLessonIndex].prompts[lesson.promptIndex]}/>
                    <Hearts/>
                    <ProgressBar progress={(lesson.promptIndex/lesson.subLessons[lesson.subLessonIndex].prompts.length)*100}/>
                    
                    <Answers prompt={lesson.subLessons[lesson.subLessonIndex].prompts[lesson.promptIndex]}/>
                    
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