
import React ,{Component} from 'react';
import {AppRegistry,Text,View,StyleSheet} from 'react-native';
import { bold } from 'ansi-colors';
import Colors from '../Constant/Colors'
const Logo = (props) =>{
    return(
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.title}</Text>
        </View>
    );
};


const styles=StyleSheet.create({

    viewStyle:{
        backgroundColor:Colors.white,
        height:100,
        width:100,
        alignItems:'center',
       justifyContent:'center',
       borderRadius:50,
    },
    textStyle:{
        
        fontSize:20,
        fontWeight:'bold',
        color:Colors.green,

        

    }
});
export default Logo;