import { View, Image, Text, TextInput } from "react-native";
import {useSelector} from "../../../redux/hooks";
import Button from "../../componants/Buttons/Button"
import { ProfileStyles } from "./ProfileStyles";
import {auth} from "../../../firebase.config";

import {useDispatch} from "../../../redux/hooks";

import { useState } from "react";

import {userAction} from "../../../redux/user";


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
                        {`Created: ${new Date(user.createdAt.seconds*1000).toDateString()}`}
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