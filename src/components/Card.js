import React, {Component} from 'react';
import {Image, Text, StyleSheet, PanResponder, Animated, Dimensions} from 'react-native';

class Card extends Component {
  state = {
    position: new Animated.ValueXY(),
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.state.position.setOffset({x: this.state.position.x._value, y: this.state.position.y._value});
      this.state.position.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([null, {dx: this.state.position.x, dy: this.state.position.y}]),
    onPanResponderRelease: (event, gestureState) => {
      this.state.position.flattenOffset();
      if (Math.abs(gestureState.dx) > 50 && Math.abs(gestureState.vx) > 0.1) {
        const multiplier = gestureState.dx > 0 && gestureState.vx > 0 ? 2 : -2;
        Animated.spring(this.state.position, {toValue: {
          x: Dimensions.get('window').width * multiplier, 
          y: this.state.position.y,
        }}).start();
      }
      else {
        Animated.spring(this.state.position, {toValue: {x: 0, y: 0}}).start();
      }
    },
  })

  render() {
    const {name, age, image} = this.props;
    return (
      <Animated.Image 
        source={{uri: image}} 
        style={[
          styles.image, 
          {
            transform: [
              ...this.state.position.getTranslateTransform(), 
              {
                rotate: this.state.position.x.interpolate({
                  inputRange: [0, Dimensions.get('window').width],
                  outputRange: ['0deg', '-10deg'],
                }),
              },
            ],
          },
        ]} 
        {...this.panResponder.panHandlers}
      >
        <Text style={styles.title}>{name}, {age}</Text>
      </Animated.Image>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 15,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Card;