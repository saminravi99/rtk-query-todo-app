import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://react-redux-todo-server-saminravi99.onrender.com",
  }),
  tagTypes: ["Todos", "Todo", "FilteredTodos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    getFilteredTodos: builder.query({
      query: ({ status, colors }) => {
        let queryString = "";
        if (status === "Complete") {
          queryString += "&completed_like=true";
        }
        if (status === "Incomplete") {
          queryString += "&completed_like=false";
        }
        if (colors.length > 0) {
          queryString += "&color_like=" + colors.join("&color_like=");
        }
        return `/todos?${queryString}`;
      },
      providesTags: (result, error, arg) => ["FilteredTodos"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos", "FilteredTodos"],
    }),
    updateTodoStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => ["Todos", "FilteredTodos"],
    }),
    updateTodoColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => ["Todos", "FilteredTodos"],
    }),
    updateTodoText: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => ["Todos", "FilteredTodos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos", "FilteredTodos"],
    }),
  }),
});

export const {
	useGetTodosQuery,
    useGetFilteredTodosQuery, 
	useGetTodoQuery,
	useAddTodoMutation,
	useUpdateTodoStatusMutation,
	useUpdateTodoColorMutation,
	useUpdateTodoTextMutation,
	useDeleteTodoMutation,
} = apiSlice;

//https://react-redux-todo-server-saminravi99.onrender.com
//http://localhost:9000