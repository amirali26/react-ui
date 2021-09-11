import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USER } from '../../../../../queries/user';

const ViewAccountDialog = () => {
  const { loading, error, data } = useQuery(GET_USER, {

  });
  return (
    <div />
  );
};

export default ViewAccountDialog;
