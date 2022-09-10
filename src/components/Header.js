import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoStatusMutation,
} from "../features/api/apiSlice";

export default function Header() {
  const { data: todos } = useGetTodosQuery();
  const [
    addTodo,
    {
      data: addedTodo,
      isError: addedTodoError,
      isLoading: addedTodoLoading,
      isSuccess,
    },
  ] = useAddTodoMutation();

  const [
    updateTodoStatus,
    {
      data: statusUpdatedTodo,
      isError: statusUpdatedTodoError,
      isLoading: statusUpdatedTodoLoading,
      isSuccess: statusUpdateSuccess,
    },
  ] = useUpdateTodoStatusMutation();

  const [
    deleteTodo,
    {
      data: deletedTodo,
      isError: deletedTodoError,
      isLoading: deletedTodoLoading,
      isSuccess: deletedTodoSuccess,
    },
  ] = useDeleteTodoMutation();

  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo({
      text: input,
      completed: false,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setInput("");
      toast.success("Todo added successfully");
    }
  }, [isSuccess]);

  const completeHandler = () => {
    let incompleteTodos = todos.filter((todo) => !todo.completed);
    incompleteTodos.forEach((todo) => {
      updateTodoStatus({
        id: todo?.id,
        data: {
          completed: true,
        },
      });
    });
  };

  const clearHandler = () => {
    let completedTodos = todos.filter((todo) => todo.completed);
    completedTodos.forEach(({ id }) => {
      deleteTodo(id);
    });
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={submitHandler}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={handleInput}
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer" onClick={completeHandler}>
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={clearHandler}>
          Clear completed
        </li>
      </ul>
    </div>
  );
}
