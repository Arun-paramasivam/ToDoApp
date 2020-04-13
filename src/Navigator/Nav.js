import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../Screens/MainPage';
import CompletedPage from '../Screens/CompletedPage';
import { AppColors } from '../AppStyles';


const BottomTab = createBottomTabNavigator()

export const Nav = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName={'Add'} tabBarOptions={{
        activeTintColor: AppColors.APP_THEME,
        inactiveTintColor: AppColors.GRAY
      }}>
        <BottomTab.Screen name="Add" component={MainPage} options={{
          tabBarLabel: 'ToDo',
          tabBarIcon: ({ color, size, focused }) => (
            focused ?
            <Image source={require('../Assets/ToDoActive/index.png')} style={{height: 27, width: 27}}/>
            :
            <Image source={require('../Assets/ToDoInactive/index.png')} style={{height: 27, width: 27}}/>
          ),
        }}/>
        <BottomTab.Screen name="Completed" component={CompletedPage} options={{
          tabBarLabel: 'Completed',
          tabBarIcon: ({ color, size, focused }) => (
            focused ?
            <Image source={require('../Assets/CompletedActive/index.png')} style={{height: 30, width: 30}}/>
            :
            <Image source={require('../Assets/CompletedInactive/index.png')} style={{height: 30, width: 30}}/>
          ),
        }}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default Nav;