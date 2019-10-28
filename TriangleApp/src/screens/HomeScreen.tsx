import * as React from "react";
import {StyleSheet, Button, View, NativeModules, LayoutAnimation, Animated, Easing} from "react-native";

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 100,
        height: 100,
    },
    triangle: {
        position: 'absolute',
        top: 575,
        left: 40
    }
});

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
const spinValue = new Animated.Value(0)
const moveAnimation = new Animated.ValueXY({ x: 40, y: 575 })

interface Props {
}

class HomeScreen extends React.Component<Props> {
    state = {
        opacity: new Animated.Value(1),
        width: 50,
        height: 50,
        spin: spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
    }

    makeTriangleSmaller = (counter: number) => {
        let { width, height } = this.state
        if (counter === 0) return
        setTimeout(() => {
            width -= 0.5;
            height -= 0.5;
            LayoutAnimation.spring();
            this.setState({width, height}, () => this.makeTriangleSmaller(--counter))
        }, 100)
    }

    buttonPressed = () => {
        let { opacity, spin} = this.state

        Animated.timing(             
            opacity,          
            {
                toValue: 0,                 
                duration: 5000,        
            }
        ).start();  
        Animated.timing(             
            spinValue,          
            {
                toValue: 1,                 
                duration: 5000,    
                easing: Easing.linear    
            }
        ).start();    
        Animated.timing(             
            moveAnimation,          
            {
                toValue: {x: 250, y: 40},                 
                duration: 5000,    
                easing: Easing.linear    
            }
        ).start();    
        this.makeTriangleSmaller(100);
        
    }

    render() {
        let { width, height, opacity, spin } = this.state

        return (
            <View>
                <View style={styles.button}>
                    <Button
                        onPress={this.buttonPressed}
                        title="Click me!"
                    />
                </View>
                <Animated.Image
                    style={{
                        ...styles.triangle,
                        width,
                        height,
                        opacity,
                        ...moveAnimation.getLayout(),
                        transform: [{rotate: spin}]
                    }}
                    source={require('../../assets/images/triangle.svg')}
                />
            </View>
        )
    }
}

export default HomeScreen;