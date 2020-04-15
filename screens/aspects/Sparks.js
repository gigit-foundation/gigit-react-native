import React from 'react';
import { observer, inject } from 'mobx-react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

import Colors from '../../config/config';
import { GigItIcon } from '../../assets/GigitIcon';

@inject('userStore') @observer
export class SparksScreen extends React.Component {
    static navigationOptions = { };

    filterData() {
        if(!this.props.search) return this.props.items || [];
        return (this.props.items || []).filter( i => i.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1);
    }

    render() {
        const items = this.filterData();

        return (
            <View style={styles.body}>
                <View style={styles.searchRow}>
                    <GigItIcon name="search" size={27} style={styles.search}></GigItIcon>
                    <TextInput  style={styles.searchBox}
                        placeholder="Find or Light a Spark!"
                        value={this.props.search} 
                        onChangeText={(txt) => this.props.setSearch(txt)}
                    ></TextInput>
                    <GigItIcon.Button style={styles.addButton}
                        name="add-button-3" onPress={() => this.props.addItem(this.props.search)}>
                    </GigItIcon.Button>
                </View>
                <FlatList
                    data={items}
                    renderItem={(item) => 
                        <View key={item.item} style={styles.card}>
                            <Text>{item.item}</Text>
                        </View>
                    }>
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flexGrow: 1, 
        backgroundColor: Colors.bodyBG, 
        flexDirection: "column"
    },
    search: {
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        color: "white"
    },
    searchRow: {
        padding: 5,
        marginTop: 24,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "white"
    },
    searchBox: {
        backgroundColor: "white",
        flexGrow: 1
    },
    addButton: {
        width: 40
    },
    card: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    }
});