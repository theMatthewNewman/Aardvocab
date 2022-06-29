import { Text, View, Image } from "react-native";
import { useSelector } from "../../../redux/hooks";
import { pageState } from "../../../redux/pages";
import { userState } from "../../../redux/user";
import Buttons from "../../componants/Buttons/Button";
import Chat from "../Chat/Chat";
import {ProfileStyles}from "../profile/Profile";


function OtherProfile() {
    const user = useSelector(state => state.page.otherUser)

    return ( 
        <View>
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
                <Text>Total Lesson Progress {user.level}</Text>
                <Buttons onPress={() => {}} title="Send message" style="Strong"/>
                <Buttons onPress={() => {}} title="Report user for inappropriate content." style="Strong"/>

            </>
            :null}
            
        </View>
     );
}

export default OtherProfile;