import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "../../../redux/hooks";
import { pageState } from "../../../redux/pages";
import { userState } from "../../../redux/user";
import Buttons from "../../componants/Buttons/Button";
import { color, size } from "../../componants/globalStyle";
import Chat from "../Chat/Chat";
import {ProfileStyles}from "../profile/Profile";
import AccuracyGraph from "../Results/graphs/AccuracyGraph";
import DaysGraph from "../Results/graphs/DaysGraph";
import LessonGraph from "../Results/graphs/LessonGraph";


function OtherProfile() {
    const user = useSelector(state => state.page.otherUser)

    return ( 
        <ScrollView>
            {user.active?
            <>
                <View style={ProfileStyles.back}>
                    <View style={ProfileStyles.info}>
                        <Image style={ProfileStyles.pic} source={{uri: user.photoURL }}/>
                        <View style={ProfileStyles.about}>
                            <Text style={ProfileStyles.userName}>{user.displayName}</Text>
                            <Text style={ProfileStyles.date}>
                                {`Created: ${new Date(user.createdAt).toDateString()}`}
                            </Text>
                        </View>

                    </View>
                </View>
                <AccuracyGraph user={user}/>
                <DaysGraph user={user}/>
                <View style={otherUserStyles.total}>
                    <Text style={otherUserStyles.title}>Total xp gain:</Text>
                    <Text style={otherUserStyles.xp}>{user.level*15}xp</Text>
                </View>
                
                <Buttons onPress={() => {}} title="Send message" style="Strong"/>
                <Buttons onPress={() => {}} title="Report user for inappropriate content." style="Strong"/>

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
    }
})