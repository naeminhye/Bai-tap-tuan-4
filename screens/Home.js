import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Home extends React.Component {

    static navigationOptions = {
        title: 'Home',
    };
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.smallText}>Lecture 5</Text>
                    <Text style={styles.bigText}>Keyboard Input, State, Timer</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigate('Exercise')}
                    >
                        <Text style={styles.buttonText}>Exercise 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        //onPress={() => navigate('Homework')}
                    >
                        <Text style={styles.buttonText}>Homework</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  smallText: {
      fontSize: 26,
  },
  bigText: {
      fontSize: 32,
      fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
      padding: 20,
      backgroundColor: '#fff',
      borderColor: '#cecece',
      borderWidth: 1,
      borderRadius: 10,
      margin: 20,
      width: 250,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText: {
      fontSize: 28,
  },
});
