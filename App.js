import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons'
import { AntDesign } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeScreen = ({ navigation }) => {
  const [isStarted,setIsStarted] = useState(false)

  const [isBreakTime,setIsBreakTime] = useState(false)

  const [minutes,setMinutes] = useState(25)
  const [seconds,setSeconds] = useState(3)
  const [breaks,setBreaks] = useState(5)
  const [breakMinutes,setBreakMinutes] = useState(5)

  const [openModal,setOpenModal] = useState(false)

  const[secondsTimer,setSecondsTimer] = useState(seconds)
  const[minutesTimer,setMinutesTimer] = useState(minutes)

  useEffect(()=>{
    
    let countdown = null
    if(isStarted) {
      countdown = setInterval(()=>{

        if(isBreakTime === true) {
          setSecondsTimer(seconds)
          setMinutesTimer(breakMinutes)
          if(minutes >= 0 && seconds >= 0) {
            setSeconds(seconds => seconds -1)
          }
          else if(minutes >= 0 && seconds === 0) {
            setMinutes(minutes => minutes - 1)
            setSeconds(0)
          }
          else {
            setIsStarted(false)
            setIsBreakTime(false)
            setMinutesTimer(minutes)
          }
        }


        else {
          setSecondsTimer(seconds)
          setMinutesTimer(minutes)
          if(seconds === 0 && minutes >= 0) {
            setSeconds(59)
            setMinutes(minutes => minutes - 1)
          }
          else if(seconds !== 0 && minutes >=0 ) {
            setSeconds(seconds => seconds - 1)
            setIsBreakTime(false)
          }
          else if(seconds === 0 && minutes === 0) {
            
            setMinutes(breakMinutes)
            setIsStarted(true)
            setIsBreakTime(true)
            setBreaks(breaks => breaks - 1)
            timingBreak()
           
          }
          else {
            isStarted(false)
            setMinutes(minutes)
            setSeconds(0)
            isBreakTime(false)
          }
        }
      },1000)
    }

    else {
      clearInterval(countdown)
    }

    return ()=> {clearInterval(countdown)}   
  },[seconds,minutes,isStarted])

  function timingBreak() {
    setMinutes(breakMinutes)
    isBreakTime(true)
  }

  function handleToggleStart() {
    setIsStarted(!isStarted)
  }

  function reset() {
    setMinutes(minutes)
    setSeconds(seconds)
    setBreakMinutes(breakMinutes)
    setBreaks(breaks)
    setIsStarted(false)
    isBreakTime(false)
  }

  return (
    <View >
      <View style={styles.container}>
        
        <Modal 
        animationType="slide"
        visible={openModal}
        transparent={true}
        >
          <View style={[styles.container,styles.modal]}>
          <View style={[styles.modalHeader]}>
            <Text style={[styles.text,styles.modalTextHeader]}>Configure your Pomodoro Clock</Text>
            <Pressable onPress={()=>{setOpenModal(false)}}><AntDesign name="close" size={20} color="white"/></Pressable>
          </View>
          <View>
            
            <View style={[styles.modalContainerConfig]} >
              <Text style={[styles.text,styles.modalText]}>Time</Text>
              
              <View style={[styles.modalOptionContainer]} >
                <Pressable 
                style={minutes === 20? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setMinutes(20)}}
                ><Text style={[styles.text,styles.modalTextConfig]}>20</Text>
                </Pressable>

                <Pressable 
                style={minutes === 25? styles.modalPreesableSelected : styles.modalPreesable}
                onPress={()=>{setMinutes(25)}}>
                  <Text style={[styles.text,styles.modalTextConfig]}>25</Text>
                </Pressable>

                <Pressable 
                style={minutes === 30? styles.modalPreesableSelected : styles.modalPreesable}
                onPress={()=>{setMinutes(30)}}>
                  <Text style={[styles.text,styles.modalTextConfig]}>30</Text>
                </Pressable>

                <Pressable 
                style={minutes === 45? styles.modalPreesableSelected : styles.modalPreesable}
                onPress={()=>{setMinutes(45)}}>
                  <Text style={[styles.text,styles.modalTextConfig]}>45</Text>
                </Pressable>

              </View>
            </View>


            <View style={[styles.modalContainerConfig]}>
              <Text style={[styles.text,styles.modalText]}>Breaks</Text>
              <View style={[styles.modalOptionContainer]}>
                
                <Pressable 
                style={breaks === 1? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreaks(1)}} 
                >
                <Text style={[styles.text,styles.modalTextConfig]}>1</Text>
                </Pressable>
                
                <Pressable 
                style={breaks === 2? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreaks(2)}}>
                  <Text style={[styles.text,styles.modalTextConfig]}>2</Text>
                </Pressable>
                
                <Pressable 
                style={breaks === 3? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreaks(3)}}>
                  <Text style={[styles.text,styles.modalTextConfig]}>3</Text>
                </Pressable>
                
                <Pressable 
                style={breaks === 5? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreaks(5)}}
                >
                  <Text style={[styles.text,styles.modalTextConfig]}>5</Text>
                </Pressable>
              </View>
            </View>

            <View style={[styles.modalContainerConfig]}>
              <Text style={[styles.text,styles.modalText]}>Break Time</Text>
              <View style={[styles.modalOptionContainer]}>

                <Pressable 
                style={breakMinutes === 1? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreakMinutes(1)}} ><Text style={[styles.text,styles.modalTextConfig]}
                >1</Text>
                </Pressable>

                <Pressable 
                style={breakMinutes === 5? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreakMinutes(5)}}
                ><Text style={[styles.text,styles.modalTextConfig]}>5</Text>
                </Pressable>

                <Pressable 
                style={breakMinutes === 10? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreakMinutes(10)}}
                ><Text style={[styles.text,styles.modalTextConfig]}>10</Text>
                </Pressable>

                <Pressable 
                style={breakMinutes === 15? styles.modalPreesableSelected : styles.modalPreesable} 
                onPress={()=>{setBreakMinutes(15)}}
                ><Text style={[styles.text,styles.modalTextConfig]}>15</Text>
                </Pressable>

              </View>
            </View>

            </View>
          </View>
        </Modal>
        <View>
        <Text 
        style={[styles.text]}
        >Pomodoro App</Text>
      </View>
      <View>
        <Text  style={[styles.text,{textAlign:"center",fontSize:18}]}>{isBreakTime === false? 'Current': 'Breaking Time'}</Text>
        <Text 
        style={[styles.text,styles.textTimer]}
        >{minutesTimer > 9?minutesTimer:'0'+minutesTimer}:{secondsTimer > 9 ? secondsTimer:'0'+secondsTimer}</Text>
        <Text  style={[styles.text,{textAlign:"center",fontSize:18}]}>Breaks:{breaks}</Text>
      </View>
      <View  style={styles.containerButtons}>
        <Pressable 
        onPress={handleToggleStart}
        >
          <Text 
          style={[styles.text,styles.buttonsText]}
          >{isStarted === true?'stop':'start'}</Text></Pressable>
        <Pressable
        >
          <Text 
          style={[styles.text,styles.buttonsText]}
          >Reset
          </Text>
        </Pressable>
        <Pressable>
          <Text><Ionicons name="options" size={24} color="white"  onPress={()=>{setOpenModal(true)}}/></Text>
        </Pressable>
        
      </View>
    </View>
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent:'space-between'
  },
  modal: {
    display: "flex",
    justifyContent: "flex-start"
  },
  modalHeader:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center"
  },
  modalTextHeader: {
    textAlign:"center",
    fontSize:25,
    fontWeight:"700",
    marginTop:10
  },
  modalText :{
    fontSize:28,
    textAlign:"center",
    fontWeight:"700"
  },
  modalContainerConfig: {
    backgroundColor: '#505050',
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    textAlign:"center",
    width: "90%",
    marginHorizontal: 20,
    marginTop:30,
    padding: 5
  },
  modalTextConfig: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center"
  },
  modalOptionContainer: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "space-around"
  },  
  modalPreesable : {
    backgroundColor:"#5800FF",
    borderRadius: 10,
    padding: 5,
    width: 80,
    marginVertical: 15
  },
  modalPreesableSelected: {
    backgroundColor: "#5800AA",
    borderRadius: 10,
    padding: 5,
    width: 80,
    marginVertical: 15
  },
  text:{
    color:'#fff'
  },
  textTile:{
    fontSize: 35,
    textAlign: 'center',
    fontWeight:'900',
    marginTop:15
  },
  textTimer : {
    fontSize:55,
    fontWeight:'900',
    textAlign:'center',
    color:'#5800FF'
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  buttons: {
    height: '100%',
    padding: 4,
    width: '40%',
    borderRadius:9
  },
  buttonsText: {
    color: '#fff',
    textTransform:'uppercase',
    letterSpacing:2,
    fontWeight: '700'
  }
});
