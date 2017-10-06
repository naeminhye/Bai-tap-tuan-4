import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

export default class Homework extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeElapsed: null,
            isRunning: false,
            startTime: null,
            laps: [],
            //lapLongestIndex: 0,
            isResetable: false,
        }

        this._onStartPress = this._onStartPress.bind(this);
        this._onLapPress = this._onLapPress.bind(this);
    }

    _lapColor(index) {
        let arr = this.state.laps;
        let maxIndex = arr.indexOf(Math.max(...arr));
        let minIndex = arr.indexOf(Math.min(...arr));
        if (index === maxIndex)
            return {color: 'red'};
        else if (index === minIndex)
            return {color: 'green'};
        return {color: 'black'};            
    }

    _renderTimer() {
        return (
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>
                    {formatTime(this.state.timeElapsed)}
                </Text>
            </View>
        );
    }

    _renderButtons() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableHighlight 
                    style={styles.button}
                    onPress={this._onLapPress}
                    underlayColor="gray">
                    <Text style={styles.buttonText}>{this.state.isResetable ? 'Reset' : 'Lap'}</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={[styles.button, this.state.isRunning ? {borderColor: '#e72222', backgroundColor: '#e7222288'} : {borderColor: '#009933', backgroundColor: '#00993388'}]}
                    onPress={this._onStartPress}
                    underlayColor="gray">
                    <Text 
                        style={[styles.buttonText, this.state.isRunning ? {color: '#e72222'} : {color: '#009933'}]}>
                        {this.state.isRunning ? 'Stop' : 'Start'}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    _onStartPress() {
        if (this.state.isRunning) {
            clearInterval(this.interval);
            this.setState({
                isRunning: false,
                isResetable: true,
            });
            return
        }

        this.setState({
            startTime: new Date(),
        });

        this.interval = setInterval(() => {
            let start = this.state.startTime;
            this.setState({
                timeElapsed: new Date() - this.state.startTime,
                isRunning: true,
                isResetable: false,
            });
        }, 30);
    }
    
    _renderLaps() {
        return this.state.laps.map((time, index) => {
            return (
                <View key={index} style={styles.lap}>
                    <Text style={[styles.lapText, this._lapColor(index)]}>
                        Lap {index + 1}
                    </Text>
                    <Text style={[styles.lapText, this._lapColor(index)]}>
                        {formatTime(time)}
                    </Text>
                </View>
            );
        });
    }

    _onLapPress() {
        if (this.state.isResetable) {
            clearInterval(this.interval);
            this.setState({
                timeElapsed: null,
                isRunning: false,
                startTime: null,
                laps: [],
                isResetable: false,
            });
            return
        }

        let lap = this.state.timeElapsed;
    
        this.setState({      
            startTime: new Date(),   
            laps: this.state.laps.concat([this.state.timeElapsed]),
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderTimer()}
                {this._renderButtons()}  
                <View style={styles.lapContainer}>               
                    <ScrollView>
                        {this._renderLaps()}   
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    timer: {
        fontSize: 70,
        // fontWeight: 'bold',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderWidth: 1,
        borderRadius: 70,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        fontSize: 22
    }, 
    lapContainer: {
        flex: 3,
        marginTop: 50,
    },
    lap: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1,
        paddingTop: 10, 
        paddingBottom: 10,
    },
    lapText: {
        fontSize: 24
    },
});