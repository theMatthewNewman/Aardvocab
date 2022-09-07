import {View, ScrollView, Text, Image, StyleSheet, FlatList} from "react-native";
import {useEffect, useRef, useState} from "react";

import ActiveLesson from "../ActiveLesson/ActiveLesson";
import {useDispatch, useSelector} from "../../../../redux/hooks";
import LessonCard from "./componants/LessonCard";
import {lessonAction} from "../../../../redux/lessons";
import {globalStyling, size} from "../../../componants/globalStyle"
import Info from "./componants/Info";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { gLesson } from "../../../../redux/lessons/dataTypes";





function lessonPath() {
    const lesson = useSelector(state => state.lesson)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [xpReady, setXpReady] = useState(false)
    const myRef:any = useRef()
    const [dataSourceCords, setDataSourceCords] = useState<number[]>([])
    
    
    

    useEffect(() => {
        if(lesson.globalLessons.active) {return;}
         lessonAction.setGlobalLessonsState(user) (dispatch)
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
            backgroundColor:`rgb(${animValue.value*0+((-1*animValue.value)+1)*255},
                                ${animValue.value*0+((-1*animValue.value)+1)*255},
                                ${animValue.value*0+((-1*animValue.value)+1)*255})`
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
                {lesson.globalLessons.active?
                    <FlatList
                    data={lesson.globalLessons.lessons}
                    renderItem={({item}) => 
                    <View key={item.id} onLayout={event => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[item.id] = layout.y; // we store this offset values in an array
                        }}>
                        {lesson.globalLessons.active?
                        <LessonCard reef={myRef} cords={dataSourceCords} lesson={item} lessons={lesson.globalLessons.lessons} activateLesson={(activateLesson)} user={user} progress={
                            user.lessonData[item.id].percentage
                        }/>:null}
                    </View>
                    
                    }/>
                :null}
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