import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import {useDispatch, useSelector} from "../../../redux/hooks"
import {pageAction}from "../../../redux/pages";
import Buttons from '../Buttons/Button';
import {lessonAction}  from "../../../redux/lessons";
import {Prompt} from "../../../redux/lessons";
import { useEffect } from 'react';
import {size} from "../globalStyle"

import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { repeat } from 'react-native-reanimated/lib/types/lib/reanimated2/animation/repeat';
import { styles } from '../../pages/Auth/Signup';




function Message() {
    const message = useSelector(state => state.page.message)
    const lesson = useSelector(state => state.lesson)
    const user = useSelector(state => state.user)
    const ad = useSelector(state => state.ads)
    const dispatch = useDispatch()

    const alertType = (() => {
        var prompt:Prompt = {active:false}
        type inactiveType = {prompt:typeof prompt, type:"INACTIVE"}
        if (message.type==='alert'){
            const ret:{type:'alert', message:string} = {type:'alert', message:message.message}
            return(ret)
        }
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
            if (prompt.type==='match'){
                const ret:{prompt:typeof prompt, type:'correctmatch'} = {prompt,type:"correctmatch"}
                return(ret)
            }
            if (prompt.type==='sentence'){
                const ret:{prompt:typeof prompt, type:'correctsentence'} = {prompt, type:'correctsentence'}
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
            if (prompt.type==='match'){
                const ret:{prompt:typeof prompt, type:"wrongmatch"} = {prompt,type:"wrongmatch"}
                return(ret)
            }
            if (prompt.type==='sentence'){
                const ret:{prompt:typeof prompt, type:"wrongsentence"} = {prompt,type:'wrongsentence'}
                return(ret)
            }
        }
        
        type unk = {prompt:typeof prompt, type:"UNKNOWN"}
        const ret:unk = {prompt,type:'UNKNOWN'}
        return(ret)
        
    })()

    const handlePress = () => {
        offset.value = withSpring(size.full)
        op.value = withSpring(0)
        setTimeout(() => {
        if (message.type==='correct'){
            lessonAction.correct(user, lesson, ad) (dispatch)
        } else{
            lessonAction.Incorrect(user,lesson) (dispatch)
        }
        pageAction.updateMessage({active:false,type:'correct'}) (dispatch)
        },500)
    }

    const offset = useSharedValue(size.full)
    const op = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => {
        return{
            transform: [{ translateY: offset.value }],
        }
    })
    const opacityStyles = useAnimatedStyle(() => {
        return{
            opacity:op.value
        }
    })

    useEffect(() => {
    if (message.active){
        offset.value = withSpring(0)
        op.value = withSpring(1)
    }
    if (message.type==='alert'){
        setTimeout(() => {
            pageAction.updateMessage({active:false,type:'correct'}) (dispatch)
        },2000)
    }
    },[message.active])
    


    return ( 
        <>
            {alertType.type==="wrongmulti" || alertType.type ==="wrongbuild"?
            <Animated.View style={[style.wrongBack,opacityStyles]}>
                <View style={style.wrong}>
                    <Animated.View style={[style.x, animatedStyles]}>
                        <View style={style.box}>
                            <Image style={style.image} source={ require('../../../images/x.png')} />
                        </View>
                        <Text style={style.text}>{alertType.prompt.messages.title}</Text>
                        <Text style={style.desc}>{alertType.prompt.messages.definition}</Text>
                        <Text style={style.text}>Example:</Text>
                        <Text style={style.desc}>{alertType.prompt.messages.example}</Text>
                    </Animated.View>
                    <Buttons onPress={() => {handlePress()}} style="correct" title="Next Question"/>
                </View>
            </Animated.View>
            : alertType.type==="correctmulti"|| alertType.type==="correctbuild"|| alertType.type==='correctmatch' || alertType.type==='correctsentence'? 
            <Animated.View style={[style.correctBack,opacityStyles]}>
                <View style={style.correct}>
                    <Animated.View style={[style.check, animatedStyles]}>
                        <Image style={style.image} source={ require('../../../images/check.png')} />
                    </Animated.View>
                    <Buttons onPress={() => {handlePress()}} style="correct" title="Next Question"/>
                </View>
            </Animated.View>
            : alertType.type==='alert'?
            <Text style={style.alert}>
                {alertType.message}
            </Text>
            : alertType.type==='wrongsentence'?
            <Animated.View style={[style.wrongBack,opacityStyles]}>
                <View style={style.wrong}>
                    <Animated.View style={[style.x, animatedStyles]}>
                        <View style={style.box}>
                            <Image style={style.image} source={ require('../../../images/x.png')} />
                        </View>
                        <Text style={style.text}>The correct answer was:</Text>
                        <Text style={style.desc}>{alertType.prompt.correct}</Text>
                    </Animated.View>
                    <Buttons onPress={() => {handlePress()}} style="correct" title="Next Question"/>
                </View>
            </Animated.View>
            :null}
        </>
     );
}

const style = StyleSheet.create({
    correctBack:{
        backgroundColor:'#68cb30',
        position:"absolute",
        padding:size.medium,
        paddingTop:size.larger,
        bottom:0,
        borderTopWidth:size.thin,
        height:size.half,
        width:size.fullWidth,
    },
    correct:{
        flex:1,
        display:'flex',
        justifyContent:'space-between'

    },
    
    check:{
        backgroundColor:'lightgray',
        borderRadius:size.curve,
        borderWidth:size.thin,

        alignItems:'center',
    },
    wrongBack:{
        backgroundColor:'#ff8989',
        padding:size.small,
        position:"absolute",
        bottom:0,
        height:size.full,
        width:size.fullWidth,
    },
    wrong:{
        flex:1,
        display:'flex',
        justifyContent:'space-between'
    },
    x:{
        backgroundColor:'lightgray',
        borderRadius:size.small,
        borderWidth:size.thin,
        marginTop:size.larger,
        paddingBottom:size.medium,
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
    },
    alert:{
        backgroundColor:'red',
        height:size.largest,
        color:'white',
        padding:size.small,
        fontSize:size.small,
        borderWidth:size.thin
    }
})
export default Message;