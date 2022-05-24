import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "../../redux/hooks";
import LessonPath from "./lessons/LessonPath/LessonPath";
import Results from "./Results/Results";
import Profile from "./profile/Profile";
import { useRef} from "react";


import {pageAction}from "../../redux/pages";
import { lessonAction } from "../../redux/lessons";
import Message from "../componants/Alert/Message";

import Navbar from "../componants/Navbar/Navbar";

//authentication
import {auth} from "../../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Auth/Login";




function Home() {
    const [user] = useAuthState(auth)
    const page = useSelector(state => state.page)
    const lesson = useSelector(state => state.lesson)
    const dispatch = useDispatch()
    const {height, width} = useWindowDimensions()

    const anim = useRef(new Animated.Value(0)).current;

    const movePage = (page:Animated.Value,direction:string) => {
        var start = 0
        var end = 0

        if (direction==='left'){
            start = width
        }
        if (direction==='right'){
            start = -width
        }
        page.setValue(start)
        Animated.spring(page, {
            useNativeDriver:true,
            toValue: end,
        }).start();
    }


    const actions = [
        () => {
            lessonAction.updateLesson({...lesson,lesson:{active:false}}) (dispatch)
            pageAction.changePage('Profile') (dispatch)
            movePage(anim,'left')
        },
        () => {
            lessonAction.updateLesson({...lesson,lesson:{active:false}}) (dispatch)
            var direction = 'left'
            if (page.page==='Profile'){
                direction='right'
            } 
            pageAction.changePage('Results') (dispatch)
            movePage(anim, direction)
        },
        () => {
            lessonAction.updateLesson({...lesson,lesson:{active:false}}) (dispatch)
            pageAction.changePage('Lessons') (dispatch)
            movePage(anim,'right')

            
        }
    ]

    return ( 
        <View style={styles.container}>
            
            
            {user? 
                <>
                
                <Navbar action={actions}/>
                <View style={styles.pages}>
                    {page.page==="Lessons"? <Animated.View style={{translateX:anim}}><LessonPath/></Animated.View>: null}
                    {page.page==="Results"? <Animated.View style={{translateX:anim}}><Results/></Animated.View> : null}
                    {page.page==="Profile"? <Animated.View style={{translateX:anim}}><Profile/></Animated.View> : null}
                    
                </View>
                
                </>
            :<Login/>}
            <Message/>
            
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


      },
      pages: {
        width:'100%',
        flex:1,
        
        
      }
    })

export default Home;