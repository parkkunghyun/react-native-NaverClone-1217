import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { RootStackParamList } from '../routes';
import { WebViewContext } from '../components/WebViewProvider';

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'black' },
});

type Props = NativeStackNavigationProp<RootStackParamList>;


const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

const LoginScreen = () => {
    const navigation = useNavigation<Props>();
    const context = useContext(WebViewContext);

    // useEffect(() => {
    //     console.log(context?.webViewRefs.current);
    // }, [context]);

    return <SafeAreaView style={styles.safeArea}>
        <WebView source={{ uri: LOGIN_URL }} onNavigationStateChange={
            (event) => {
                //console.log('event url ===> ', event.url);
                if (event.url === 'https://www.naver.com') {
                    if (context?.webViewRefs.current != null) {
                        context.webViewRefs.current.forEach((webView) => {
                            webView.reload();
                        });
                    }
                    // 고백하기전에 웹뷰를 리프레시 해주면 웹뷰들이 로그인 되게됨
                    navigation.goBack();
                }
            }
        }/>
    </SafeAreaView>;
};

export default LoginScreen;
