import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

export default class WorkScreen extends React.Component {
    static navigationOptions = {
        
    };

    render() {
        return (
            <View style={{flexGrow: 1, backgroundColor: Colors.bodyBG}}>
            </View>
        );
    }
}