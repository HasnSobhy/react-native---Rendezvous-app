import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,TouchableOpacity,Alert,Dimensions
} from 'react-native';
import Colors from '../Constant/Colors';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';
import {ListItem} from 'react-native-elements';
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';
import {MKTextField,MKButton} from 'react-native-material-kit';
import axios from 'axios';
import Input from '../common/Input';
import {refreshProfile} from '../actions'
const {height,width}=Dimensions.get('window')

 class ConfirmPhone extends Component {

    constructor() {
        super();
    
        this.state = {
            verifying:false,
            value:'',
            loading:false,
            disabled:false
            
        };
       
      }

    
    verifyCode =async()=>{
        const url ='https://us-central1-rendezvous-3a2d8.cloudfunctions.net/verifyCode';
        const profile=this.props.navigation.getParam('profile');
        const code=this.state.value;

        try{
            const{data}= await axios.post(url,{uid:profile.uid,code});
             
            if(data.success){
             this.props.navigation.navigate('Profile');
             this.props.refreshProfile(profile.uid);
            }else{
               // Alert.alert('Code is invalid')
            }
         }
         catch(er){
           //  Alert.alert(String( er));
     
         }
    }

  render() {

    const {value}=this.state;
    const disabled= !value;

    return (
      <View style={styles.container}>

      <Text style={styles.name}>What `s your verification code ?</Text>

            <Input
            placeholder='Enter verification code'
            placeholderTextColor={Colors.grey}
            autoCorrect={false}
            autoCapitalize='sentences'
            textContentType='telephoneNumber'
            borderColor={Colors.grey}
            borderBottomWidth={1}
            marginHorizontal ={40}
            alignSelf='flex-start'
            color={Colors.darkGrey}
            marginTop={20}
            secureTextEntry={false}
            color={Colors.darkBlue}
            iconName='phone'
            onChangeText={(value)=>{
                this.setState({value});
            }}
            />


       <TouchableOpacity style={styles.buttonContainer}
              disabled={disabled}
              onPress={this.verifyCode}
              >
                <Text style={{color:Colors.white}}>Verify code</Text> 

        </TouchableOpacity>

        <Text onPress={()=>{
          this.props.navigate.goBack();
        }} 
        style={styles.description}>Enter the wrong number need a new code </Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.lightGrey,
        alignItems:'center',
        paddingTop:20
    },
  header:{
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 370,
    borderTopWidth: 370,
    borderRightColor: 'transparent',
    borderTopColor: Colors.darkBlue
  },
 
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "white",
    alignSelf:'center',
    marginTop:80
  },
  name:{
    marginTop:20,
    fontSize:16,
    color:Colors.darkGrey,
    alignSelf:'center',
    textAlign:'center'

  },
  body:{
    alignSelf:'center',
    marginTop:10

  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
  },

  info:{
    fontSize:16,
    color: Colors.darkBlue,
    marginTop:10
  },
  description:{
    fontSize:13,
    color: Colors.darkGrey,
    marginTop:10,
    width:width- 95
  },
  buttonContainer: {
    marginTop:30,
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    width:width- 95
,    backgroundColor: Colors.darkBlue,
    alignSelf:'center',

  },
});
 
const mapStateToProps=({auth})=>{

    return{
    loading :auth.loading,
    profile:auth.profile,
    token:auth.token
};
};

export default connect(mapStateToProps,{refreshProfile}) ( ConfirmPhone); 
