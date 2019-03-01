
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,createSwitchNavigator } from "react-navigation";
import Auth from '../screens/Auth';
import PhoneVerification from '../screens/PhoneVerification';
import LocaTionDetails from '../screens/LocaTionDetails';
import VerifyCode from '../screens/VerifyCode';
import Splash from '../screens/Splash';
import setLocaTion from '../screens/setLocaTion';
import Tab from './Tabs';
import Colors from '../Constant/Colors'
import I18n from '../../locales';

const AppNavigator = createStackNavigator({
  splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
 
  Auth: {
    screen: Auth,
    navigationOptions: {
      header: null
    }
  },
  Tab: {
    screen: Tab,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkBlue,
        
      },
      headerTintColor: Colors.white,
    }),
  },
  setLocaTion: {
    screen: setLocaTion,
    navigationOptions: ({ navigation }) => ({
      title: 'Set Location',

      headerStyle: {
        backgroundColor: Colors.darkBlue,
        
      },
      headerTintColor: Colors.white,
    }),
  },
  
  LocaTionDetails: {
    screen: LocaTionDetails,
    navigationOptions: ({ navigation }) => ({
      title: 'Location Details',

      headerStyle: {
        backgroundColor: Colors.darkBlue,
        
      },
      headerTintColor: Colors.white,
    }),
  },
  PhoneVerification: {
    screen: PhoneVerification,
    navigationOptions: ({ navigation }) => ({
      title: 'Phone Verification',
      headerStyle: {
        backgroundColor: Colors.darkBlue,
        
      },
      headerTintColor: Colors.white,
      
    }),
  },
  VerifyCode: {
    screen: VerifyCode,
    navigationOptions: ({ navigation }) => ({
      title: 'Verify Code',
      headerStyle: {
        backgroundColor: Colors.darkBlue,
        
      },
      headerTintColor: Colors.white,
      
    }),
  },
}

);


Tab.navigationOptions = ({ navigation }) => {
  
  const { state: { routes, index } } = navigation; 
  const navigationOptions = {};

  //
  if (routes[index].routeName === 'Home') {
      navigationOptions.title = I18n.t('home');
    
  }

  if (routes[index].routeName === 'Add') {
      navigationOptions.title = I18n.t('organizeMeeting');
  }
  if (routes[index].routeName === 'Profile') {
      navigationOptions.title = I18n.t('profile');
  }
  return navigationOptions;
};


export default createAppContainer(AppNavigator);