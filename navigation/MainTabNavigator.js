import React from 'react';
import { Platform, View, Text } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import { GigItIcon } from '../assets/GigitIcon';

import Colors from '../constants/Colors';
import SparksScreen from '../screens/Sparks';
import SkillsScreen from '../screens/Skills';
import ConnectScreen from '../screens/Connect';
import MarketScreen from '../screens/Market';
import WorkScreen from '../screens/Work';

export default TabNavigator(
    {
        Sparks: {
            screen: SparksScreen,
        },
        Skills: {
            screen: SkillsScreen,
        },
        Connect: {
            screen: ConnectScreen,
        },
        Work: {
            screen: WorkScreen,
        },
        Market: {
            screen: MarketScreen,
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconName;
                let color;
                switch (routeName) {
                    case 'Sparks':  iconName = "spark"; color = Colors.gigitSpark; break;
                    case 'Skills':  iconName = "skills"; color = Colors.gigitWater; break;
                    case 'Connect': iconName = "connect"; color = Colors.gigitEarth; break;
                    case 'Work':    iconName = "work"; color = Colors.gigitLife; break;
                    case 'Market':  iconName = "market"; color = Colors.gigitSky; break;
                }
                if(!focused) color = Colors.headerFG;
                return (
                    <View style={{padding: 5, flexDirection: 'column'}}>
                        <GigItIcon
                            name={iconName}
                            size={27}
                            color={color}
                            style={{alignSelf: 'center'}}
                        />
                        <Text style={{color: color, textAlign: 'center', alignSelf: 'center', marginTop: 7, fontFamily: 'aller'}}>{routeName}</Text>
                    </View>
                );
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: Colors.tabIconSelected,
            style: {
                backgroundColor: Colors.headerBG,
                height: 77
            },
            indicatorStyle: {
                backgroundColor: Colors.tabIconSelected,
                height: 5
            },
        },
    }
);
