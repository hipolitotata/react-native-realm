import React, { useState, useEffect } from 'react';

import {
  StatusBar,
} from 'react-native';

import {
  Container,
  Titles,
  Title,
  Delete,
  DivInput,
  Input,
  ButtonIcon,
  List
} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Repository from '~/components/Repository';
import api from '~/services/api';

import getRealm from '~/services/realm';

export default function Main() {

  const [input, setInput] = useState('');
  const [repos, setRepos] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    async function getRepos() {
      const realm = await getRealm();
      const repos = realm.objects('Repository').sorted('stars', true);
      setRepos([...repos]);
    };

    getRepos();
  }, [])

  async function deleteAll() {
    const realm = await getRealm();
    realm.write(() => {
      realm.deleteAll()
    });

    setRepos([]);
  };

  async function addRepo(repository) {
    try {
      const data = {
        id: repository.id,
        name: repository.name,
        fullName: repository.full_name,
        description: repository.description || 'Sem descrição',
        stars: repository.stargazers_count,
        forks: repository.forks_count,
      };
      const realm = await getRealm();

      realm.write(() => {
        realm.create('Repository', data, 'modified');
      });
      return data;

    } catch (err) { }
  };

  async function getRepo() {
    try {
      const response = await api.get(`/repos/${input}`);
      const resultRealm = await addRepo(response.data);

      setRepos([
        ...repos,
        resultRealm
      ]);
      setInput('');
    }
    catch (err) {
      setError(true);
    }
  };

  async function updateRepo(repository) {
    const response = await api.get(`/repos/${repository.fullName}`);
    const resultRealm = await addRepo(response.data);

    setRepos(repos.map(repo => repo.id === repository.id ? resultRealm : repo));
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <Titles>
        <Title>Repositórios</Title>
        <Delete onPress={deleteAll}>Deletar todos</Delete>
      </Titles>

      <DivInput>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          value={input}
          onChangeText={setInput}
          error={error}
          placeholder="Nome do repositório (ex: angular/angular)" />
        <ButtonIcon onPress={getRepo}>
          <Icon name="add" color="#fff" size={25} />
        </ButtonIcon>
      </DivInput>

      <List
        data={repos}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Repository onRefresh={updateRepo} data={item} />
        )} />

    </Container>
  )
}