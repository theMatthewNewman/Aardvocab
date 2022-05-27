import {View, Image, StyleSheet} from "react-native"
import {useDispatch, useSelector} from "../../../../../redux/hooks";
import {size} from "../../../../componants/globalStyle";



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
        width:size.large,
        height:size.large,
        marginRight:size.small,
    },
    heartBar:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        width:"100%",
        marginTop:size.medium,
    }
})
export default Hearts;