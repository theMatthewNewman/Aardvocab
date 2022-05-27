import { StyleSheet, View, Image} from "react-native";
import Buttons from "../Buttons/Button";

import { useSelector } from "../../../redux/hooks";

import {size} from "../globalStyle";

type navActions = {
  action:any[]
}

function Navbar({action}:navActions) {
    const page = useSelector(state => state.page)


    return ( 
        <>
        <View style={styles.background}>

        <Image style={styles.image} source={require('../../../images/logo.png')} />

            <Buttons onPress={action[0]}
                     style={page.page==="Profile"? "NavSelected":"Nav"}
                     title="Profile"/>

            <Buttons onPress={action[1]}
                     style={page.page==="Results"? "NavSelected":"Nav"}
                     title="Results"/>
            
            <Buttons onPress={action[2]}
                     style={page.page==="Lessons"? "NavSelected":"Nav"}
                     title="Lessons"/>

        </View>
        </>
     );
}
const styles = StyleSheet.create({
    background: {
      flexDirection:"row-reverse",
      backgroundColor: 'white',
      borderBottomWidth:size.thin,

      paddingTop:size.larger,
      paddingBottom:size.smallest,
      width:'100%',
      justifyContent:"space-evenly",
      alignItems:"center",
      
    },
    image: {
        height:size.larger,
        width:size.larger,
        resizeMode:'contain'
    },
  });
  

export default Navbar;