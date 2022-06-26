import {View, ScrollView, Text, Image, StyleSheet} from "react-native";
import {useEffect, useState} from "react";

import ActiveLesson from "../ActiveLesson/ActiveLesson";
import {useDispatch, useSelector} from "../../../../redux/hooks";
import LessonCard from "./componants/LessonCard";
import {lessonAction} from "../../../../redux/lessons";
import {globalStyling, size} from "../../../componants/globalStyle"
import Info from "./componants/Info";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";





function lessonPath() {
    const lesson = useSelector(state => state.lesson)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [xpReady, setXpReady] = useState(false)
    
    

    useEffect(() => {
        if(lesson.globalLessons.active) {return;}
         lessonAction.setGlobalLessonsState() (dispatch)
    },[])

    useEffect(() => {
        if(lesson.lesson.active){
            setXpReady(true)
        }
        if(!lesson.lesson.active && xpReady){
            setXpReady(false)
            animateColor()
        }
    },[lesson.lesson.active])

    const activateLesson = (id:number) => {
        if (lesson.globalLessons.active){
            if (lesson.globalLessons.lessons[id].level <= user.level){
                lessonAction.setLessonState(id, user) (dispatch)
            } else {
                console.log("you need to level up first")
            }
        }
    }

    const animValue = useSharedValue(0)
    const animation = useAnimatedStyle(() => {
        return{
            backgroundColor:`rgb(${animValue.value*255+((-1*animValue.value)+1)*255},
                                ${animValue.value*255+((-1*animValue.value)+1)*255},
                                ${animValue.value*51+((-1*animValue.value)+1)*255})`
        }
    })
    const animateColor = async() => {
        animValue.value=withSpring(1)
        setTimeout(() => {
            animValue.value=withSpring(0)
        },1000)

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
                        <LessonCard lesson={lesson} activateLesson={(activateLesson)} user={user} progress={
                            user.lessonData[lesson.id].percentage
                        }/>
                    </View>
                ): null}
                <Image style={{width:'100%', resizeMode:'contain'}} source={require('../../../../images/cautionTape.png')}/>
            </ScrollView>
            <Animated.Text style={[styles.xp,animation]}>{user.levelsCompletedToday.levels*15}xp</Animated.Text>
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
    },
    xp:{
        fontSize:size.medium,
        position:'absolute',
        right:size.smaller,
        top:size.largest,
        color:'purple',
        paddingLeft:size.smaller,
        paddingVertical:size.smallest,
        borderWidth:size.thin,
        borderRadius:size.smallest

    }
})