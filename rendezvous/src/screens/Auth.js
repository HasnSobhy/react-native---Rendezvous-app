import React, { Component } from 'react';
import { Text, StyleSheet, View,ImageBackground,Image,TextInput } from 'react-native';
import { LinearGradient } from 'expo';
import {  } from 'react-native-elements';
import Colors from '../Constant/Colors';
import {loginFacebook} from '../actions'
import Button from '../common/Button';
import { connect } from 'react-redux';
import { YellowBox } from 'react-native';
import {AsyncStorage} from 'react-native';

 class AuthClass  extends Component {

   

    constructor(props){
        super(props);
        
        this.state={
        }
    }

   async facebookLogin (){
    YellowBox.ignoreWarnings(['Setting a timer']);
    this.props.loginFacebook()
    
    }

    componentWillReceiveProps(nextProp){
        if(nextProp.token){
            this.props.navigation.navigate('Tab');
        }
    }

    render() {
        return (

        <View style={styles.mainView}>

        <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBack}>
            <LinearGradient colors={['#00000011','#00000077','#000000dd']} style={styles.linearGradient}>

            <Image style={{width:90,height:90}} source={require("../../assets/logo.png")}></Image>
            <View style={styles.headerView}>
            <Text style={styles.headerText}>Rendezvous</Text>
            <Text style={styles.decsText}>Organize your meetings today!!</Text>
          

           <Button 
           textTitle='Continue with Facebook'
           backgroundColor={Colors.facebook}
           color={Colors.white}
            borderRadius={40}
            marginTop={30}
            width={200}
            height={35}
            elevation={2}
            onPress={()=>{
            }}
           onPress={ 
                 this.facebookLogin.bind(this)
           }
           loading={this.props.loading}
           />
          
            </View>

                </LinearGradient>            
           </ImageBackground>
         </View>
        );
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
          fontSize:18,
          fontWeight:'bold'
         ,marginTop:15,
          alignSelf:'center'

      },decsText:{
        color:Colors.white,
        fontSize:14,
        marginRight:50         
        ,marginLeft:50,
        marginTop:7,
        alignSelf:'center'

      },
      login:{
        
      }
});

const mapStateToProps=({auth})=>{

    return{
    loading :auth.loading,
    profile:auth.profile,
    token:auth.token
};
};

export default connect(mapStateToProps,{loginFacebook}) (AuthClass)