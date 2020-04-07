import styled from 'styled-components';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
    colors: ['#7159c1', '#9B49c1'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }
})`
    flex: 1;
    padding-top: ${getStatusBarHeight}px;
`;

export const Titles = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    padding: 0 20px;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: 28px;
    font-weight: bold;
`;

export const Delete = styled.Text`
    color: #fff;
    font-size: 15px;
`;

export const DivInput = styled.View`    
    padding: 0 20px;
    margin-top: 20px;
    flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#adadad'
})`
    width: 85%;
    border-radius: 3px;
    padding: 15px 10px;
    background: #fff;
    border-width: 1px;
    border-color: ${props => props.error ? 'red' : '#fff'};
`;

export const ButtonIcon = styled.TouchableOpacity`
    width: 12%;
    margin: 0 0 0 15px;
    justify-content: center;
    align-items: center;
    background: #323232;
    border-radius: 3px;
`;

export const List = styled.FlatList.attrs({
    contentContainerStyle: { paddingHorizontal: 20 },
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px;
  `;