import React, { useState } from 'react';

import {
  StatusBar,
} from 'react-native';

import {
  Container,
  Title,
  DivInput,
  Input,
  ButtonIcon,
  List
} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Repository from '~/components/Repository';
import api from '~/services/api';

export default function Main() {

  const [input, setInput] = useState('');
  const [repos, setRepos] = useState([]);

  const [error, setError] = useState(false);

  async function getRepo() {
    try {
      const response = await api.get(`/repos/${input}`);

      setRepos([
        ...repos,
        response.data
      ]);
      setInput('');

    } catch (err) {
      setError(true);
      console.tron.log('err', err.response);
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Title>Repositórios</Title>

      <DivInput>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          value={input}
          onChangeText={setInput}
          error={error}
          placeholder="Nome do repositório" />
        <ButtonIcon onPress={getRepo}>
          <Icon name="add" color="#fff" size={25} />
        </ButtonIcon>
      </DivInput>

      <List
        data={repos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Repository data={item} />} />

    </Container>
  )
}