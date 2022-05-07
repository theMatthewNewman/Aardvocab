import {View, Text, Pressable, Image, ScrollView} from "react-native";
import {useEffect, useState} from "react";

import ActiveLesson from "../ActiveLesson/ActiveLesson";

import {useDispatch, useSelector} from "../../../logic/store";

import {styles} from "./LessonPathStyles";
import { getGlobalLessonsFromDatabase } from "../../../logic/lessonHandling/gloabalLessonHandler/middleware";

import * as LmiddleWare from '../../../logic/lessonHandling/IndividualLessonHandler/middleware';
import LessonCard from "./componants/LessonCard";




function lessonPath() {
    const globalLessons = useSelector(state => state.globalLessons)
    const singleLesson = useSelector(state => state.lesson)
    const [activeLesson, setActiveLesson] = useState(false)
    const [lessonChoice, setLessonChoice] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        getGlobalLessonsFromDatabase() (dispatch)
    },[])

    const activateLesson = (id:number) => {
        LmiddleWare.getLessonFromDatabase(id) (dispatch)
        setActiveLesson(true)
    }


    return ( 
        <View>
            {activeLesson? <ActiveLesson setActive={setActiveLesson} lessonId={lessonChoice}/> :
            <ScrollView>
            {globalLessons.lessons.map(lesson => 
                <View key={lesson.id}>
                    <LessonCard lesson={lesson} activateLesson={activateLesson} progress={5}/>
                </View>
            )}
            </ScrollView>
            }
        </View>
     );
}

export default lessonPath;