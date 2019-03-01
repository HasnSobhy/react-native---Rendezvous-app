import React, { Component } from 'react';
import { Text, StyleSheet, View,Image,ImageBackground ,Animated} from 'react-native';
import { LinearGradient,Svg ,Permissions} from 'expo';
import { Button } from 'react-native-elements';
import Colors from '../Constant/Colors';
import Logo from '../common/Logo'
import ActvityIndicator from '../common/ActivityIndicator'
import {AsyncStorage} from 'react-native';
export default class  extends Component {

    async checkUserSignedIn(){
        let context = this;
        try {
           let value = await AsyncStorage.getItem('token');
           if (value != null){
            this.props.navigation.navigate('Tab');

        }
           else {
            this.props.navigation.navigate('Auth');

          }
        } catch (error) {
          // Error retrieving data
        }
    }

    constructor(props){
        super(props);
         Permissions.askAsync(Permissions.LOCATION);
        this.state={
            defualt:1,
            animated:new Animated.Value(0),
            animated2:new Animated.Value(0)
        }
    }
    
    
    render() {

        const OpacityStyle={
            opacity:this.state.animated
        }
        const OpacityStyle2={
            opacity:this.state.animated2
        }

        return (

        <View style={styles.mainView}>
        <ImageBackground source={require('../../assets/intro.jpg')} style={styles.imageBack}>
        <LinearGradient colors={["#669df0bb","#669df0bb","#bc37d7bb"]} style={styles.linearGradient}>
       

            <Animated.View style={[OpacityStyle,styles.headerView]}>

            <Image style={{width:90,height:90}} source={require("../../assets/logo.png")}></Image>
            
            </Animated.View>

            <Animated.View style={[styles.headerView,OpacityStyle2]}>
            
            <Text style={styles.headerText}>Rendezvous</Text>
            <Text style={{ color:Colors.white,fontSize:9,
            fontSize:16,alignContent:'center',alignSelf:'center'}}>Say hello!!       
            </Text>
            <ActvityIndicator
            size='large'
            color={Colors.white}
            ></ActvityIndicator>
            </Animated.View>

         </LinearGradient>            
           </ImageBackground>
         </View>
        );
    }

    
    componentDidMount(){

        Animated.timing(new Animated.Value(1),{
            toValue:1,
            duration:500
        }).start(()=>{
            Animated.timing(this.state.animated,{
                toValue:1,
                duration:700
            }).start(()=>{
                Animated.timing(this.state.animated2,{
                    toValue:1,
                    duration:700
                }).start(()=>{
                    Animated.timing(new Animated.Value(1),{
                        toValue:1,
                        duration:700
                    }).start(()=>{

                       this.checkUserSignedIn();
                        

                    })
                });
            });
        });

    }
}

const styles = StyleSheet.create({
    mainView:{
        flex:1
    },
    imageBack:{
        flex:1
    }
    ,
    linearGradient: {
        flex:1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center'
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
      headerView:{
        
        justifyContent:'center',
        alignItems:'center'
      },
      headerText:{
          color:Colors.white,
          fontSize:14,
          fontWeight:'bold',
          alignSelf:'center',
          marginTop:10
      },decsText:{
        color:Colors.white,
        fontSize:14,
        marginRight:60         
        ,marginLeft:10

      },
      login:{
        
      }
});