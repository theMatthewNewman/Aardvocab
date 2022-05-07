import {View, Text, Dimensions, Image, StyleSheet, Button} from "react-native";
import { LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from 'react-native-chart-kit'
import { useSelector } from "../../../logic/store";
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
                <View style={styles.side}>
                    
                </View>
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
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                fromZero={true}
                getDotColor={(dataPoint, dataPointIndex) => {
                    if(dataPointIndex === yourIndex) 
                    return 'coral';// red
                    else  return '#aeafb7';// green
                  }}
                chartConfig={{
                    
                    barPercentage:1,
                    backgroundColor: "#3c427c",
                    backgroundGradientFrom: "#4e559f",
                    backgroundGradientTo: "#3c427c",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 20
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                      },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    shadowColor: 'black',
                    elevation: 50,
                  }}
                  >

            </LineChart>
            
            
            </View>
            <View style={styles.key}>
            <Image style={styles.dot} source={require('../../../images/userDot.png')}/>
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
    head:{
        marginTop:20,
        alignSelf:'center',
        padding:10,
        color:'#3c427c',
        borderWidth:2,
        backgroundColor:'lightgray',
        borderRadius:5,
        shadowColor: 'black',
        elevation: 20,
        fontSize:20,
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