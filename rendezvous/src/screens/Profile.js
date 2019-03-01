import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,ScrollView,
  Image,Dimensions,
  TouchableOpacity,ImageBackground
} from 'react-native';
import Colors from '../Constant/Colors';
import { connect } from 'react-redux';
import {AsyncStorage,Switch} from 'react-native';
import {ListItem} from 'react-native-elements';
import {LinearGradient} from 'expo'
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';
const {height,width} =Dimensions.get('window')
 class Profile extends Component {

  constructor(props){

    super(props)
    this.state={
      switch:true
    }

  }

    phoneVerified =()=>{
      let text='';
      let iconName='';
      let color=null;

      if(this.props.profile.confirmed){
         text='phone verified ('+this.props.profile.phone+')';
          iconName='check-circle';
          color=Colors.green;


      }else{
         text='Confirm your phone number';
          iconName='question-circle';
          color=Colors.darkBlue;


      }
        let disabled=false;
        let textColor=Colors.darkGrey;
        return(
            <ListItem
            title={text}
            disabled={disabled}
            leftIcon={
                <FontAwesome
                name={iconName}
                color={color}
                size={22}
                />
            }
            containerStyle={
                    {marginTop:10,height:35,marginLeft:10,marginRight:10,backgroundColor:Colors.white,borderRadius:50}
            }
            titleStyle={{color:color,marginTop:3,color:color,fontSize:13}}
                
            onPress={()=>{
                this.props.navigation.navigate('PhoneVerification',{profile:this.props.profile});
            }}
            />
            
        );

    }

  render() {
    return (
      <ScrollView style={styles.container}>
           
           <ImageBackground source={require('../../assets/profile.jpg')} style={styles.imageBack}>
    
        <LinearGradient colors={["#669df0aa","#669df0aa","#669df0aa"]} style={styles.linearGradient}>
    
              
            </LinearGradient>            
           
            </ImageBackground>

        <View style={{
          
         width:width-50,
         borderRadius:10,
         shadowColor:'#aaa',
         shadowOpacity:.2,
         shadowOffset:{width:0,height:2},
         elevation:4,
         alignSelf:'center',
         marginTop:-60,
         backgroundColor:Colors.white
          ,marginBottom:10
        }}>     
          
               <Image style={styles.avatar} source={{uri: this.props.profile.photoURL}}/>

          <Text style={styles.name}>{this.props.profile.displayName}</Text>

          {this.phoneVerified()}   
         <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
         
         <Switch
          style={{alignSelf:'center'}}
          onValueChange={()=>{
            this.setState({switch:false })
          }}
          thumbColor={Colors.darkBlue}
          value={this.state.switch}
        />
                        <Text style={{color:Colors.darkBlue,alignSelf:'center'}}>العربية</Text> 
         </View>

          <TouchableOpacity style={styles.buttonContainer}
              
              onPress={()=>{
                  AsyncStorage.removeItem('token');
                  this.props.navigation.navigate('Auth')
              }}
              >
                <Text style={{color:Colors.white}}>Log out</Text> 
              </TouchableOpacity>
              </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
       flex:1,
        backgroundColor:Colors.white,
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
  imageBack:{
        
    height:height/2-50,

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

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "white",
    alignSelf:'center',
    marginTop:-30
  },
  name:{
    fontSize:18,
    color:Colors.darkGrey,
    alignSelf:'center',
    textAlign:'center'
    ,marginTop:10,
    

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
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:150,
    borderRadius:30,
    backgroundColor: Colors.green,
    alignSelf:'center',
    marginBottom:15

  },
});
 
const mapStateToProps=({auth})=>{

    return{
    loading :auth.loading,
    profile:auth.profile,
    token:auth.token
};
};

export default connect(mapStateToProps) ( Profile); 
