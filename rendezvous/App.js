import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import Navigator from './src/roots/Navigator'
import {store,persistedStore} from './src/store';
import {PersistGate} from 'redux-persist/integration/react'
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <PersistGate persistor={persistedStore}>
      <View style={styles.container}>
        <Navigator  ></Navigator>
        
      </View>
      </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
