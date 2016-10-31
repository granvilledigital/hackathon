import React, { Component } from 'react';
import MapView, {Polyline, Polygon, Marker} from 'react-native-maps';
import {
  AppRegistry,
  Animated,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import {lines, region, stations} from './data';
import {maneoLinesMapping, nevaLinesMapping} from './config';

const MENU_HEIGHT = 200;

const getColor = (line, number) => {
    return line === 'neva'
        ? nevaLinesMapping[number].color
        : maneoLinesMapping[number].color;
}

export default class granvilleBusMaps extends Component {

    constructor(props){
        super(props);
        this.renderlines = () => this.renderlinesData();
        this.renderMarkers = () => this.renderMarkersData();
        this.displayLinesNumber = () => this.displayLines()
        this.onMarkerClick = (station) => () => this.markerClick(station);
        this.renderStationInformations = () => this.renderInformations();
        this.onCloseMenu = () => this.closeMenu();
        this.state = {
            info: {
                height: new Animated.Value(0),
                data: {}
            }
        };
    }

    renderlinesData(){
        return lines.map(
            (line, i) => {
                const {type, number, routes} = line;
                return (
                    <Polyline key={i}
                              coordinates={routes}
                              strokeWidth={2}
                              strokeColor={getColor(type, number)} />
                );
            }
        );
    }

    renderMarkersData(){
        return stations.map(
            (station, i) => (
                <Marker key={i}
                        image={require('./img/station_small.png')}
                        onPress={this.onMarkerClick(station)}
                        coordinate={station.geo} />
            )
        );
    }

    markerClick(station){
        const {info} = this.state;
        this.setState({
            info: {
                ...info,
                data: station
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

    renderInformations() {
        const {data: {name, lines}} = this.state.info;
        return name && (
            <View>
                <Text style={styles.infoTitle}>{name}</Text>
                <Text style={styles.infoLine}>{'Lignes:'}</Text>
                    {Object.keys(lines).map((lineType, i) => {
                        const ret = [
                            <Text key={lineType} style={styles.infoLine}>
                                {lineType}
                            </Text>,
                            lines[lineType].map((line, i) => {
                                const color = getColor(lineType, line);
                                return (
                                    <Text key={i} style={[styles.infoNumber, {color, borderColor: color}]}>{line}</Text>
                                );
                            }),
                            <Text key={`${lineType}price`} style={styles.infoPrice}>
                                {`(${lineType === 'neva' ? '1€' : '2.3€'})`}
                            </Text>
                        ];
                        return (<View key={i} style={styles.infoLineContainer}>{ret}</View>);
                    })}
            </View>
        );
    }

    render() {
        const {info: {height}} = this.state;
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
                    {this.renderStationInformations()}
                </Animated.View>
            </View>
        );
    }
}

AppRegistry.registerComponent('granvilleBusMaps', () => granvilleBusMaps);
