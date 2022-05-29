import { View, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, runOnJS} from "react-native-reanimated"
import { PanGestureHandler,GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "../../redux/hooks";
import LessonPath from "./lessons/LessonPath/LessonPath";
import Results from "./Results/Results";
import Profile from "./profile/Profile";
import { useEffect, useRef} from "react";


import {pageAction}from "../../redux/pages";
import { lessonAction } from "../../redux/lessons";
import Message from "../componants/Alert/Message";

import Navbar from "../componants/Navbar/Navbar";

//authentication
import {auth} from "../../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Auth/Login";
import { ScrollView } from "react-native-gesture-handler";




function Home() {
    const [user] = useAuthState(auth)
    const page = useSelector(state => state.page)
    const lesson = useSelector(state => state.lesson)
    const dispatch = useDispatch()
    const {height, width} = useWindowDimensions()

    const anim = useSharedValue(0)
    const animationStyles = useAnimatedStyle(() =>{
        return{
            transform: [{translateX:anim.value}]
        }
    })
    const goProfile = async() => {
        await lessonAction.updateLesson({...lesson,lesson:{active:false}}) (dispatch)
        await pageAction.changePage('Profile') (dispatch)
        anim.value = width
        anim.value = withSpring(0)
    }
    const goResults = async() => {
        
        await lessonAction.updateLesson({...lesson,lesson:{active:false}}) (dispatch)
        await pageAction.changePage('Results') (dispatch)
        anim.value = width
        if (page.page==='Profile'){
            anim.value = -width
        } 
        anim.value = withSpring(0)
    }
    const goLessons = async() => {
        await lessonAction.updateLesson({...lesson,lesson:{active:false}}) (dispatch)
        await pageAction.changePage('Lessons') (dispatch)
        anim.value = -width
        anim.value = withSpring(0)
    }


    const actions = [
        goProfile,
        goResults,
        goLessons
    ]

    const startingPosition = 0;
    const pressed = useSharedValue(false);
    const x = useSharedValue(startingPosition);

    const eventHandler = useAnimatedGestureHandler({  
        onStart: (event, ctx) => {
            pressed.value = true;  
        },  
        onActive: (event, ctx) => {     
            x.value = startingPosition + event.translationX;
            
        },  
        onEnd: (event, ctx) => {
            pressed.value = false;
            if (x.value<=-150){
                x.value= width
            } else if (x.value>=150){
                x.value = -width
            } else{ 
                x.value = withSpring(startingPosition); 
            }
             
    },});

    const uas = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x.value }],  
    };});

    const checkSwitch = async() => {
        if (x.value>=150) {
            if (page.page==='Lessons'){
                goResults()
            }else if (page.page==='Results'){
                goProfile()
            }else{
                x.value=0
            }
        }
        if (x.value<=-150){
            if (page.page==='Profile'){
                goResults()
            }else if (page.page==='Results'){
                goLessons()
            }else{
                x.value=0
            }
            
        }
        
    }
    useEffect(() => {x.value = 0},[page.page])

    return ( 
        <View style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
            
            
            {user? 
                <>
                
                <Navbar action={actions}/>
                
                <PanGestureHandler onGestureEvent={eventHandler} activeOffsetX={[-10, 10]} onEnded={checkSwitch} >
                <Animated.View style={[styles.pages, uas]}>
                    {page.page==="Lessons"? <Animated.View style={animationStyles}><LessonPath/></Animated.View>: null}
                    {page.page==="Results"? <Animated.View style={animationStyles}><Results/></Animated.View> : null}
                    {page.page==="Profile"? <Animated.View style={animationStyles}><Profile/></Animated.View> : null}
                </Animated.View>
                </PanGestureHandler>
                
                </>
                
            :<Login/>}
            <Message/>
            </GestureHandlerRootView>
            
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'cornflowerblue',
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",  
        overflow:'hidden',


      },
      pages: {
        width:'100%',
        flex:1,
        
        
      }
    })

export default Home;