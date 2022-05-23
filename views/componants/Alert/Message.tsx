import {View, Text, StyleSheet, useWindowDimensions, Image, Animated, SafeAreaView} from 'react-native';
import {Audio} from 'expo-av';
import { useEffect } from 'react';
import {useDispatch, useSelector} from "../../../redux/hooks"
import {pageAction}from "../../../redux/pages";
import Buttons from '../Buttons/Button';
import { setLogLevel } from 'firebase/firestore';
import {lessonAction}  from "../../../redux/lessons";
import {useRef} from "react";




function Message() {
    const message = useSelector(state => state.page.message)
    const lesson = useSelector(state => state.lesson)
    const user = useSelector(state => state.user)
    const {height, width} = useWindowDimensions()
    const dispatch = useDispatch()

    const handlePress = () => {
        if (message.type==='correct'){
            lessonAction.correct(user, lesson) (dispatch)
        } else{
            lessonAction.Incorrect(user,lesson) (dispatch)
        }
        pageAction.updateMessage({active:false,type:'correct'}) (dispatch)
    }


    const anim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    if (message.active){
    Animated.spring(anim, {
        useNativeDriver:true,
        toValue: 0,
    }).start();
    Animated.spring(fadeAnim, {
        useNativeDriver:true,
        toValue: 1,
    }).start();
    }
    const out = () => {
        Animated.spring(anim, {
            useNativeDriver:true,
            toValue: height,
        }).start();
        Animated.spring(fadeAnim, {
            useNativeDriver:true,
            toValue: 0,
        }).start();
        setTimeout(handlePress,300)
    }

    


    return ( 
        <>
            {message.active && lesson.lesson.active && message.type==="wrong"?
            <Animated.View style={{...style.wrong, height, width, opacity:fadeAnim}}>
                <Animated.View style={{translateY:anim,display:'flex',height, flexDirection:"column", justifyContent:'space-between'}}>
                    <View style={style.check}>
                    <View style={style.box}>
                        <Image style={style.image} source={ require('../../../images/x.png')} />
                        
                    </View>
                    <Text style={style.text}>{lesson.lesson.subLessons[lesson.lesson.subLessonIndex].prompts[lesson.lesson.promptIndex].messages.title}</Text>
                    <Text style={style.desc}>{lesson.lesson.subLessons[lesson.lesson.subLessonIndex].prompts[lesson.lesson.promptIndex].messages.definition}</Text>
                    <Text style={style.text}>Example:</Text>
                    <Text style={style.desc}>{lesson.lesson.subLessons[lesson.lesson.subLessonIndex].prompts[lesson.lesson.promptIndex].messages.example}</Text>
                    </View>
                    <Buttons onPress={() => {out()}} style="correct" title="Next Question"/>
                </Animated.View>
            </Animated.View>
            : message.active && lesson.lesson.active && message.type==='correct'? 
            <Animated.View style={{...style.correct, height:(height/3.5), width, opacity:fadeAnim}}>
                <Animated.View style={{translateY:anim,display:'flex',height:(height/3.5), flexDirection:"column", justifyContent:'space-between'}}>
                    <View style={style.ccheck}>
                    <View style={style.cbox}>
                        <Image style={style.cimage} source={ require('../../../images/check.png')} />
                        <Text style={style.ctext}>Correct!</Text>
                    </View>
                    </View>
                    <Buttons onPress={() => {out()}} style="correct" title="Next Question"/>
                </Animated.View>
            </Animated.View>
            : null}
        </>
     );
}

const style = StyleSheet.create({
    correct:{
        backgroundColor:'#68cb30',
        position:"absolute",
        padding:10,
        bottom:0,
        borderTopWidth:3,
        borderRightWidth:3,
        borderLeftWidth:3,
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        
    },
    check:{
        backgroundColor:'lightgray',
        borderRadius:16,
        borderWidth:3,
        marginHorizontal:4,
        marginTop:40,
        paddingBottom:20,
    },
    ccheck:{
        backgroundColor:'lightgray',
        borderRadius:16,
        borderWidth:3,
        marginHorizontal:4,
        marginTop:20,
    },
    cbox:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'

    },
    cimage:{
        resizeMode:"contain",
        height:50,
        width:50,
        margin:10,
    },
    ctext:{
        marginHorizontal:20,
        fontSize:40,
    },
    wrong:{
        backgroundColor:'#ff8989',
        padding:10,
        position:"absolute",
        bottom:0,

    },
    text:{
        color:'black',
        fontSize:30,
        marginHorizontal:15,
        marginVertical:10,
    },
    desc:{
        color:'black',
        fontSize:20,
        backgroundColor:'white',
        marginHorizontal:30,
        padding:10,
        borderRadius:5,
        textAlign:'center',
    },
    image:{
        resizeMode:"contain",
        height:200,
        width:200,
        margin:20,
    },
    box:{
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:16,
    }
})
export default Message;