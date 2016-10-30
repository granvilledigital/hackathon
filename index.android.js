import React, { Component } from 'react';
import MapView, {Polyline, Polygon, Marker} from 'react-native-maps';
import {
  AppRegistry,
  Animated,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import {lines, region} from './data';
import {maneoLinesMapping, nevaLinesMapping} from './config';

const MENU_HEIGHT = 200;

const getColor = (line) => {
    if(!Object.keys(line).length) return '';
    return line.type === 'Neva'
        ? nevaLinesMapping[line.number].color
        : maneoLinesMapping[line.number].color;
}

export default class granvilleBusMaps extends Component {

    constructor(props){
        super(props);
        this.renderlines = () => this.renderlinesData();
        this.renderMarkers = () => this.renderMarkersData();
        this.onMarkerClick = (route, line) => () => this.markerClick(route, line);
        this.onCloseMenu = () => this.closeMenu();
        this.state = {
            initialPosition: 'unknown',
            info: {
                height: new Animated.Value(0),
                data: {}
            }
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => ({}),
            {enableHighAccuracy: true, timeout: 2000, maximumAge: 300}
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    renderlinesData(){
        return lines.map(
            (line, i) => {
                const routesData = line.routes.map((route) => route.geo);
                return (
                    <Polyline key={i}
                              coordinates={routesData}
                              strokeWidth={2}
                              strokeColor={getColor(line)} />
                );
            }
        );
    }

    renderMarkersData(){
        return lines.map(
            (line, i) => line.routes.map(
                (route, j) => route.type === 'stations' && (
                    <Marker key={`${i}${j}`}
                            image={require('./img/station_small.png')}
                            onPress={this.onMarkerClick(route, line)}
                            coordinate={route.geo} />
                )
            )
        );
    }

    markerClick(station, line){
        const {info, data} = this.state;
        this.setState({
            info: {
                ...info,
                data: {...station, ...line}
            }
        }, () => Animated.timing(
            this.state.info.height,
            {toValue: MENU_HEIGHT, duration: 150}
        ).start());
    }

    closeMenu() {
        Animated.timing(
            this.state.info.height,
            {toValue: 0, duration: 150}
        ).start();
    }

    render() {
        const {initialPosition, info: {display, height, data, data: {name, number, type}}} = this.state;
        const color = getColor(data);
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         initialRegion={region}
                         toolbarEnabled={false}
                         showsUserLocation={true}
                         loadingEnabled={true}
                         onPress={this.onCloseMenu}>
                    {this.renderlines()}
                    {this.renderMarkers()}
                </MapView>
                <Animated.View style={[styles.info, {height}]}>
                    <Text style={styles.infoTitle}>{'Information'}</Text>
                    <Text style={styles.infoName}>{`Station: ${name}`}</Text>
                    <View style={styles.infoLineContainer}>
                        <Text style={styles.infoLine}>{'Ligne:'}</Text>
                        <Text style={[styles.infoNumber, {color, borderColor: color}]}>{number}</Text>
                    </View>
                    <Text style={styles.infoType}>{`Bus: ${type}`}</Text>
                    <Text style={styles.infoPrice}>{`Prix: ${type === 'Neva' ? '1€' : '2.3€'}`}</Text>
                </Animated.View>
            </View>
        );
    }
}

AppRegistry.registerComponent('granvilleBusMaps', () => granvilleBusMaps);
