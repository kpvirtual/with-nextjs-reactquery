import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createTodo } from "../api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface IFormInputs {
  taskTitle: string;
  taskDescription: string;
}

const schema = yup
  .object({
    taskTitle: yup.string().required(),
    taskDescription: yup.string().required().min(10),
  })
  .required();

export function AddTodoForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createTodo, {
    onSuccess: () => {
      const values = getValues();
      queryClient.setQueryData(["todos"], values);
    },
  });

  const onSubmit = (data: IFormInputs) => {
    console.log({ data });
    mutate(data);
    reset();
  };
  return (
    <div
      className="flex justify-center content-center gap-x-4"
      style={{ marginTop: "100px" }}
    >
      <div
        style={{ padding: "15px", width: "50%" }}
        className="block rounded-lg shadow-lg bg-white max-w-sm text-center"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mb-3 xl:w-96">
          <label className="form-label inline-block mb-2 text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            className="
        form-control
        block
        w-80
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleText0"
            placeholder="Task title"
            {...register("taskTitle")}
          />
          <p className="text-red-500">{errors.taskTitle?.message}</p>
          <label className="form-label inline-block mb-2 text-gray-700">
            Task Description
          </label>
          <input
            className="
        form-control
        block
       w-80
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            {...register("taskDescription")}
          />
          <p className="text-red-500">{errors.taskDescription?.message}</p>
          <input
            className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
            type="submit"
          />
          {/* <button type="button" >Dark</button> */}
        </form>
      </div>
    </div>
  );
}
