import {View, Text, StyleSheet, Image} from "react-native";
import {Calendar} from 'react-native-calendars';
import {useSelector} from '../../../../redux/hooks';
import { userState } from "../../../../redux/user";
import {size} from "../../../componants/globalStyle";

type props = {
  user:userState
}

function DaysGraph({user}:props) {
    
    const markedDates:any = Object.assign({}, ...user.daysPracticed.map((day:any) => {return({
      [new Date(day*1000).toISOString().substring(0,10)]:{selected:true, selectedColor:'cornflowerblue'}
    })}))
    return ( 
        <View style={dayStyles.backdrop}>
          <Calendar
            markedDates={markedDates}
            hideArrows={true}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={true}
            disableArrowLeft={true}
            disableArrowRight={true}
            disableAllTouchEventsForDisabledDays={true}
            style={dayStyles.cal}
          />
          <View style={dayStyles.key}>
            <Image style={dayStyles.dot} source={require('../../../../images/dayDot.png')}/>
            <Text style={dayStyles.note}>Days Practiced</Text>
          </View>
        </View>
     );
}

export const dayStyles = StyleSheet.create({
  cal:{
    borderWidth:size.Wthin,
    width:size.Wlargester,
    borderRadius:size.curve,
    padding:size.Wsmaller,
  },
  backdrop:{

    alignItems:'center',
    backgroundColor:"#3c427c",
    margin:size.Wsmaller,
    padding:size.Wsmaller,
    borderRadius:size.curve
  },
  dot:{
      height:size.medium,
      width:size.medium,
      resizeMode:'contain',
      marginTop:size.smallest,
      marginHorizontal:size.smaller
  },
  key:{
      display:'flex',
      flexDirection:'row',
  },
  note:{
      color:"white",
      fontSize:size.medium,
  }
})

export default DaysGraph;