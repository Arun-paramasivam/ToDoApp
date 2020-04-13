import React, { Component } from 'react';
import { TextInput, BackHandler, Alert, Image, Platform, StyleSheet, Text, View, ToastAndroid, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppColors } from '../AppStyles';
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { updateCompleted, updateIncomplete } from '../Redux/Actions'
import { SwipeListView } from 'react-native-swipe-list-view';
class MainPage extends Component {
    static navigationOptions = { header: null, tabBarVisible: false }

    constructor(props) {
        super(props)
        this.state = {
            toDo: '',

            // toDoList: [
            //     {
            //         key: 0,
            //         name:'Hi'
            //     },
            //     {
            //         key: 1,
            //         name:'Hello'
            //     },
            //     {
            //         key: 2,
            //         name:'welcome'
            //     }
            // ],
            modal: false
        }
        console.log('constructor', this.state.token)
        // this.getValues()
    }

    getValues = async () => {
        this.props.updateIncomplete({ incomplete: this.state.toDoList })
    }

    renderItems = ({ item, index }) => {
        let { name } = item
        return (
            <View style={{ borderRadius: 10, elevation: 2, margin: 5, padding: 15, backgroundColor: AppColors.LIGHT_APP_THEME }}
                onPress={() => {

                }}>

                <Text style={{ fontSize: 15, textAlign: 'left', color: AppColors.APP_THEME }}>{name}</Text>

            </View>
        )
    }



    render() {
        console.log('Main Page props', this.props)
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <Modal isVisible={this.state.modal} style={{ margin: 0 }}>
                    <View style={{ flex: 1, margin: 0, backgroundColor: 'white', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            value={this.state.toDo}
                            onChangeText={(text) => this.setState({
                                toDo: text
                            })}
                            style={{ backgroundColor: AppColors.WHITE, width: '90%', color: AppColors.APP_THEME }}
                            underlineColorAndroid={AppColors.BLACK}
                            multiline
                            placeholder='Enter the To Do Item'
                            // numberOfLines={5}
                            textAlignVertical={"top"}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <TouchableOpacity style={{ padding: 10, margin: 10, backgroundColor: AppColors.APP_THEME, flex: 0.5, borderRadius: 5, elevation: 2 }} onPress={() => {
                                if (this.state.toDo.length > 0) {
                                    let incomplete_list = this.props.incomplete.incomplete
                                    let data = {
                                        key: this.props.incomplete.incomplete.length + this.props.completed.completed.length + 1,
                                        name: this.state.toDo
                                    }
                                    incomplete_list.push(data)
                                    this.props.updateIncomplete({ incomplete: incomplete_list })
                                    this.setState({
                                        modal: false,
                                        toDo: ''
                                    })
                                } else if (this.state.toDo.length < 1) {
                                    alert('To Do Item cannot be empty!')
                                }
                            }}>
                                <Text style={{ color: AppColors.WHITE, textAlign: 'center' }}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 10, flex: 0.5, margin: 10, backgroundColor: AppColors.RED, borderRadius: 5, elevation: 2 }} onPress={() => {
                                this.setState({
                                    modal: false,
                                    toDo: ''
                                })

                            }}>
                                <Text style={{ textAlign: 'center', color: AppColors.WHITE }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                <View style={{
                    height: 55, backgroundColor: AppColors.WHITE, width: '100%', flexDirection: 'row', justifyContent: 'space-between', ...Platform.select({
                        ios: {
                            shadowRadius: 5,
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.5,
                            shadowColor: 'black',
                            //elevation: 3,
                            //backgroundColor:'green',
                        },
                        android: {
                            elevation: 3
                        }
                    })
                }}>
                    <Text style={[{ color: AppColors.APP_THEME, fontSize: 22, alignSelf: 'center', marginLeft: 20, fontWeight: 'bold' }]}>To Do{this.props.incomplete.incomplete.length > 0 ? '('+this.props.incomplete.incomplete.length+')' : null}</Text>
                    <TouchableOpacity style={{ padding: 10, marginRight: 15, borderRadius: 5, height: 40, width: 40, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', elevation: 4, backgroundColor: AppColors.APP_THEME }} onPress={() => this.setState({ modal: true })}>
                        <Text style={{ color: AppColors.WHITE, fontSize: 28, textAlign: 'center', marginTop: -3 }}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', padding: 5 }}>
                    <SwipeListView
                        data={this.props.incomplete.incomplete}
                        renderItem={this.renderItems}
                        renderHiddenItem={(data, rowMap) => {
                            // <View></View>
                            console.log('right', data, rowMap)
                            let { index, item } = data
                            console.log('index', index)
                            return (<View style={{ height: '80%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5, }}>
                                <TouchableOpacity style={{ backgroundColor: AppColors.APP_THEME, marginRight: 10, elevation: 2, borderRadius: 5 }} onPress={() => {
                                    // let {item} = data
                                    let completed_list = this.props.completed.completed
                                    completed_list.unshift(item)
                                    this.props.updateCompleted({ completed: completed_list })

                                    let incomplete_list = this.props.incomplete.incomplete
                                    incomplete_list.splice(index, 1)
                                    this.props.updateIncomplete({ incomplete: incomplete_list })
                                }}>
                                    <Text style={{ color: 'white', margin: 5, padding: 5 }}>Done</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginRight: 5, justifyContent: 'center', alignItems: 'center', padding: 2, elevation: 2, backgroundColor: AppColors.RED, borderRadius: 50, width: 25, height: 25 }}
                                    onPress={async () => {
                                        let incomplete_list = this.props.incomplete.incomplete
                                        incomplete_list.splice(index, 1)
                                        this.props.updateIncomplete({ incomplete: incomplete_list })
                                    }}>
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: AppColors.WHITE }}>X</Text>
                                </TouchableOpacity>
                            </View>)
                        }}
                        disableRightSwipe
                        closeOnRowOpen
                        swipeToOpenPercent={10}
                        // swipeGestureEnded={(data) => {
                        //     alert(data)
                        // }}

                        // leftOpenValue={75}
                        rightOpenValue={-100}

                    />
                </View>
            </SafeAreaView>
        );
    }

}

function mapStateToProps(state) {
    console.log('map state to props', state)
    return {
        incomplete: state.values.incomplete,
        completed: state.values.completed
    }
}

export default connect(mapStateToProps, { updateCompleted, updateIncomplete })(MainPage);
