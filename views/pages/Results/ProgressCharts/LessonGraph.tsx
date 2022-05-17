import {View, Text, Dimensions, Image, StyleSheet, Button} from "react-native";
import { LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from 'react-native-chart-kit'
import { useSelector } from "../../../../redux/hooks";
import { bucketUsers, genLessons } from "./percentageCalculation";
import { globalStyling } from "../../../componants/globalStyle";




const LessonGraph = () => {

    const averages = useSelector(state => state.averages);
    const user = useSelector(state => state.user);
    let yourIndex = 0;
    const grammarProgress = averages.map((average, index) => {
        if (average.uid === user.uid){
            index = yourIndex
        };
        return(average.grammarLessonProgress)
    })
    let countedNumberOfUsers = bucketUsers(grammarProgress);
    let labels = genLessons(grammarProgress);

    

    return(
        <View > 
        <Text style={globalStyling.head}>Results</Text>
        <View style={styles.graph}>
            <View style={styles.chart}>
            <LineChart
                data={{
                    labels:labels,
                    datasets:[
                        {
                            data:countedNumberOfUsers,

                        }
                    ]
                }}
                width={360}
                bezier
                withHorizontalLines={false}
                withVerticalLines={false}
                height={220}
                fromZero={false}
                getDotColor={(dataPoint, dataPointIndex) => {
                    if(dataPointIndex === yourIndex) 
                    return 'red';
                    else  return 'rgb(1,1,1,0)';
                  }}
                chartConfig={{
                    barPercentage:1,
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => 'cornflowerblue',
                    labelColor: (opacity = 1) => 'black',
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                      },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    borderWidth:3,
                  }}
                  >
            </LineChart>
            
            
            </View>
            <View style={styles.key}>
            <Image style={styles.dot} source={require('../../../../images/userDot.png')}/>
            <Text>Current Lesson</Text>
            </View>
        </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    user:{
        height:20,
        width:20,
    },
    graph:{
        alignItems:'center',
        padding:10,
        paddingTop:15,
        margin:15,
        
        
    },
    side:{
        display:'flex',
        flexDirection:'row',

    },
    chart:{
        display:'flex',
        

    },
    base:{
        alignSelf:'center',
    },
    
    title:{
        display:"flex",
        flexDirection:'row',
    },
    dot:{
        height:20,
        width:20,
        marginRight:10,
    },
    key:{
        display:'flex',
        flexDirection:'row',
    }
})

export default LessonGraph;