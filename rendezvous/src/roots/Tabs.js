
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons,Ionicons,EvilIcons,FontAwesome } from '@expo/vector-icons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import Add from '../screens/Add';
import Profile from '../screens/Profile';

import Colors from '../Constant/Colors';

import React from 'react';
import { createStackNavigator,createAppContainer,createMaterialTopTabNavigator } from 'react-navigation';

const Tab = createMaterialTopTabNavigator({
	Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
           
            tabBarIcon: ({ tintColor }) => {
                return (
                    <MaterialIcons 
                        name='home'
                        size={22}
                        color={tintColor}
                    />

                );
            }
        })
    },
    Add: {
        screen: Add,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => {
                return (
                    <MaterialIcons
                    name='add-circle'
                    size={22}
                        color={tintColor}
                    />
                );
            }
        })
    }
    ,
    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => {
                return (
                    <FontAwesome
                    name='user'
                    size={22}
                        color={tintColor}
                    />
                );
            }
        })
    }

}
, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        showLabel:true,
         labelStyle:{
                fontSize:10
         },
        inactiveTintColor: Colors.green,
        activeTintColor: Colors.darkBlue,
        pressColor: Colors.green,
        
        indicatorStyle: { backgroundColor: Colors.darkBlue },
        style: {
            backgroundColor: Colors.white
        }
    }
    
});



Tab.navigationOptions = ({ navigation }) => {
    const { state: { routes, index } } = navigation; 
    const navigationOptions = {};

    //
    if (routes[index].routeName === 'Home') {
        navigationOptions.title = 'Home';
      
    }

    if (routes[index].routeName === 'Add') {
        navigationOptions.title = 'Add';
    }
    if (routes[index].routeName === 'Profile') {
        navigationOptions.title = 'Profile';
    }
    return navigationOptions;
};


export default createAppContainer(Tab);