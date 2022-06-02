import {View, ScrollView, Text, Image, StyleSheet} from "react-native";
import {useEffect} from "react";

import ActiveLesson from "../ActiveLesson/ActiveLesson";
import {useDispatch, useSelector} from "../../../../redux/hooks";
import LessonCard from "./componants/LessonCard";
import {lessonAction} from "../../../../redux/lessons";
import {globalStyling} from "../../../componants/globalStyle"
import Info from "./componants/Info";





function lessonPath() {
    const lesson = useSelector(state => state.lesson)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(lesson.globalLessons.active) {return;}
         lessonAction.setGlobalLessonsState() (dispatch)
    },[])

    const activateLesson = (id:number) => {
        if (lesson.globalLessons.active){
            if (lesson.globalLessons.lessons[id].level <= user.level){
                lessonAction.setLessonState(id, user) (dispatch)
            } else {
                console.log("you need to level up first")
            }
        }
    }


    return ( 
        <>
            {lesson.lesson.active? <ActiveLesson /> :
            <>
            <Text style={globalStyling.head}>Lessons</Text>
            <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {lesson.globalLessons.active? lesson.globalLessons.lessons.map(lesson => 
                    <View key={lesson.id}>
                        <LessonCard lesson={lesson} activateLesson={(activateLesson)} level={user.level} progress={
                            user.lessonData[lesson.id].percentage
                        }/>
                    </View>
                ): null}
                <Image style={{width:'100%', resizeMode:'contain'}} source={require('../../../../images/cautionTape.png')}/>
            </ScrollView>
            <Info/>
            </View>
            </>
            }
        </>
     );
}

export default lessonPath;

const styles = StyleSheet.create({
    layout:{
        display:'flex',
        flexDirection:'row'
    }
})