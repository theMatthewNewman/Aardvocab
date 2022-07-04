import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { userAction, userState } from "../../../redux/user";
import { globalStyling, headWidth, size } from "../../componants/globalStyle";
import LeaderBoard, { leaderStyles } from "../profile/LeaderBoard";
import Connections from "./Connections";
import Messages from "./Messages";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import Buttons from "../../componants/Buttons/Button";
import { dataAction } from "../../../redux/data";
import { useDispatch, useSelector } from "../../../redux/hooks";

function Chat() {
    const [leadOpen, setLeadOpen] = useState(false)
    const [connectOpen, setConnectOpen] = useState(false)
    const otherUser = useSelector(state => state.page.otherUser)

    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dataAction.updateData(user) (dispatch)
    },[])
    
    const expand = useSharedValue(0)
    const animation = useAnimatedStyle(() => {
        return{
            width:size.fullWidth*expand.value,
            height:size.full*expand.value,
        }
    })
    const handleConnections = () => {
        setConnectOpen(!connectOpen)
        if (leadOpen){
            setLeadOpen(false)
            return;
        }
        

        if (expand.value===0){
            expand.value=withTiming(1)
        } else {
            expand.value=withTiming(0)
        }
        

    }
    const handleLeader = () => {
        setLeadOpen(!leadOpen)
        if (connectOpen){
            setConnectOpen(false)
            return;
        }
        

        if (expand.value===0){
            expand.value=withTiming(1)
        } else {
            expand.value=withTiming(0)
        }
    }
    const handleOtherUser = (event:any) => {
        userAction.setOtherUser(event.uid) (dispatch)
        setLeadOpen(false)
        setConnectOpen(false)
        expand.value=withTiming(0)
    }

    
    return (
        <>
            <Text style={globalStyling.head}>Chat</Text>
            <View style={{ height:'100%', display:'flex',flexDirection:'column-reverse'}}>
                <Messages otherUser={otherUser}/>
                <Animated.View style={[styles.proto,animation]}>
                    <ScrollView style={{paddingTop:size.largest}}>
                    {leadOpen?<LeaderBoard type="Send message" action={handleOtherUser}/>:null}
                    {connectOpen?<Connections action={handleOtherUser}/>:null}
                    </ScrollView>
                </Animated.View>
                <View style={{alignSelf:'center',display:'flex', flexDirection:'row',justifyContent:'space-evenly', backgroundColor:'lightgrey',borderWidth:size.thin,width:size.fullWidth}}>
                    <Buttons style="Strong" onPress={handleConnections} title="Connections"/>
                    <Buttons style="Strong" onPress={handleLeader} title="Leader Board"/>
                </View>
            </View>
        </>
    );
};

export default Chat;

const styles = StyleSheet.create({
    title:{
        fontSize:size.huge
    },
    leader:{
        position:'absolute'
    },
    connections:{
        position:'absolute',
        right:0
        
    },
    proto:{
        backgroundColor:'white',
        position:'absolute',
        top:0,
        
    }
})