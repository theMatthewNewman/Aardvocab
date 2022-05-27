import { View, Image, Text, TextInput, StyleSheet } from "react-native";
import {useSelector} from "../../../redux/hooks";
import Button from "../../componants/Buttons/Button"
import {auth} from "../../../firebase.config";
import {useDispatch} from "../../../redux/hooks";
import { useState } from "react";
import {userAction} from "../../../redux/user";
import {globalStyling, size} from "../../componants/globalStyle";


function Profile() {
    const [editName, setEditName] = useState(false);
    const user = useSelector(state => state.user);
    const [displayName, setDisplayName] = useState(user.displayName);
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);

    const nameChange = (event:any) => {
        setDisplayName(event);
    }

    const nameSubmit = () => {
        if (displayName.length <= 20) {
            userAction.updateUser({...user, displayName}) (dispatch); 
            setEditName(false);
        }
        else {
            setDisplayName(user.displayName);
            setEditName(false);
            setActive(true);
        }
        
    }
    const handleEditNameButton = () => {
        
        if (editName) {
            nameSubmit();
        } else {
            setEditName(!editName);
        }
    }
    
    return ( 
        <>
        <Text style={globalStyling.head}>Profile</Text>
            <View style={ProfileStyles.info}>
                <Image style={ProfileStyles.pic} source={{uri: user.photoURL }}/>
                <View style={ProfileStyles.about}>
                    {editName? 
                        <TextInput 
                        style={ProfileStyles.input}
                        onChangeText={(event) => {nameChange(event)}}
                        onSubmitEditing = {nameSubmit}/> :

                        <Text style={ProfileStyles.userName}>{displayName}</Text>
                    }
                    <Text style={ProfileStyles.date}>
                        {`Created: ${new Date(user.createdAt).toDateString()}`}
                    </Text>
                </View>

            </View>

            <View style={ProfileStyles.buttons}>
                <Button onPress={() => userAction.changeProfilePicture(user) (dispatch)}
                        style="Strong"
                        title="Edit Picture"/>

                <Button onPress={() => {handleEditNameButton()}}
                        style="Strong"
                        title="Change Name"/>

                <Button onPress={() => auth.signOut()}
                        style="Strong"
                        title="Log Out"/>
            </View>
        </> 
    );
}

export default Profile;

const ProfileStyles = StyleSheet.create({
    input:{ 
        backgroundColor:"white",
        borderRadius:size.smallest,
        fontSize:size.medium,
        paddingHorizontal:size.small,
        paddingVertical:size.smallest,
        marginBottom:size.medium,
        borderWidth:size.thin,
    },
    date:{
        textAlign:'center',
    },
    pic:{
        height:size.huge,
        width:size.huge,
        resizeMode:"contain",
    },
    info:{
        backgroundColor:'white',
        display:"flex",
        flexDirection:'row',
        margin:size.medium,
        padding:size.medium,
        borderRadius:size.small,
        borderWidth:size.thin,
    },
    buttons:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    userName:{
        fontSize:size.medium,
        paddingVertical:size.smallest,
        marginBottom:size.medium,
        textAlign:'center',
    },
    about:{
        paddingHorizontal:size.small,
        flex:1,
        
    }
})