import axios from "axios";
const url = "http://localhost:3000/api/postEndpoint";
type CreateUserResponse = {
  body: string;
  title: string;
  id: number;
};
type GetTodosResponse = {
  data: [];
};

async function getTodos() {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<any>(url, {
      headers: {
        Accept: "application/json",
      },
    });

    // console.log(JSON.stringify(data, null, 4));

    // 👇️ "response status is: 200"
    // console.log('response status is: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

async function createTodo(bodyObject: object) {
  try {
    // 👇️ const data: CreateUserResponse
    const { data } = await axios.post<CreateUserResponse>(url, bodyObject, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(JSON.stringify(data, null, 4));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export { createTodo, getTodos };
