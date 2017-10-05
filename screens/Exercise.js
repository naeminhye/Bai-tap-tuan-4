import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class ExerciseHome extends React.Component {    
    constructor(props) {
        super(props);

        this.state = {
            weight: '',
            height: '',
            bmi: 0,
            ol: 'Undefined'
        }
        this.compute = this.compute.bind(this);
    }

    compute() {
        let _weight = parseFloat(this.state.weight)
            _height = parseFloat(this.state.height),
            _bmi = _weight/Math.pow(_height/100, 2),
            _ol = '';
        
        if(_bmi >= 32)
            _ol = 'Obese';
        else if (_bmi >= 25 && _bmi < 32)
            _ol = 'Over Weight';
        else if (_bmi >= 18.5 && _bmi < 25)
            _ol = 'Normal Weight';
        else
            _ol = 'Under Weight';

        this.setState({
            bmi: _bmi,
            ol: _ol,
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.label}>Weight (KG)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numbers-and-punctuation'
                    returnKeyType='next'
                    value={this.state.weight}
                    //placeholder="Type here to translate!"
                    onChangeText={ (weight) => this.setState({weight}) }
                />
            </View>
            <View style={styles.group}>
                <Text style={styles.label}>Height (CM)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numbers-and-punctuation'
                    returnKeyType='next'
                    value={this.state.height}
                    //placeholder="Type here to translate!"
                    onChangeText={ (height) => this.setState({height}) }
                />
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.result}>BMI: {this.state.bmi.toFixed(2)}</Text>
                <Text style={styles.result}>Obesity Level: {this.state.ol}</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.compute}
                >
                    <Text style={styles.buttonText}>Compute</Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  group: {
      marginBottom: 25,
      alignItems: 'stretch'
  },
  input: {
      borderColor: '#cecece',
      borderWidth: 1,
      borderRadius: 10,
      height: 50,
      padding: 10,
      fontSize: 20
  },
  label: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  button: {
      padding: 10,
      backgroundColor: '#fff',
      borderColor: '#cecece',
      borderWidth: 1,
      borderRadius: 10,
  },
  buttonText: {
      fontSize: 22,

  },
  centerContainer: {
      alignItems: 'center'
  }
});
