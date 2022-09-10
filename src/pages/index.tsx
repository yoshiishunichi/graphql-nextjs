import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

import type { NextPage } from "next";

type Todo = {
  createdAt: string;
  description: string;
  id: string;
  status: string;
  title: string;
  updatedAt: string;
};

const GET_TODOS = gql`
  query {
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

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<{ findAll: Todo[] }>(GET_TODOS);

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
        <div>
          {data.findAll.map(({ id, title, description, createdAt, updatedAt, status }) => {
            return (
              <div className="mx-1 my-4 border-b border-black pb-1" key={id}>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>createdAt: {createdAt}</p>
                <p>updatedAt: {updatedAt}</p>
                <p>status: {status}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>データなし</div>
      )}
    </div>
  );
};

export default Home;
