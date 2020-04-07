import React from 'react';
import Routes from '~/routes';

import '~/config/ReactotronConfig';

import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

IconFont.loadFont();
IconMaterial.loadFont();

export default function App() {

    console.disableYellowBox = true;

    return (
        <Routes />
    );
};