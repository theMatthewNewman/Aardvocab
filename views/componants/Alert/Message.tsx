import {View, Text, StyleSheet, useWindowDimensions, Image, Animated} from 'react-native';
import {useDispatch, useSelector} from "../../../redux/hooks"
import {pageAction}from "../../../redux/pages";
import Buttons from '../Buttons/Button';
import {lessonAction}  from "../../../redux/lessons";
import {useRef} from "react";
import {Prompt} from "../../../redux/lessons";

import {size} from "../globalStyle"




function Message() {
    const message = useSelector(state => state.page.message)
    const lesson = useSelector(state => state.lesson)
    const user = useSelector(state => state.user)
    const {height, width} = useWindowDimensions()
    const dispatch = useDispatch()

    const alertType = (() => {
        var prompt:Prompt = {active:false}
        type inactiveType = {prompt:typeof prompt, type:"INACTIVE"}
        if (!lesson.lesson.active || !message.active){
            const ret:inactiveType = {prompt:prompt,type:"INACTIVE"}
            return(ret)
        }
        prompt = lesson.lesson.subLessons[lesson.lesson.subLessonIndex].prompts[lesson.lesson.promptIndex]
        if (!prompt.active){
            const ret:inactiveType = {prompt:prompt,type:"INACTIVE"}
            return(ret)
        }
        if (message.type==='correct'){
            if (prompt.type==='build'){
                const ret:{prompt:typeof prompt, type:'correctbuild'} = {prompt,type:"correctbuild"}
                return(ret)
            }
            if (prompt.type==='multi'){
                const ret:{prompt:typeof prompt, type:"correctmulti"} = {prompt,type:"correctmulti"}
                return(ret)
            }
            if (prompt.type==='compare'){
                const ret:{prompt:typeof prompt, type:'correctcompare'} = {prompt,type:"correctcompare"}
                return(ret)
            }
        }
        if (message.type==='wrong'){
            if (prompt.type==='build'){
                const ret:{prompt:typeof prompt, type:"wrongbuild"} = {prompt,type:"wrongbuild"}
                return(ret)
            }
            if (prompt.type==='multi'){
                const ret:{prompt:typeof prompt, type:"wrongmulti"} = {prompt,type:"wrongmulti"}
                return(ret)
            }
            if (prompt.type==='compare'){
                const ret:{prompt:typeof prompt, type:"wrongcompare"} = {prompt,type:"wrongcompare"}
                return(ret)
            }
        }
        type unk = {prompt:typeof prompt, type:"UNKNOWN"}
        const ret:unk = {prompt,type:'UNKNOWN'}
        return(ret)
        
    })()

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
            {alertType.type==="wrongmulti"?
            <Animated.View style={{...style.wrong, height, width, opacity:fadeAnim}}>
                <Animated.View style={{translateY:anim,display:'flex',height, flexDirection:"column", justifyContent:'space-between'}}>
                    <View style={style.check}>
                    <View style={style.box}>
                        <Image style={style.image} source={ require('../../../images/x.png')} />
                        
                    </View>
                    <Text style={style.text}>{alertType.prompt.messages.title}</Text>
                    <Text style={style.desc}>{alertType.prompt.messages.definition}</Text>
                    <Text style={style.text}>Example:</Text>
                    <Text style={style.desc}>{alertType.prompt.messages.example}</Text>
                    </View>
                    <Buttons onPress={() => {out()}} style="correct" title="Next Question"/>
                </Animated.View>
            </Animated.View>
            : alertType.type==="correctmulti"? 
            <Animated.View style={{...style.correct, height:(size.half), width, opacity:fadeAnim}}>
                <Animated.View style={{translateY:anim,display:'flex',height:(size.half), flexDirection:"column", justifyContent:'space-between'}}>
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
        padding:size.small,
        bottom:0,
        borderTopWidth:size.thin,
        
    },
    check:{
        backgroundColor:'lightgray',
        borderRadius:size.small,
        borderWidth:size.thin,
        marginTop:size.larger,
        paddingBottom:size.medium,
    },
    ccheck:{
        backgroundColor:'lightgray',
        borderRadius:size.small,
        borderWidth:size.thin,
        marginVertical:size.small,
        flex:1,
    },
    cbox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        height:"100%",
        padding:size.larger,

    },
    cimage:{
        resizeMode:"contain",
        height:size.huge,
        width:size.huge,
    },
    ctext:{
        fontSize:size.large,
    },
    wrong:{
        backgroundColor:'#ff8989',
        padding:size.medium,
        position:"absolute",
        bottom:0,

    },
    text:{
        color:'black',
        fontSize:size.medium,
        marginHorizontal:size.small,
        marginVertical:size.small,
    },
    desc:{
        color:'black',
        fontSize:size.medium,
        backgroundColor:'white',
        marginHorizontal:size.medium,
        padding:size.small,
        borderRadius:size.smaller,
        textAlign:'center',
    },
    image:{
        resizeMode:"contain",
        height:size.giant,
        width:size.giant,
        margin:size.large,
    },
    box:{
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:size.small,
    }
})
export default Message;