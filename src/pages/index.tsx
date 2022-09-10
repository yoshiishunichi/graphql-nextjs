import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

import type { NextPage } from "next";

export type Todo = {
  createdAt: string;
  description: string;
  id: string;
  status: string;
  title: string;
  updatedAt: string;
};

export const GET_TODOS = gql`
  query Todos {
    findAll {
      id
      title
      description
      createdAt
      updatedAt
      status
    }
  }
`;

const GET_TODO = gql`
  query Todo($id: ID!) {
    findOneById(id: $id) {
      id
      title
      description
    }
  }
`;

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<{ findOneById: Todo }>(GET_TODO, {
    variables: {
      id: "id2す",
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>エラー</div>
      ) : data ? (
        <div>データあり</div>
      ) : (
        <div>データなし</div>
      )}
    </div>
  );
};

export default Home;
