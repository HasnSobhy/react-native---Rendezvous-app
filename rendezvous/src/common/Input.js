
import React ,{Component} from 'react';
import {AppRegistry,Text,View,StyleSheet} from 'react-native';
import { bold } from 'ansi-colors';
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';

import { Input } from 'react-native-elements';
import Colors from '../Constant/Colors';

const Input4 = (props) =>{
   
    return(

        <View  >

            <Input
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            
            autoCorrect={false}
            autoCapitalize='sentences'
            textContentType={props.textContentType}
            secureTextEntry={props.secureTextEntry}
            inputContainerStyle={{
                borderRadius:50,
                shadowColor:'#f4f4f4',
                shadowOpacity:.2,
                shadowOffset:{width:0,height:2},
                elevation:1
                ,backgroundColor:Colors.white
                ,marginTop:props.marginTop
                ,borderColor:props.borderColor,
                borderBottomWidth:0,
                width:props.width,
                alignSelf:props.alignSelf,
                marginHorizontal:props.marginHorizontal
            }}
           
            inputStyle={{ marginLeft:10, color:props.color,fontSize:15}}
            onChangeText={props.onChangeText}
            leftIcon={

                <FontAwesome 
                        name={props.iconName}
                        size={20}
                        color={props.color}
                    />

                    

            }
            onSubmitEditing={props.onSubmitEditing}
            >

        </Input>

        </View>
    );
};


const styles=StyleSheet.create({

    viewStyle:{
        backgroundColor:'#fff',
       height:32
       ,width:200,
       alignItems:'center',
       justifyContent:'center',
       shadowColor:'#c2c2c2',
       shadowOpacity:.2,
       shadowOffset:{width:0,height:2},
       elevation:2,
       borderRadius:50, 
       marginTop:15
    },
    textStyle:{
        color:'#000',
        fontSize:13,
        fontWeight:'normal',
        alignItems:'center',
        justifyContent:'center',
        alignItems:'center',
    }
});
export default Input4;