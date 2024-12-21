const RouteNames = {
    HOME: 'home' as const,
    SHOPPING: 'shopping' as const,
    BROWSER: 'browser' as const,
    HOME_TAB: 'home-tab' as const,
    LOGIN: 'login' as const,
};
export default RouteNames;


export type RootStackParamList = {
    // 어떠한 스택들이 있고 어떤 파라미터를 줄 수 있는지
    [RouteNames.HOME_TAB]: undefined;
    [RouteNames.BROWSER]: { initialUrl: string };
    [RouteNames.LOGIN]: undefined;
}
