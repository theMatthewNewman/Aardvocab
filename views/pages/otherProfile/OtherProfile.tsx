import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "../../../redux/hooks";
import { pageAction, pageState } from "../../../redux/pages";
import { userAction, userState } from "../../../redux/user";
import Buttons from "../../componants/Buttons/Button";
import { color, size } from "../../componants/globalStyle";
import Chat from "../Chat/Chat";
import {ProfileStyles}from "../profile/Profile";
import AccuracyGraph from "../Results/graphs/AccuracyGraph";
import DaysGraph from "../Results/graphs/DaysGraph";
import LessonGraph from "../Results/graphs/LessonGraph";


function OtherProfile() {
    const otherUser = useSelector(state => state.page.otherUser)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const reportUser = () => {
        if(!otherUser.active){return;}
        if(user.uid==='QZ4DAXWWJcdywxbxoidHphggR4F3'){return;}
        userAction.reportUser(user, otherUser)
    }

    return ( 
        <ScrollView>
            {otherUser.active?
            <>
                <View style={ProfileStyles.back}>
                    <View style={ProfileStyles.info}>
                        <Image style={ProfileStyles.pic} source={{uri: otherUser.photoURL }}/>
                        <View style={ProfileStyles.about}>
                            <Text style={ProfileStyles.userName}>{otherUser.displayName}</Text>
                            <Text style={ProfileStyles.date}>
                                {`Created: ${new Date(otherUser.createdAt).toDateString()}`}
                            </Text>
                        </View>

                    </View>
                </View>
                <AccuracyGraph user={otherUser}/>
                <DaysGraph user={otherUser}/>
                <View style={otherUserStyles.total}>
                    <Text style={otherUserStyles.title}>Total xp gain:</Text>
                    <Text style={otherUserStyles.xp}>{otherUser.level*15}xp</Text>
                </View>
                <View style={otherUserStyles.buttons}>
                    <Buttons onPress={() => {pageAction.changePage('Chat') (dispatch)}} title="Send message" style="Strong"/>
                    <Buttons onPress={reportUser} title="Report user" style="red"/>
                </View>
            </>
            :null}
            
        </ScrollView>
     );
}

export default OtherProfile;

const otherUserStyles = StyleSheet.create({
    total:{
        backgroundColor:color.darkBlue,
        borderRadius:size.curve,
        alignItems:'center',
        margin:size.Wsmaller,
        padding:size.Wsmaller
    },
    xp:{
        backgroundColor:'white',
        width:'100%',
        textAlign:'center',
        fontSize:size.larger,
        marginVertical:size.small,
        color:'purple'
        
    },
    title:{
        color:'white',
        fontSize:size.medium,
        marginBottom:size.small
    },
    buttons:{
        marginBottom:size.largest,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',

    }
})