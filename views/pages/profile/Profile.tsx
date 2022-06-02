import { View, Image, Text, TextInput, StyleSheet } from "react-native";
import {useSelector} from "../../../redux/hooks";
import Button from "../../componants/Buttons/Button"
import {auth} from "../../../firebase.config";
import {useDispatch} from "../../../redux/hooks";
import { useState } from "react";
import {userAction} from "../../../redux/user";
import {color, globalStyling, size} from "../../componants/globalStyle";
import { lessonAction } from "../../../redux/lessons";


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
            <View style={ProfileStyles.back}>
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
                        style="Choice"
                        title="Edit Picture"/>

                <Button onPress={() => {handleEditNameButton()}}
                        style="Choice"
                        title="Edit Name"/>

                <Button onPress={() => {lessonAction.deactivateLesson() (dispatch);auth.signOut()}}
                        style="Choice"
                        title="Log Out"/>
            </View>
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
        color:'red',
    },
    pic:{
        height:size.giant,
        width:size.giant,
        resizeMode:"contain",
        alignSelf:'center'
    },
    info:{
        backgroundColor:'white',
        display:"flex",
        flexDirection:'column',
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
        fontSize:size.large,
        paddingVertical:size.smallest,
        marginBottom:size.medium,
        textAlign:'center',
        color:'cornflowerblue'
    },
    about:{
        padding:size.small,
        
    },
    back:{
        backgroundColor:color.darkBlue,
        margin:size.small,
        borderRadius:size.curve,
    }
})