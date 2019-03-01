import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity,View,ScrollView,ImageBackground,TextInput,Dimensions } from 'react-native';
import { LinearGradient,MapView,Location } from 'expo';
import {ListItem,List} from 'react-native-elements';
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

export default class  extends Component {

    constructor() {
        super();
        YellowBox.ignoreWarnings(['Setting a timer']);

        this.state = {
            myLocation:{},
            latitude:2.29,
            longitude:48.85
            ,query:'',
            searchResult:null
            ,slectedResult:null
        };
       
      }


      async componentDidMount(){
       const {coords :{latitude,longitude}}=await  Location.getCurrentPositionAsync({});
        this.setState({latitude,longitude});
      }

      search =async()=>{

        //AIzaSyBIL7xpWYiZCa7d3UTwW9olbmsYYXNplEE

        let endPoint='https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
        endPoint+=this.state.query;
        endPoint+='&key=AIzaSyBIL7xpWYiZCa7d3UTwW9olbmsYYXNplEE';

        try{
        const{data}=await axios.get(endPoint);

        this.setState({searchResult:data.results})

        }catch(r){
            console.log(r);
        }

      }

      showResult =()=>{

        if(!this.state.searchResult) return;
       
            return(
                <View style={{height:200 , marginTop:10}}>
                <ScrollView >
                {
                    this.state.searchResult.map((item,i)=>(                    
                        

                    <ListItem
                    key={i}
                    title={item.name}
                    subtitle={item.formatted_address}
                    leftIcon={
                        <FontAwesome
                        name='map-marker'
                        color={Colors.grey}
                        size={22}
                        />
                    }
                    containerStyle={
                            {marginTop:10,height:35,marginHorizontal:10,backgroundColor:'#ffffff00'}
                    }
                    titleStyle={{marginTop:3,color:Colors.darkBlue,fontSize:13}}

                    onPress={()=>{

                       const {geometry:{location}} =item;

                       const formatted_result={
                        name :item.name
                        ,address:item.formatted_address,
                        latitude:location.lat,
                        longitude:location.lng
                       }
                    this.setState({searchResult:null,slectedResult:formatted_result})

                    this.map.animateToRegion({
                        latitude:formatted_result.latitude
                        ,longitude:formatted_result.longitude  ,
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
            );
        }
        
      MapMarker=()=>{

        if (!this.state.slectedResult) return;
       const {name,address,latitude,longitude} =this.state.slectedResult;
      
       return(

            <MapView.Marker
            title={name}
            coordinate={{latitude,longitude}}
            />

           

        )

      }

    render() {

  

        const {myLocation}=this.setState;

        return (
        <ScrollView   >


            <View style={[styles.headerView,{flexDirection:'column'}]}>

            

            <Input
            placeholder='Enter location name'
            placeholderTextColor={Colors.grey}
            autoCorrect={false}
            autoCapitalize='sentences'
            borderColor={Colors.grey}
            borderBottomWidth={1}
            marginHorizontal ={5}
             alignSelf='flex-start'
            color={Colors.darkGrey}
            marginTop={20}
            secureTextEntry={false}
            color={Colors.darkBlue}
            iconName='map-marker'
            onChangeText={(query)=>{
                this.setState({query});
            }}

            onSubmitEditing={this.search}

            />

            {this.showResult()}

            <View style={{height:450,margin:15}}>

            <MapView
            ref={map => this.map=map}
            
            style={{flex:1}}
            initialRegion={{
                latitude:this.state.latitude,
                longitude:this.state.longitude,
                latitudeDelta:LAT_DELTA,
                longitudeDelta:LON_DELTA

            }}
            >
            {this.MapMarker()}
            </MapView>

           </View>

           <View>
           <TouchableOpacity style={styles.buttonContainer}

           onPress={()=>{
            if(this.state.slectedResult){
            this.props.navigation.state.params.onGoBack(this.state.slectedResult);
                         this.props.navigation.goBack();
                        }
           }}
              >
                <Text style={{color:Colors.white}}>Confirm Location</Text> 
          </TouchableOpacity>
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