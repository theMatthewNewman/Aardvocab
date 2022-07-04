import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "../../../redux/hooks";
import { leaderStyles } from "../profile/LeaderBoard";
import {userMessage} from "../../../redux/data"
import Buttons from "../../componants/Buttons/Button";
import { actions } from "../../../redux/lessons";

type props = {
    action:any
}

function Connections(props:props) {
    const messages = useSelector(state => state.graph.messages)
    const [connections, setConnections] = useState<any>([])

    useEffect(() => {setConnections(loadConnections());console.log(connections)},[])

    const loadConnections = () => {
        if (messages.active){
            const connecctions = messages.messages.map((message) => {
                return({
                    uid:message.uid,
                    displayName:message.displayName,
                    photoURL:message.photoURL,
                    sent:message.sent
                })
            }).filter((message, index)=> {
                if (message.sent){
                    return(false)
                }
                return(true)
            })
            const uniqueConnection = connecctions.filter((message, index) => {
                return connecctions.indexOf(message) === index;
            })
            return(uniqueConnection)
        }
        return[]
    }

    
    return ( 
        <View style={leaderStyles.all}>
            <Text style={leaderStyles.head}>Connections</Text>
            {connections.map((user:userMessage, index:number) => 
                <View key={index} style={leaderStyles.board}>
                    <View style={leaderStyles.user}>
                        <Image source={{uri:user.photoURL}} style={leaderStyles.image}/>
                        <Text style={leaderStyles.name}>{user.displayName}</Text>
                        <View style={leaderStyles.button}>
                            <Buttons style="Strong" onPress={() => {props.action(user)}} title='Send Message'/>
                        </View>
                    </View>
                    
                </View>
            )}
        </View>
     );
}

export default Connections;