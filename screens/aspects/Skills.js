import React from 'react';
import { observer, inject } from 'mobx-react'
import { View } from 'react-native';

import Colors from '../../config/config';

@inject('userStore') @observer
export default class SkillsScreen extends React.Component {

    render() {
        return (
            <View style={{flexGrow: 1, backgroundColor: Colors.bodyBG}}>
            </View>
        );
    }
}