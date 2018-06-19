import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, View, ImageBackground, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AuthService from './provider/auth/AuthService';
import RankingService from './provider/ranking/RankingService';
import Service from './provider/Service';
import Async from './provider/Storage/Async';
import AuthScreen from './containers/AuthScreen';
import {saveUser} from './actions';
import store from './store';
import { Container, Header, Button, Title, Left, Body, Icon, Right } from 'native-base';
import AppTabNavigation from './navigation/AppTabNavigation';
import imgFondo from './images/bg-hero.jpg'
import DropdownAlert from 'react-native-dropdownalert';

class App extends Component {
  state = {
    isLoggedIn: false,
    isLoading: false,
    isAppReady: false,
    isLoadingFinal:false,
  }


   componentWillMount() {
 		Async.getItem('token').then((data) => {
      console.log('token ', data);
 			if (data) {
 				Service.setToken(data);
        this.setState({isLoadingFinal:true, isAppReady:true, isLoggedIn:true});
 			} else {
        this.setState({isLoadingFinal:true});
      }
 		}).catch((error) => {
      this.setState({isLoadingFinal:true});
 			console.log('error App: ', error);
 		});
    console.log('bienvenido');

    //En caso de que no ejecute el AsyncStorage, tiene algunos problemas cuando hace debug en core de React Native con alguna de las Versiones
    let self = this;
    setTimeout ( () => {
        self.setState({isLoadingFinal:true});
    }, 4000);

 	}

  _simulateLogin = (username, password) => {
    user = {
      username:username,
      password:password
    };

    this.setState({ isLoading: true });

    AuthService.login(user, (response) => {
			console.log('login', response);
			store.dispatch(saveUser(user));
      setTimeout(() => this.setState({ isLoading: false, isAppReady:true, isLoggedIn:true }), 2000);
		}, (err) => {
			console.log('user login ERROR', err);
      if(err === 'User not exists') {
          this.dropdown.alertWithType('error', 'Usuario no existe', 'El usuario ó contraseña que ingresaste es incorrecto');
      }
      setTimeout(() => this.setState({ isLoading: false}), 1000);
    });

  }

  closeSession () {
    Async.removeItem('token');
    this.setState({isAppReady:false, isLoggedIn:false});
  }
  onClose(data) {
    console.log('cerro ', data);
  }

  render () {
    if(this.state.isLoadingFinal) {
      if (this.state.isAppReady && this.state.isLoggedIn) {
        return (
          <Provider store={store}>
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header>
                  <Left style={{width:'50%'}}>
                    <Button transparent onPress={this.closeSession.bind(this)}>
                      <Text style={{color:'black'}}> Salir </Text>
                    </Button>
                  </Left>
                  <Body>
                    <Title>Rankings</Title>
                  </Body>
                  <Right>
                  </Right>
                </Header>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppTabNavigation />
              </View>
          </Provider>
        )
      } else {
        return (
          <Provider store={store}>
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <DropdownAlert
                ref={ref => this.dropdown = ref}
                onClose={data => this.onClose(data)}
                closeInterval={null}
                zIndex={10}
               />
              <AuthScreen
                login={this._simulateLogin}
                isLoggedIn={this.state.isLoggedIn}
                isLoading={this.state.isLoading}
                onAlibrateCompleted={() => this.setState({ isAppReady: true })}
              />
            </View>
          </Provider>
        )
      }
    } else {
      return(
          <ImageBackground style={{flex: 1}} source={imgFondo}>
          </ImageBackground>
      );
    }
  }
}

export default App;
