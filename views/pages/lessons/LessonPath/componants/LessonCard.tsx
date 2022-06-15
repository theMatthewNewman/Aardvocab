import { Pressable, Image, Text, StyleSheet, View } from "react-native"
import ProgressBar from "../../ActiveLesson/componants/ProgressBar";
import {useState} from "react"
import Buttons from "../../../../componants/Buttons/Button";

import {size} from "../../../../componants/globalStyle";

type LessonCardType = {
    activateLesson:any,
    lesson:any
    progress:number,
    level:number,
}


function LessonCard(props:LessonCardType) {
    const [description, setDescription] = useState(false);
    const [active, setActive] =useState(false)

    const handlePress = () => {
        if (props.progress>=100 || props.lesson.level>props.level){
            
        }
        else{
            setDescription(!description)
        }
    }

    const handleStartLesson = () => {
        props.activateLesson(props.lesson.id)
    }

    return ( 
        <>
            <Pressable onPress={handlePress} style={(props.progress>=100 || props.lesson.level>props.level)? styles.deactive: styles.all}>
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
                        <Text style={styles.lessonType}>
                            Lesson Type: {props.lesson.type}
                        </Text>
                        <Text>
                            {props.lesson.description}
                        </Text>
                        <Buttons onPress={handleStartLesson} style="Strong" title="Start Lesson"/>
                    </View>: null}

            </Pressable>
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