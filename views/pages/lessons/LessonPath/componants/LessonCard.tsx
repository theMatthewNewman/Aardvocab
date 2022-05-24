import { Pressable, Image, Text, StyleSheet, View } from "react-native"
import ProgressBar from "../../ActiveLesson/componants/ProgressBar";
import {useState} from "react"
import Buttons from "../../../../componants/Buttons/Button";

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
        width:100,
        height:100,
        resizeMode:"contain",
        margin:10,
    },
    title:{
        alignSelf:"center",
        textAlign:"center",
        fontSize:30,
    },
    lessonNumber:{
        alignSelf:"center",
        textAlign:"center",
        fontSize:20,
    },
    lessonType:{
        fontSize:15,
        marginBottom:10,

    },
    about:{
        backgroundColor:"lightgray",
        padding:10,
        borderRadius:10,
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
        marginLeft:20,
        marginRight:60,
        marginTop:40,
        borderRadius:20,
        borderWidth:2,
        padding:10,
    },
    deactive:{
        backgroundColor:"gray",
        display:"flex",
        marginLeft:20,
        marginRight:60,
        marginTop:40,
        borderRadius:20,
        borderWidth:2,
        padding:10,
    }

})