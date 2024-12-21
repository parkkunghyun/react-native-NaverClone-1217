import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RouteNames, { RootStackParamList } from '../routes';

import { WebViewContext } from '../components/WebViewProvider';

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
});

type Props = NativeStackScreenProps<RootStackParamList>;


const HomeScreen = ({ navigation }: Props) => {
    const context = useContext(WebViewContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <WebView
                ref={(ref) => {
                    if (ref != null) {
                        context?.addWebView(ref);
                    }

                }}
                source={{ uri: 'https://m.naver.com/' }}
            onShouldStartLoadWithRequest={request => {
                console.log(request);
                if (request.url.startsWith('https://m.naver.com') || request.mainDocumentURL?.startsWith('https://m.naver.com')) {
                    return true;
                }
                if (request.url != null && request.url.startsWith('https://')) {
                    navigation.navigate(RouteNames.BROWSER, {initialUrl: request.url});
                    return false;
                    // 여기 해당하면 홈스크린에서 로딩 안됨
                }
                return true;
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} />
    </SafeAreaView>);
};

export default HomeScreen;
