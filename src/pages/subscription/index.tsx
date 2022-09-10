import { gql, useMutation, useSubscription } from "@apollo/client";
import { NextPage } from "next";
import { useEffect, useRef } from "react";

const ADD_TODO = gql`
  mutation AddTodo($id: ID!) {
    insertTodo(id: $id) {
      id
    }
  }
`;

const TODO_SUBSCRIPTION = gql`
  subscription todoAdded {
    todoAdded {
      id
    }
  }
`;

const SubscriptionPage: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mutateFunction] = useMutation(ADD_TODO);
  const { data, loading, error } = useSubscription(TODO_SUBSCRIPTION);

  useEffect(() => {
    console.log("data:", data);
    console.log("loading:", loading);
    console.log("error:", error);
  }, [data, error, loading]);

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
    </div>
  );
};

export default SubscriptionPage;
