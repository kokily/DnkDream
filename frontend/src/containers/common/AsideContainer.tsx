import React, { useState } from 'react';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { CHECK_USER } from 'graphql/auth.queries';
import { LOG_OUT } from 'graphql/cache.local';
import Aside from 'components/common/Aside';

const AsideContainer = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { data } = useQuery(CHECK_USER);
  const [Logout] = useMutation(LOG_OUT);
  const [toggle, setToggle] = useState(true);

  const onBrand = async () => {
    await client.clearStore();
    history.push('/');
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onWrite = () => {
    history.push('/write');
  };

  const onLogout = async () => {
    await Logout();
    window.location.href = '/';
  };

  return (
    <Aside
      user={data?.CheckUser?.ok && data.CheckUser.user}
      toggle={toggle}
      onBrand={onBrand}
      onToggle={onToggle}
      onWrite={onWrite}
      onLogout={onLogout}
    />
  );
};

export default AsideContainer;
