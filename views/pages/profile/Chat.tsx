import { StyleSheet, Text } from "react-native";
import { size } from "../../componants/globalStyle";

function Chat() {
    return (
        <Text style={styles.title}>
            chat
        </Text>
    );
}

export default Chat;

const styles = StyleSheet.create({
    title:{
        fontSize:size.huge
    }
})