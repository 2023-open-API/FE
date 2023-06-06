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
      const token = response.data.token;

      localStorage.setItem("accessToken", token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return response;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
