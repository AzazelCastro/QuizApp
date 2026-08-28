import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface UseAnswerAnimationProps {
    showCorrect: boolean;
    showIncorrect: boolean;
}

export default function useAnswerAnimation({
    showCorrect,
    showIncorrect,
}: UseAnswerAnimationProps) {
    const incorrectAnimation = useRef(new Animated.Value(0)).current;
    const correctAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!showIncorrect) return;

        Animated.sequence([
            Animated.timing(incorrectAnimation, {
                toValue: -8,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(incorrectAnimation, {
                toValue: 8,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(incorrectAnimation, {
                toValue: -6,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(incorrectAnimation, {
                toValue: 6,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(incorrectAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }, [showIncorrect, incorrectAnimation]);

    useEffect(() => {
        if (!showCorrect) return;

        Animated.sequence([
            Animated.timing(correctAnimation, {
                toValue: 1.04,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.spring(correctAnimation, {
                toValue: 1,
                friction: 4,
                tension: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, [showCorrect, correctAnimation]);

    const animatedStyle = {
        transform: [
            { translateX: incorrectAnimation },
            { scale: correctAnimation },
        ],
    };

    return { animatedStyle };
}