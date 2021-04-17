import React, { useEffect } from "react";
import axios from "axios";
import { CreateTodos, Navbar, Todolists } from "../components";
import { server } from "../config";
import { useTodos } from "../Context/Globalcontext";

export default function Home({ data }) {
  const { todos, setTodos, creatTodos } = useTodos();

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, []);

  return (
    <div className="h-100 w-full flex items-center justify-center font-sans bg-blue-100 ">
      <div className="bg-white rounded shadow p-6 m-4 w-full">
        <div className="mb-4">
          <Navbar />
          <CreateTodos />
        </div>
        <div>
          {todos && todos.map((rcd) => <Todolists key={rcd.id} todo={rcd} />)}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${server}/api/getTodos`);
  return {
    props: { data },
  };
};