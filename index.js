/**
 * @format
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from './app.json';
import { AppRegistry, SafeAreaView, StatusBar } from 'react-native';
import Nav from './src/Navigator/Nav';
import { AppColors } from './src/AppStyles';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './src/Redux/Reducers/reducer'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import AsyncStorage from '@react-native-community/async-storage'
import { PersistGate } from 'redux-persist/es/integration/react'
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['values']
}
const persistedReducer = persistReducer(persistConfig, reducer)
// const store = createStore(reducer)
const store = createStore(
    persistedReducer, applyMiddleware(createLogger())
)

const persistedStore = persistStore(store)
const AppContainer = () =>
    <Provider store={store}>
        <PersistGate persistor={persistedStore} loading={null}>
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar backgroundColor={AppColors.APP_THEME} barStyle="light-content" />
                <Nav />
            </SafeAreaView>
        </PersistGate>

    </Provider>
    ;

AppRegistry.registerComponent(appName, () => AppContainer);
