import { Text, View } from "react-native";
import { leaderStyles } from "../profile/LeaderBoard";

function Connections() {
    return ( 
        <View style={leaderStyles.all}>
            <Text style={leaderStyles.head}>Connections</Text>
        </View>
     );
}

export default Connections;