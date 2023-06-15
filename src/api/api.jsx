import axios from "axios";
import SERVER from "./url";

export const addUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/signUp`, userInfo);
    if (response.status === 200 || response.status === 201) {
      alert("회원가입이 완료되었습니다.");
      console.log(userInfo);
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert("이미 존재하는 아이디입니다.");
    }
  }
};

export const authUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/login`, userInfo);
    console.log(response.data);
    if (response.status === 200) {
      const accesstoken = response.data.token;

      const config = {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      };

      return response;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// todo 저장
export const addTodo = async (todoitem) => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
      },
    };
    const response = await axios.post(`${SERVER}/api/todo`, todoitem, config);
    if (response.status === 200) {
      alert("투두가 생성되었습니다.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Add todo error");
  }
};

// 투두 삭제
export const deleteTodo = async (todoId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
      },
    };
    const response = await axios.delete(`${SERVER}/api/todo/${todoId}`, config);
    if (response.status === 200) {
      alert("투두가 삭제되었습니다.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("delete folder error");
  }
};

// 투두 목록 조회
export const getTodo = async (date) => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
      },
    };
    const response = await axios.get(`${SERVER}/api/todo/${date}`, config);
    if (response.status === 200) {
      alert("투두가 조회되었습니다.");
      return response.data;
    }
  } catch (err) {
    throw new Error("fetch department error");
  }
};

//투두 수정
export const updateTodo = async (todoId, updatedTodo) => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
      },
    };
    const response = await axios.put(
      `/api/todos/${todoId}`,
      updatedTodo,
      config
    );
    if (response.status === 200) {
      alert("투두가 수정되었습니다.");
      return response.data;
    }
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};
