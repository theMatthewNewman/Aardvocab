import {View, Image, StyleSheet} from "react-native"
import {useDispatch, useSelector} from "../../../../../redux/hooks";
import {userAction} from "../../../../../redux/user";


function Hearts() {
    const hearts = useSelector((state) => state.user.hearts)
    
    const dispatch = useDispatch()

    const getContent = (hearts:number) => {
        var content = []
        for (let i = 0; i < hearts; i++) {
            content.push(<View key={i}><Image style={styles.heart} source={require('../../../../../images/heart.png')}/></View>)
        }
        return content
    }


    return ( 
        <View style={styles.heartBar}>
            {hearts? getContent(hearts):null}
        </View>
     );
}


const styles = StyleSheet.create({
    heart:{
        width:25,
        height:25,
        marginRight:10,
    },
    heartBar:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        width:"100%",
        marginTop:20,
        minHeight:25,
        
        
    }
})
export default Hearts;