import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './screens/Home';
import Exercise from './screens/Exercise';
//import Homework from './screens/Homework';

const MyFirstApp = StackNavigator({
  Home: { screen: Home },
  Exercise: { screen: Exercise },
  //Homework: { screen: Homework }
});

export default MyFirstApp;


