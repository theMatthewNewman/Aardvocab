import { View, Text, StyleSheet } from "react-native";
import { size } from "../globalStyle";

function Example() {
    return (
        <View style={styles.background}>
            <Text style={styles.text}>You are not currently logged into an account, and you will not be able to save your progress.</Text>
        </View>
     );
}

export default Example;

const styles = StyleSheet.create({
    background:{
        backgroundColor:'red',
        position:'absolute',
        bottom:0,
        padding:size.small,
        width:'100%',
        height:size.largest,
        borderWidth:size.thin
    },
    text:{
        color:'white'
    }
})