import React from 'react';
import { useHistory } from 'react-router-dom';
import Intro from 'components/home/Intro';

const introData = {
  img: '/profile.jpg',
  username: 'Hyunsung',
  content:
    '저는 개발자가 아니지만 자바스크립트를 좋아하여 열심히 공부하는 직장인입니다.',
  skill: [
    {
      id: 0,
      name: 'NodeJS',
      url: 'https://nodejs.org/ko',
    },
    {
      id: 1,
      name: 'ReactJS',
      url: 'https://reactjs.org/',
    },
    {
      id: 2,
      name: 'Typescript',
      url: 'https://www.typescriptlang.org/',
    },
  ],
};

const IntroContainer = () => {
  const history = useHistory();
  const { img, username, content, skill } = introData;

  const onGithub = () => {
    document.location.href = 'https://github.com/kokily';
  };

  const onLogin = () => {
    history.push('/login');
  };

  const onMove = (url: string) => {
    document.location.href = `${url}`;
  };

  return (
    <Intro
      img={img}
      username={username}
      content={content}
      skill={skill}
      onGithub={onGithub}
      onLogin={onLogin}
      onMove={onMove}
    />
  );
};

export default IntroContainer;
