import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager, ImageBackground } from 'react-native'
import { Image, View } from 'react-native-animatable'

import imgLogo from '../../images/logo.png'
import imgFondo from '../../images/bg-hero.jpg'
import metrics from '../../config/metrics'

import Open from './Open'
import Login from './Login'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)

export default class AuthScreen extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    onAlibrateCompleted: PropTypes.func.isRequired
  }

  state = {
    visibleForm: null
  }

  componentWillUpdate (nextProps) {
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen()
    }
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null)
    // 2. Fade out the logo
    await this.logoImgRef.fadeOut(800)
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onAlibrateCompleted()
  }

  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    // 3. Set the new visible form
    this.setState({ visibleForm })
  }

  render () {
    const { isLoggedIn, isLoading, login } = this.props
    const { visibleForm } = this.state
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 40 }
    return (

      <ImageBackground style={styles.container} source={imgFondo}>
        <Image
          animation={'bounceIn'}
          duration={1200}
          delay={200}
          ref={(ref) => this.logoImgRef = ref}
          style={styles.logoImg}
          source={imgLogo}
        />
        {(!visibleForm && !isLoggedIn) && (
          <Open
            onSignInPress={() => this._setVisibleForm('LOGIN')}
          />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'padding'}
          style={[formStyle, styles.bottom]}
        >

          {(visibleForm === 'LOGIN') && (
            <Login
              ref={(ref) => this.formRef = ref}
              onLoginPress={login}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 24,
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: '#0d202dd4'
  }
})
