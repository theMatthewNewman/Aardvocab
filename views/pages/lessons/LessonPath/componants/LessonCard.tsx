import { Pressable, Image, Text, StyleSheet, View, Vibration } from "react-native"
import ProgressBar from "../../ActiveLesson/componants/ProgressBar";
import {useState} from "react"
import Buttons from "../../../../componants/Buttons/Button";

import {size} from "../../../../componants/globalStyle";
import { lessonState } from "../../../../../redux/lessons";
import { gLesson } from "../../../../../redux/lessons/dataTypes";
import { userState } from "../../../../../redux/user";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type LessonCardType = {
    activateLesson:any,
    lesson:gLesson,
    progress:number,
    user:userState,
    
}


function LessonCard(props:LessonCardType) {
    const [description, setDescription] = useState(false);
    

    const handlePress = () => {
        if (isActive()!){
            setDescription(!description)
            if(!description){
                height.value=withSpring(80)
            }else{
                height.value=withSpring(0)
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

    const isActive = () => {
        
        if (props.progress>=100){
            return(false)
        }
        
        switch(props.lesson.concept){
            case 'Grammar':{
                if (props.lesson.level<=props.user.grammarLevel){
                    return(true);
                    
                }
                return(false);
                
            }
            case 'Pros':{
                if (props.lesson.level<=props.user.prosLevel){
                    return(true)
                }
                return(false)

            }
            case 'Spelling':{
                if (props.lesson.level<=props.user.spellingLevel){
                    return(true)
                }
                return(false)

            }
            case 'Vocabulary':{
                if (props.lesson.level<=props.user.vocabLevel){
                    return(true)
                }
                return(false)

            }
            case 'any':{
                if (props.lesson.level<=props.user.level){
                    return(true)
                }
                return(false)

            }
        }
    }

    const rotatex = useSharedValue(0)
    const rotatey = useSharedValue(0)
    const rotatez = useSharedValue(0)
    const slidex = useSharedValue(0)
    const height = useSharedValue(0)
    const animStyle = useAnimatedStyle(() => {
        return{
            transform:[
                {rotateX:`${rotatex.value}deg`},
                {rotateY:`${rotatey.value}deg`},
                {rotateZ:`${rotatez.value}deg`},
                {translateX:slidex.value},
                
            ],
            height:250+height.value
            
            
        }
    })

    return ( 
        <>  
            <Animated.View style={[{},animStyle]}>
            <Pressable onPress={handlePress} style={isActive()? styles.all: styles.deactive}>
                <View style={styles.content}>
                    <Image source={{uri: props.lesson.pictureURL}} style={styles.image}/>
                    <View style={styles.description}>
                        <Text style={styles.lessonNumber}>Lesson #{props.lesson.id +1}</Text>
                        <Text style={styles.title}>{props.lesson.name}</Text>
                    </View>
                </View>
                <ProgressBar progress={props.progress}/>

                {description? 
                    <View style={[styles.about,animStyle]}>
                        
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