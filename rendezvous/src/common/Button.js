
import React ,{Component} from 'react';
import {AppRegistry,TouchableOpacity,Text,View,StyleSheet} from 'react-native';
import { bold } from 'ansi-colors';
import {Button} from 'react-native-elements';
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';


const Buttonn = (props) =>{
    return(

        <Button containerStyle={[styles.viewStyle,{
        
    }]} 
    
    onPress={props.onPress}

        buttonStyle={[styles.textStyle,{ 
          height:props.height
          ,width:props.width,
            backgroundColor:props.backgroundColor,
            
           borderRadius:props.borderRadius, 
           marginTop:props.marginTop,
           elevation:props.elevation,     

        }]}
    
      title=  {props.textTitle} 

      icon={
        <FontAwesome 
        name={props.iconName}
        size={20}
        color={props.color}
    />
      }

      loading={props.loading}
      disabled={props.disabled}
       >
    </Button>
    );
};


const styles=StyleSheet.create({

    viewStyle:{
     
       alignItems:'center',
       justifyContent:'center',
       shadowColor:'#c2c2c2',
       shadowOpacity:.2,
       shadowOffset:{width:0,height:2},
      
    },
    textStyle:{
        alignItems:'center',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    }

    
});
export default Buttonn;