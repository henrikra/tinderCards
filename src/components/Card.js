import React, {Component} from 'react';
import {Image, Text, StyleSheet, PanResponder, Animated} from 'react-native';

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
    onPanResponderRelease: () => {
      this.state.position.flattenOffset();
    },
  })

  render() {
    const {name, age, image} = this.props;
    return (
      <Animated.Image 
        source={{uri: image}} 
        style={[
          styles.image, 
          {transform: this.state.position.getTranslateTransform()},
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