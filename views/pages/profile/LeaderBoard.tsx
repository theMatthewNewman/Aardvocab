import { StyleSheet, Text } from "react-native";
import { size } from "../../componants/globalStyle";

function LeaderBoard() {
    return ( 
        <Text style={styles.title}>LeaderBoard</Text>
     );
}

export default LeaderBoard;

const styles=StyleSheet.create({
    title:{
        fontSize:size.huge
    }
})