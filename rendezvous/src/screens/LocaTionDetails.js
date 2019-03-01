import React, { Component } from 'react';
import { Text, StyleSheet,Alert, TouchableOpacity,View,ScrollView,ImageBackground,TextInput,Dimensions } from 'react-native';
import { LinearGradient,MapView,Location } from 'expo';
import {ListItem,Avatar} from 'react-native-elements';
import Colors from '../Constant/Colors';
import Button from '../common/Button';
import Input from '../common/Input';
import ActvityIndicator from '../common/ActivityIndicator';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { YellowBox } from 'react-native';

const {width,height}=Dimensions.get('window');
const ASPECT_RATIO=width/height;
const LAT_DELTA=0.085*ASPECT_RATIO; 
const LON_DELTA=0.085*ASPECT_RATIO; 
import {connect} from 'react-redux';

import {retrieveSingleMeeting} from '../actions'

 class Details extends Component {


    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);

        this.state = {
          
        };
       
      }


       componentWillMount(){
        const id =this.props.navigation.getParam('meetingId');
        this.props.retrieveSingleMeeting(id);
       
      }



    render() {

        return (
        <ScrollView   >


        <View style={[styles.headerView,{flexDirection:'column'}]}>

               <ListItem
               leftAvatar={{ source: { uri: this.props.singleMetting.profile.photoURL } }}
               title={this.props.singleMetting.profile.displayName}
               containerStyle={{height:50}}

                />

                <ListItem
                containerStyle={{marginTop:15,height:50}}
               title={this.props.singleMetting.title}
               subtitle={this.props.singleMetting.description}
               leftIcon={
                <FontAwesome
                name='info-circle'
                color={Colors.darkBlue}
                size={22}
                />
            }
            />

            <ListItem
                            containerStyle={{marginTop:15,height:50}}
               title={this.props.singleMetting.location.name}
               subtitle={this.props.singleMetting.location.address}
               leftIcon={
                <FontAwesome
                name='map-marker'
                color={Colors.darkBlue}
                size={22}
                />
            }
            />

        
            <View style={{height:400,margin:15}}>

            <MapView
            ref={map => this.map=map}
            
            style={{flex:1}}
            initialRegion={{
                latitude:this.props.singleMetting.location.latitude,
                longitude:this.props.singleMetting.location.longitude,
                latitudeDelta:LAT_DELTA,
                longitudeDelta:LON_DELTA

            }}
            >
            <MapView.Marker
            title={this.props.singleMetting.location.name}
            coordinate={{
                latitude:this.props.singleMetting.location.latitude
                ,longitude:this.props.singleMetting.location.longitude
            }}
            />            
            </MapView>

           </View>


            </View>

           
         </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        flex:1
    },
    headerView: {
        flex:1,
       
      },buttonContainer: {
        marginTop:4,
        height:35,
        flexDirection: 'row',
        marginHorizontal:5,
        borderRadius:15,
        backgroundColor: Colors.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
    
      }
      
});


const mapStateToProps=({retrieveSingle,retrieve,organize,auth})=>{

    return{
    loading :auth.loading,
    profile:auth.profile,
    token:auth.token,
    saved:organize.saved,
    meeting:retrieve.meeting,
    singleMetting:retrieveSingle.singleMetting
};
};

export default connect(mapStateToProps,{retrieveSingleMeeting}) ( Details); 
