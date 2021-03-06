import React, {Component} from 'react';
import {
  Image, 
  Text, 
  StyleSheet, 
  PanResponder, 
  Animated, 
  Dimensions, 
  View,
} from 'react-native';

const {width: deviceWidth} = Dimensions.get('window');
const animationDirection = {
  left: -1,
  right: 1,
};

class Card extends Component {
  state = {
    position: new Animated.ValueXY(),
    isSwipeFromUpperPart: false,
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: ({nativeEvent}) => {
      this.setState({
        isSwipeFromUpperPart: nativeEvent.locationY > this.cardHeight / 2,
      });
      this.state.position.setOffset({
        x: this.state.position.x._value, 
        y: this.state.position.y._value,
      });
      this.state.position.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([null, {
      dx: this.state.position.x, 
      dy: this.state.position.y,
    }]),
    onPanResponderRelease: (event, gestureState) => {
      this.state.position.flattenOffset();
      if (Math.abs(gestureState.dx) > 50 && Math.abs(gestureState.vx) > 0.3) {
        const direction = gestureState.vx > 0 ? animationDirection.right : animationDirection.left;
        Animated.timing(this.state.position, {
          toValue: {
            x: deviceWidth * direction * 1.5, 
            y: this.state.position.y._value,
          },
          duration: 300,
        }).start(() => this.props.onRelease(this.props.index));
      }
      else {
        Animated.spring(this.state.position, {
          toValue: {x: 0, y: 0},
          friction: 6,
          tension: 100,
        }).start();
      }
    },
  })

  getRotateDirection = () => this.state.isSwipeFromUpperPart ? '-15deg' : '15deg';

  setCardHeight = ({nativeEvent}) => {
    this.cardHeight = nativeEvent.layout.height;
  }

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
                  inputRange: [0, deviceWidth],
                  outputRange: ['0deg', this.getRotateDirection()],
                }),
              },
            ],
          },
        ]} 
        {...this.panResponder.panHandlers}
        onLayout={this.setCardHeight}
      >
        <View style={styles.reactions}>
          <Animated.Text 
            style={[
              styles.reaction, 
              styles.like,
              {
                opacity: this.state.position.x.interpolate({
                  inputRange: [40, deviceWidth / 4],
                  outputRange: [0, 1],
                })
              }
            ]}
          >
            LIKE
          </Animated.Text>
          <Animated.Text 
            style={[
              styles.reaction, 
              styles.nope,
              {
                opacity: this.state.position.x.interpolate({
                  inputRange: [-deviceWidth / 4, -40],
                  outputRange: [1, 0],
                })
              }
            ]}
          >
            NOPE
          </Animated.Text>
        </View>
        <View pointerEvents="none">
          <Text style={styles.title}>{name}, {age}</Text>
        </View>
      </Animated.Image>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    justifyContent: 'space-between',
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
  reactions: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  reaction: {
    fontSize: 42,
    fontWeight: '600',
    borderWidth: 4,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: 'transparent',
    letterSpacing: 2,
  },
  like: {
    color: '#37C978',
    borderColor: '#37C978',
    transform: [{rotate: '-10deg'}],
  },
  nope: {
    color: '#FD4F69',
    borderColor: '#FD4F69',
    transform: [{rotate: '10deg'}],
  }
});

export default Card;