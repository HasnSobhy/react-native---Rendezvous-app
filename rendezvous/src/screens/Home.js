import React, { Component } from 'react';
import { Text, StyleSheet, View ,Dimensions,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {retrieveMeeting} from '../actions';
import {MapView,Notifications} from 'expo';
import {ListItem,List} from 'react-native-elements';
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';
import Colors from '../Constant/Colors';
import { YellowBox } from 'react-native';

const {width,height}=Dimensions.get('window');
const ASPECT_RATIO=width/height;
const LAT_DELTA=0.085*ASPECT_RATIO; 
const LON_DELTA=0.085*ASPECT_RATIO; 
import {registerForPushNotificationsAsync} from '../Services'

class Home extends Component {

    componentWillMount(){
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Possile Unhandeled Promise Rejection']);
        this.props.retrieveMeeting()
        
        // alert(this.props.meeting[0].location.address)

        //  registerForPushNotificationsAsync(this.props.profile.uid)

       Notifications.addListener(this.hundleNotification)

    }
    hundleNotification =(notification)=>{

        const {data}=notification;
        const meetingId=data.meetingId
        if(notification && notification.origin==='received'){

            if(meetingId){


                                this.props.navigation.navigate('LocaTionDetails',{meetingId:item.id})

            }


        }

        console.log(notification);
    }

    render() {

        const firstLocation=this.props.meeting[0];
        
        const initialRegion={
            latitude:firstLocation.location.latitude,
            longitude:firstLocation.location.longitude,
            latitudeDelta:48.85,
            longitudeDelta:48.85

        }

        return (
            <View style={[styles.headerView,{}]}>


            <View style={{position:'absolute',top:10,zIndex:1,backgroundColor:'#ffffff00'}}>
                <ScrollView contentContainerStyle={{backgroundColor:'#ffffff00'}} 
                 horizontal 
                 showsHorizontalScrollIndicator={false}  >
                {
                    this.props.meeting.map((item,i)=>(                    
                        

                    <ListItem
                    key={i}
                    title={item.title}
                    
                    subtitle={item.location.address}
                    leftIcon={
                        <FontAwesome
                        name='map-marker'
                        color={Colors.white}
                        size={22}
                        />
                    }
                    containerStyle={
                        {height:80,width:200,marginHorizontal:5,marginHorizontal:10,backgroundColor:'#009dffdd'}
                     }
                titleStyle={{color:Colors.white,fontSize:13}}
                subtitleStyle={{color:Colors.white,fontSize:11}}
                    onPress={()=>{
                     
                    this.map.animateToRegion({
                        latitude:item.location.latitude
                        ,longitude:item.location.longitude  ,
                        latitudeDelta:LAT_DELTA,
                        longitudeDelta: LON_DELTA,
                         }
                         ,350)
                         
                    }
                }                
                    />
                ))
                }
                
                </ScrollView>
                </View>

            <MapView
            ref={map => this.map=map}
            
            style={{flex:1}}
            initialRegion={
               initialRegion
            }
            >

                {
                    this.props.meeting.map((item,index)=>{

                        return(

                            <MapView.Marker
                            key={index.toString()}

                            title={item.name}

                            coordinate={{
                               latitude:item.location.latitude,
                               longitude:item.location.longitude
                            }}

                            onPress={()=>{
                                this.props.navigation.navigate('LocaTionDetails',{meetingId:item.id})

                            }}

                            />

                        );

                    })
                }


            </MapView>


           

            </View>

        );
    }
}

const styles = StyleSheet.create({
    headerView: {
        flex:1,
       
      }
});


const mapStateToProps=({retrieve,organize,auth})=>{

    return{
    loading :auth.loading,
    profile:auth.profile,
    token:auth.token,
    saved:organize.saved,
    meeting:retrieve.meeting
};
};

export default connect(mapStateToProps,{retrieveMeeting})(Home)  ;