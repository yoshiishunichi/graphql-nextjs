import { gql, useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRef } from "react";

import { GET_TODOS, Todo } from "pages";

const ADD_TODO = gql`
  mutation AddTodo($id: ID!) {
    insertTodo(id: $id) {
      id
    }
  }
`;

const MutationPage: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mutateFunction] = useMutation(ADD_TODO);
  const { loading, error, data } = useQuery<{
    findAll: Todo[];
  }>(GET_TODOS);

  return (
    <div>
      <input className="block rounded-md border border-black px-1" ref={inputRef} type="text" />
      <button
        onClick={() => {
          mutateFunction({ variables: { id: inputRef.current?.value || "idなし" } });
        }}
      >
        データを追加
      </button>
      <div>
        {data ? (
          data.findAll.map(({ id, title, description }, i) => (
            <div className="mb-4 rounded-md border border-black px-2 py-4" key={i}>
              <p>id: {id}</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          ))
        ) : (
          <div>データないよ</div>
        )}
      </div>
    </div>
  );
};

export default MutationPage;
