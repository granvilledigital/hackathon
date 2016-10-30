import React, { Component } from 'react';
import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    info: {
        position: 'absolute',
        elevation: 10,
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        backgroundColor: 'white',
        left: 0,
        right: 0,
        bottom: -10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    infoTitle: {
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-light',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5
    },
    infoName: {
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-light',
        fontSize: 16,
        padding: 5
    },
    infoType: {
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-light',
        fontSize: 13,
        padding: 5
    },
    infoPrice: {
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-light',
        fontSize: 13,
        fontWeight: 'bold',
        padding: 5
    },
    infoLineContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    infoLine: {
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-light',
        fontSize: 16,
        padding: 5
    },
    infoNumber: {
        fontWeight: 'bold',
        borderWidth: 3,
        borderRadius: 15,
        width: 30,
        height: 30,
        paddingTop: 5,
        paddingLeft: 11

    }

});

export default styles;
