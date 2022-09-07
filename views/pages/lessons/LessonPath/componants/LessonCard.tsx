import { Pressable, Image, Text, StyleSheet, View, Vibration, ScrollView } from "react-native"
import ProgressBar from "../../ActiveLesson/componants/ProgressBar";
import {useEffect, useRef, useState} from "react"
import Buttons from "../../../../componants/Buttons/Button";

import {size} from "../../../../componants/globalStyle";
import { lessonAction, lessonState } from "../../../../../redux/lessons";
import { gLesson } from "../../../../../redux/lessons/dataTypes";
import { userState } from "../../../../../redux/user";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useDispatch, useSelector } from "../../../../../redux/hooks";
import ActiveLesson from "../../ActiveLesson/ActiveLesson";
import { pageAction } from "../../../../../redux/pages";

type LessonCardType = {
    activateLesson:any,
    lesson:gLesson,
    progress:number,
    user:userState,
    lessons:gLesson[],
    reef:any,
    cords:number[]
    
    
}


function LessonCard(props:LessonCardType) {
    const [description, setDescription] = useState(false);
    const [pressed, setPressed] = useState(false)
    const dispatch = useDispatch()
    const myRef:any = useRef()
    useEffect(() => {activateLesson()}, [])
    
    

    const handlePress = () => {
        
        
        if (props.lesson.active){
            setTimeout(() => setDescription(!description),100)
            
            if(description === false){
                height.value=withTiming(size.giant)
            }
            if(description === true){
                
                height.value=withTiming(0)
            }
            
            
        }else{
            Vibration.vibrate()
            slidex.value=withSpring(30)
            setTimeout(() => {
                slidex.value=withSpring(0)
            },100)

        }
    }
    

    const handleStartLesson = () => {
        props.activateLesson(props.lesson.id)
    }
    

    const activateLesson = () => {
        const glesson = props.lesson

        const wasActive = props.lesson.active
        if (props.progress>=100 && wasActive){
            lessonAction.changeActivation(props.lessons,{...glesson,active:false}) (dispatch)
        }
        if (props.lesson.concept==='Grammar'){
            if (props.lesson.level<=props.user.grammarLevel&&!wasActive){   
                lessonAction.changeActivation(props.lessons,{...glesson,active:true}) (dispatch)
            }
        }
        if (props.lesson.concept==='Pros'){
            if (props.lesson.level<=props.user.prosLevel&&!wasActive){   
                lessonAction.changeActivation(props.lessons,{...glesson,active:true}) (dispatch)
            }

        }
        if (props.lesson.concept==='Spelling'){
            if (props.lesson.level<=props.user.spellingLevel&&!wasActive){   
                lessonAction.changeActivation(props.lessons,{...glesson,active:true}) (dispatch)
            }
        }
        if (props.lesson.concept==='Vocabulary'){
            if (props.lesson.level<=props.user.vocabLevel&&!wasActive){   
                lessonAction.changeActivation(props.lessons,{...glesson,active:true}) (dispatch)
            }
        }
        if (props.lesson.concept==='any'){
            if (props.lesson.level<=props.user.level&&!wasActive){ 
                pageAction.updateMessage({active:true,type:'unlockLesson',run:() => {
                    color.value=1
                    color.value=withSpring(0)
                    slidex.value=withSpring(30);
                    setTimeout(() => {
                        slidex.value=withSpring(0);
                        
                    },500)
                    props.reef.current.scrollTo({y:props.cords[props.lesson.id],animated:true})            
                    lessonAction.changeActivation(props.lessons,{...glesson,active:true}) (dispatch);
                }}) (dispatch)
            }
        }
    }
    
    const rotatex = useSharedValue(0)
    const rotatey = useSharedValue(0)
    const rotatez = useSharedValue(0)
    const slidex = useSharedValue(0)
    const height = useSharedValue(0)
    const color = useSharedValue(0)
    const animStyle = useAnimatedStyle(() => {
        return{
            transform:[
                {rotateX:`${rotatex.value}deg`},
                {rotateY:`${rotatey.value}deg`},
                {rotateZ:`${rotatez.value}deg`},
                {translateX:slidex.value},
                
            ],
            height:size.gianter+height.value+size.larger,
            backgroundColor:`rgba(0,0,0,${color.value})`
            
            
        }
    })
    
    

    return ( 
        <>  
            <Animated.View style={[{},animStyle]} ref={myRef}>
            <Pressable onPress={handlePress} style={props.lesson.active? styles.all: styles.deactive}>

                <View style={styles.content}>
                    <Image source={{uri: props.lesson.pictureURL}} style={styles.image}/>
                    <View style={styles.description}>
                        <Text style={styles.lessonNumber}>Lesson #{props.lesson.id +1}</Text>
                        <Text style={styles.title}>{props.lesson.name}</Text>
                    </View>
                </View>
                <ProgressBar progress={props.progress}/>
                
                {description? 
                    <View style={styles.about}>
                        
                        <Text>
                            {props.lesson.description}
                        </Text>
                        <Buttons onPress={handleStartLesson} style="Strong" title="Start Lesson"/>
                    </View>: null}
            </Pressable>
            </Animated.View>
        </>
     );
}

export default LessonCard;

const styles = StyleSheet.create({
    image:{
        width:size.huge,
        height:size.huge,
        resizeMode:"contain",
        margin:size.smaller,
    },
    title:{
        alignSelf:"center",
        textAlign:"center",
        fontSize:size.large,
    },
    lessonNumber:{
        alignSelf:"center",
        textAlign:"center",
        fontSize:size.medium,
    },
    lessonType:{
        fontSize:size.small,
        marginBottom:size.small,

    },
    about:{
        backgroundColor:"lightgray",
        padding:size.small,
        borderRadius:size.smaller,
        
    },
    content:{
        display:"flex",
        flexDirection:"row",
        
    },
    description:{
        flex:1,
        display:"flex",
        justifyContent:"space-evenly",
        
    },
    all:{
        backgroundColor:"white",
        display:"flex",
        marginLeft:size.Wsmallest,
        marginRight:size.largest,
        marginTop:size.small,
        borderRadius:size.curve,
        borderWidth:size.thin,
        padding:size.small,
    },
    deactive:{
        backgroundColor:"gray",
        display:"flex",
        borderRadius:size.curve,
        borderWidth:size.thin,
        padding:size.small,
        marginLeft:size.Wsmallest,
        marginRight:size.largest,   
        marginTop:size.small,
    }

})