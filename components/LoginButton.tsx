import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RouteNames, { RootStackParamList } from '../routes';
import CookieManager from '@react-native-cookies/cookies';
import { WebViewContext } from './WebViewProvider';

type Props = NativeStackNavigationProp<RootStackParamList>;

export const LoginButton = () => {
    const context = useContext(WebViewContext);

    const navigation = useNavigation<Props>();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const iconName = isLoggedIn ? 'logout' : 'login';
    const isFocused = useIsFocused();

    const onPressLogin = useCallback(() => {
        navigation.navigate(RouteNames.LOGIN);
    }, [navigation]);

    const onPressLogout = useCallback(async() => {
        await CookieManager.clearAll(true);
        setIsLoggedIn(false);
        if (context?.webViewRefs.current != null) {
            context.webViewRefs.current.forEach((webView) => {
                webView.reload();
            });
        }
     }, [context]);

    // 즉 이 버튼안에 들어간 로그인 스크린이 아닌ㄹ때만
    useEffect(() => {
        console.log('isFocused', isFocused);
        if (isFocused) {
            CookieManager.get('https://.naver.com', true)
            .then((cookie) => {
                if (cookie.NID_SES) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            });
        }
    }, [isFocused]);

    return (
        <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
            <Icon name={iconName} color="white" size={24}/>
        </TouchableOpacity>
    );
};
