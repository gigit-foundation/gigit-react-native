import React from 'react';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { Asset, Font, SecureStore } from 'expo';
import { Router, Scene, Tabs, Modal, Actions } from 'react-native-router-flux';
import { Button, ButtonGroup } from 'react-native-elements';

import { T, setLocale } from './localize/localizer';
import { AppStateMonitor } from './components/appstatemonitor';
import { Colors, Sizes, Keys, isiPhoneX } from './config/config';
import { GigItIcon } from './assets/GigitIcon';

import stores from './model/userstore';

import Launch from './screens/launch';
import { FirstUse } from './screens/auth/firstuse';
import { Welcome } from './screens/auth/welcome';
import { LockScreen } from './screens/auth/lockscreen';
import { Settings } from './screens/app/settings';
import { Support } from './screens/app/support';

import Sparks from './screens/aspects/Sparks';
import Skills from './screens/aspects/Skills';
import Connect from './screens/aspects/Connect';
import Work from './screens/aspects/Work';
import Market from './screens/aspects/Market';

const sparksTab = (props) => 
    <Button vertical active={props.navigation.state.index === 0} onPress={()=> Actions.jump("sparks")} style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch'}}>
        <GigItIcon name="spark" size={Sizes.navIcon} color={props.navigation.state.index === 0 ? Colors.gigitSpark : Colors.action} style={{alignSelf: 'center'}}/>
        <Text style={{textAlign: 'center', paddingLeft: 0, paddingRight: 0, lineHeight: 25, paddingTop: 3}}>{T('sparks.tab')}</Text>
    </Button>
const skillsTab = (props) =>
    <Button vertical active={props.navigation.state.index === 1} onPress={()=> Actions.jump("skills")} style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch'}}>
        <GigItIcon name="skills" size={Sizes.navIcon} color={props.navigation.state.index === 1 ? Colors.gigitWater : Colors.action} style={{alignSelf: 'center'}}/>
        <Text style={{textAlign: 'center', paddingLeft: 0, paddingRight: 0, lineHeight: 25, paddingTop: 3}}>{T('skills.tab')}</Text>
    </Button>
const connectTab = (props) => 
    <Button vertical active={props.navigation.state.index === 2} onPress={()=> Actions.jump("connect")} style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch'}}>
        <GigItIcon name="wallet" size={Sizes.navIcon} color={props.navigation.state.index === 2 ? Colors.gigitEarth : Colors.action} style={{alignSelf: 'center'}}/>
        <Text style={{textAlign: 'center', paddingLeft: 0, paddingRight: 0, lineHeight: 25, paddingTop: 3}}>{T('connect.tab')}</Text>
    </Button>
const workTab = (props) =>
    <Button vertical active={props.navigation.state.index === 3} onPress={()=> Actions.jump("work")} style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch'}}>
        <GigItIcon name="work" size={Sizes.navIcon} color={props.navigation.state.index === 3 ? Colors.gigitLife : Colors.action} style={{alignSelf: 'center'}}/>
        <Text style={{textAlign: 'center', paddingLeft: 0, paddingRight: 0, lineHeight: 25, paddingTop: 3}}>{T('work.tab')}</Text>
    </Button>
const marketTab = (props) =>
    <Button vertical active={props.navigation.state.index === 4} onPress={()=> Actions.jump("market")} style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch'}}>
        <GigItIcon name="market" size={Sizes.navIcon} color={props.navigation.state.index === 4 ? Colors.gigitSky : Colors.action} style={{alignSelf: 'center'}}/>
        <Text style={{textAlign: 'center', paddingLeft: 0, paddingRight: 0, lineHeight: 25, paddingTop: 3}}>{T('market.tab')}</Text>
    </Button>

TabBar = props => {
    const buttons = [{ element: sparksTab }, { element: skillsTab }, { element: connectTab }, { element: workTab }, { element: marketTab }];
    return (
        <ButtonGroup
            containerStyle={{backgroundColor: Colors.headerBG, borderTopWidth: 0, paddingBottom: isIPhoneX() ? 10 : 0}}
            buttons={buttons}
            containerStyle={{height: 100}} />
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }

    componentWillMount() {
        this.init();
    }

    init = async () => {
        await Asset.loadAsync([
            // require('./assets/images/robot-dev.png'),
            // require('./assets/images/robot-prod.png'),
        ]),

        await Font.loadAsync({
            'aller': require('./assets/fonts/Aller.ttf'),
        });
        
        var userStore = stores.userStore;

        // load persisted settings
        var userSettings = await AsyncStorage.getItem(Keys.Settings);
        if (userSettings !== null ) {
            console.log(`User settings loaded: ${userSettings}`);
            userSettings = JSON.parse(userSettings);
            // restore persisted locale
            if(userSettings.curLocale !== userStore.userSettings.curLocale)
                setLocale(userSettings.curLocale);
            userStore.setUserSettings(userSettings);
        }

        // load secure persisted settings
        var lockSettings = await SecureStore.getItemAsync(Keys.LockSettings);
        if( lockSettings !== null ) {
            console.log(`Lock settings loaded: ${lockSettings}`);
            userStore.setLockSettings(JSON.parse(lockSettings));
        } 

        var isTestnet = userStore.userSettings.isTestnet();
        api.setAPI(isTestnet);

        this.setState({
            isLoaded: true,
        });
    }

    onAppStateChanged = (newState) => {
        var lockSettings = stores.userStore.lockSettings;
        var userSettings = stores.userStore.userSettings;
        // console.log(`onAppStateChanged: ${newState}, schedule: ${lockSettings.schedule}`);
        if( newState === 'active' ) {
            switch (lockSettings.schedule)
            {
                case 'onactivate':
                    Actions.jump('lock');
                    return;
                case 'inactiveFor':
                    if(userSettings.lastInactiveTime !== null) {
                        var now =  (new Date()).valueOf();
                        var diff = now - userSettings.lastInactiveTime;
                        var minutes = diff / 1000 / 60;
                        console.log(`App inactive >> minutes: ${minutes}`);
                        if(minutes >= lockSettings.lockAfterMinutes)
                            Actions.jump('lock');
                    }
                    break;
            }
        }
        else {
            userSettings.setInactive();
            // console.log(`Going inactive at ${userSettings.lastInactiveTime}`);
        }
    }

    render() {
        if(!this.state.isLoaded) return (<View/>);
        return (
            <MenuProvider>
                <AppStateMonitor onStateChanged={this.onAppStateChanged}/>
                <StatusBar backgroundColor={Colors.headerBG} barStyle='light-content'/>
                <StyleProvider style={getTheme(appTheme)}>
                    <Provider userStore={stores.userStore}>
                        <Router uriPrefix='studio.gigit.world' wrapBy={observer}>
                            <Modal key='root' headerMode="screen">
                                <Scene key='launch' component={Launch} hideNavBar/>
                                <Scene key='firstuse' component={FirstUse} hideNavBar/>
                                <Scene key='welcome' component={Welcome} hideNavBar/>
                                <Scene key='lock' component={LockScreen} hideNavBar/>
                                <Tabs key='app' activeBackgroundColor={Colors.headerBG}
                                      activeTintColor={Colors.plutus}
                                      inactiveTintColor={Colors.headerFG} 
                                      lazy={true} tabBarPosition='bottom'
                                      tabBarComponent={TabBar}>
                                    <Scene key='sparks' component={Sparks} hideNavBar/>
                                    <Scene key='connect' component={Connect} hideNavBar/>
                                    <Scene key='skills' component={Skills} hideNavBar/>
                                    <Scene key='work' component={Work} hideNavBar/>
                                    <Scene key='market' component={Market} hideNavBar/>
                                </Tabs>
                                <Scene key='settings' component={Settings} title={T('common.settings')} hideNavBar/>
                                <Scene key='support' component={Support} title={T('settings.support')} hideNavBar/>
                            </Modal>
                        </Router>
                    </Provider>
                </StyleProvider>
            </MenuProvider>
        );
    }

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

export default observer(App);
