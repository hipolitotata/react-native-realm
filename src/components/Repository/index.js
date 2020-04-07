import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Container, Name, Description, Stats, Stat, StatCount, Refresh, RefreshText,
} from './styles';

export default function Repository({ data, onRefresh }) {
    return (
        <Container>
            <Name>{data.name}</Name>
            <Description>{data.description || 'Sem descrição'}</Description>

            <Stats>
                <Stat>
                    <Icon name="star" size={16} color="#333" />
                    <StatCount>{data.stars || 0}</StatCount>
                </Stat>
                <Stat>
                    <Icon name="code-fork" size={16} color="#333" />
                    <StatCount>{data.forks || 0}</StatCount>
                </Stat>
            </Stats>

            <Refresh onPress={() => onRefresh(data)}>
                <Icon name="refresh" color="#7159c1" size={16} />
                <RefreshText>ATUALIZAR</RefreshText>
            </Refresh>
        </Container>
    );
}