import { Share, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import { Animated, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebViewContext } from '../components/WebViewProvider';


const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'black' },
    urlContainer: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    urlText: { color: 'white' },
    loadingBarBackground: { height: 3, backgroundColor: 'white' },
    loadingBar: { height: '100%', backgroundColor: 'green' },

    navigator: {
        backgroundColor: 'black',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
    },
    button: {
        width: 30,
        height: 30,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    naverIconOutline: {
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    naverIconText: {
        color: 'white',
    },
});

const NavButton = ({iconName, disabled, onPress }: {
    iconName: string,
    disabled?: boolean,
    onPress?: () => void;
}) => {
    const color = disabled ? 'gray' : 'white';
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={styles.button} >
            <Icon name={iconName} color={color} size={24} />
            </TouchableOpacity>
    );
};

type Props = NativeStackScreenProps<RootStackParamList, 'browser'>;



const BrowserScreen = ({ route, navigation }: Props) => {
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);


    const { initialUrl } = route.params;
    const [url, setUrl] = useState(initialUrl);
    const urlTitle = useMemo(() => url.replace('https://', '').split('/')[0], [url]);

    const progressAnim = useRef(new Animated.Value(0)).current;

    const webViewRef = useRef<WebView | null>(null);

    const context = useContext(WebViewContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.urlContainer}>
                <Text style={styles.urlText}>{urlTitle}</Text>
            </View>
            <View style={styles.loadingBarBackground}>
                <Animated.View style={[styles.loadingBar, {
                    width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                })}]}  />
            </View>
            <WebView
                ref={(ref) => {
                    webViewRef.current = ref;
                    if (ref != null) {
                        context?.addWebView(ref);
                    }
                }}
                source={{ uri: initialUrl }}
                onLoadProgress={(event) => {
                    progressAnim.setValue(event.nativeEvent.progress);
                }}
                onLoadEnd={() => {
                    progressAnim.setValue(0);
                }}
                onNavigationStateChange={(event) =>
                {
                    setCanGoForward(event.canGoForward);
                    setCanGoBack(event.canGoBack);
                    setUrl(event.url);
                }}
                style={styles.safeArea} />

            <View style={styles.navigator}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.goBack();
                }} >
                    <View style={styles.naverIconOutline}>
                        <Text style={styles.naverIconText}>N</Text>
                    </View>
                </TouchableOpacity>
                <NavButton
                    disabled={!canGoBack}
                    iconName="arrow-left" onPress={() => {
                    webViewRef.current?.goBack();
                }} />
                <NavButton
                    iconName="arrow-right"
                    disabled={!canGoForward}
                    onPress={() => {
                    webViewRef.current?.goForward();
                }} />
                <NavButton iconName="refresh" onPress={() => {
                    webViewRef.current?.reload();
                }} />
                <NavButton iconName="share-outline" onPress={() => {
                    Share.share({ message: url });
                }}  />
            </View>
        </SafeAreaView>
    );
};

export default BrowserScreen;
