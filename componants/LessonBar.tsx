import { View, Pressable, Text, StyleSheet } from "react-native";
import * as middleware from "../logic/pageHandleing/middleware"
import {useDispatch} from "../logic/store";
 

function LessonBar(props:any) {
    const dispatch = useDispatch();
    

    return ( 
        <View style = {styles.lessonBar}>
            <View>
            <Pressable style={styles.lessonButton} onPress={() => {middleware.changePage("Spelling") (dispatch); props.pager(false)}} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text style={styles.text}>Spelling</Text>
            </Pressable>
            </View>
            <View >
            <Pressable style={styles.lessonButton} onPress={() => {middleware.changePage("Grammar") (dispatch); props.pager(false)}}android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text style={styles.text}>Grammar</Text>
            </Pressable>
            </View>
            <View >
            <Pressable style={styles.lessonButton}  onPress={() => {middleware.changePage("Vocabulary") (dispatch); props.pager(false)}} android_ripple={{color: 'rgb(200,200,200)'}}>
                <Text style={styles.text}>Vocabulary</Text>
            </Pressable>
            </View>
        </View>
     );

}
const styles = StyleSheet.create({
    lessonButton:{
        width:100,
        height:50,
        alignContent:'center',
        justifyContent:'center',
        padding:0,

    },
    lessonBar:{
        position:"absolute",
        marginTop:80,
        backgroundColor:'rgb(200,200,200)',



        
    },
    text:{
        marginLeft:10
    }
    
        
        
    })

export default LessonBar;