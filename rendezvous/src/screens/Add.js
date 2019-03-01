import React, { Component } from 'react';
import { Text, StyleSheet,Dimensions, TouchableOpacity,View,ImageBackground,ScrollView,TextInput } from 'react-native';
import { LinearGradient } from 'expo';
import {ListItem} from 'react-native-elements';
import Colors from '../Constant/Colors';
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';
import Button from '../common/Button';
import Input from '../common/Input';
import {connect} from 'react-redux';
import {addMeeting} from '../actions'
const {height,width}=Dimensions.get('window')

import axios from 'axios';

class Add  extends Component {

    constructor() {
        super();
    
        this.state = {
            title:'',
            desctiption:'',
            location:null
            
        };
       
      }

      onGoBack =(location)=>{

        this.setState({location});
      }

      addMeeting = async()=>{
        const {title,desctiption,location} =this.state;
        this.props.addMeeting(title,desctiption,location,this.props.profile);
        this.setState({location:null});


      }

      componentWillReceiveProps(nextProp){
          if(nextProp.saved){
            alert('saved successfully')
          }
      }

    render() {
        return (
        <ScrollView   contentContainerStyle={{
            flex: 1
         }}style={styles.mainView}>
        <ImageBackground source={require('../../assets/intro.jpg')} style={styles.imageBack}>

        <LinearGradient colors={["#669df0aa","#669df0aa","#bc37d7aa"]} style={styles.linearGradient}>

            <View style={styles.headerView}>
                 
            <Input
            placeholder='Title'
            placeholderTextColor={Colors.grey}
            autoCorrect={false}
            autoCapitalize='sentences'
            borderColor={Colors.grey}
            borderBottomWidth={1}
            width={width-80}
            alignSelf='flex-start'
            marginTop={20}
            secureTextEntry={false}
            color={Colors.darkBlue}
            iconName='user'
            onChangeText={(title)=>{
                this.setState({title})
            }}
            />

            <Input
            placeholder='Desctiption'
            placeholderTextColor={Colors.grey}
            autoCorrect={false}
            autoCapitalize='sentences'
            borderColor={Colors.grey}
            borderBottomWidth={1}
            width={width-80}
            alignSelf='flex-start'
            marginTop={15}
            secureTextEntry={false}
            color={Colors.darkBlue}
            iconName='info-circle'
            onChangeText={(desctiption)=>{
                this.setState({desctiption})

            }}
            />
          <ListItem
            title={this.state.location?this.state.location.address :'Set Location'}
            leftIcon={
                <FontAwesome
                name='map-marker'
                color={Colors.darkBlue}
                size={22}
                />
            }
            containerStyle={
                    {marginTop:25
                      , borderRadius:50,
                      shadowColor:'#f4f4f4',
                      shadowOpacity:.2,
                      shadowOffset:{width:0,height:2},
                      elevation:1
                      ,backgroundColor:Colors.white,marginTop:10,width:width-80
                      ,height:40}
            }
            titleStyle={{marginTop:3,marginHorizontal:5,color:Colors.grey,fontSize:15}}
                
            onPress={()=>{
                this.props.navigation.navigate('setLocaTion',{onGoBack:this.onGoBack});
            }}
            />
        
            <TouchableOpacity style={styles.buttonContainer}

            onPress={this.addMeeting}
              >
                <Text style={{color:Colors.white}}>Save</Text> 
        </TouchableOpacity>
           
            </View>

         </LinearGradient>            
           </ImageBackground>
         </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:Colors.lightGrey
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
        alignItems:'center'
        , justifyContent:'center',
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
          color:Colors.darkGrey,
          fontSize:20,
          alignSelf:'center'

      },buttonContainer: {
        marginTop:30,
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:width-80,
        borderRadius:30,
        backgroundColor: Colors.darkBlue,
        alignSelf:'center',
    
      },decsText:{
        color:Colors.white,
        fontSize:14,
        marginRight:50         
        ,marginLeft:50,
        marginTop:10,
        alignSelf:'center'

      },
      login:{
        
      }
});

const mapStateToProps=({organize,auth})=>{

    return{
    loading :auth.loading,
    profile:auth.profile,
    token:auth.token,
    saved:organize.saved
};
};

export default  connect(mapStateToProps,{addMeeting})(Add) ;