import { View, Image, Text, TextInput } from "react-native";
import {useSelector} from "../../logic/store";
import Button from "../../componants/Buttons/Button"
import { ProfileStyles } from "./ProfileStyles";
import {auth} from "../../firebase.config";

import {useDispatch} from "../../logic/store";
import * as Umiddleware from "../../logic/userHandler/middleware";
import { useState } from "react";
import Message from "../../componants/Alert/Message";


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
            Umiddleware.saveChanges({...user, displayName}) (dispatch); 
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
                <Image style={ProfileStyles.pic} source={{uri: user.photoUrl }}/>
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
                <Button onPress={() => Umiddleware.changeProfilePicture(user) (dispatch)}
                        style="Strong"
                        title="Edit Picture"/>

                <Button onPress={() => {handleEditNameButton()}}
                        style="Strong"
                        title="Change Name"/>

                <Button onPress={() => auth.signOut()}
                        style="Strong"
                        title="Log Out"/>
            </View>
            <Message active={active} setActive={setActive} type="Wrong" message="Invalid UserName"/>
        </> 
    );
}

export default Profile;