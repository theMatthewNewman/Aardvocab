import {View, Dimensions, Text, StyleSheet, Image} from "react-native";
import {chartConfig} from '../../../../redux/graphs';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useSelector} from '../../../../redux/hooks'

function DaysGraph() {
    const user = useSelector(state => state.user)
    
    const markedDates:any = Object.assign({}, ...user.daysPracticed.map(day => {return({
      [new Date(day).toISOString().substring(0,10)]:{selected:true, selectedColor:'cornflowerblue'}
    })}))
    return ( 
        <View style={styles.backdrop}>
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
            style={styles.cal}
          />
          <View style={styles.key}>
            <Image style={styles.dot} source={require('../../../../images/dayDot.png')}/>
            <Text style={styles.note}>Days Practiced</Text>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
  cal:{
    borderWidth:2,
    minWidth:350,
    borderRadius:16,
    padding:5,
  },
  backdrop:{
    padding:10,
    margin:10,
    alignItems:'center',
    backgroundColor:"#3c427c",
    borderRadius:16,
  },
  dot:{
    height:20,
    width:20,
    marginRight:10,
},
key:{
    display:'flex',
    flexDirection:'row',
    marginVertical:5
},
note:{
    color:"white",
    fontSize:15,
}
})

export default DaysGraph;