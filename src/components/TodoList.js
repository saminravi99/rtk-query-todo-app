import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetFilteredTodosQuery,
  useGetTodosQuery,
} from "../features/api/apiSlice";
import Loading from "./Loading";
// import fetchTodos from "../redux/todos/thunk/fetchTodos";
import Todo from "./Todo";

export default function TodoList() {
  const filters = useSelector((state) => state.filters);

  const {
    data: todos,
    isLoading,
    isError,
  } = useGetFilteredTodosQuery({
    status: filters.status,
    colors: filters.colors,
  });

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {isLoading ? <Loading/> : todos?.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
}
