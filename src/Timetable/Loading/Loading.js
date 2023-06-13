import React from "react";
import { Background, LoadingText } from "./Styles";
import Spinner from "./Spinner.gif";

export default () => {
  return (
    <Background>
      <img
        style={{ margin: 0 }}
        className="loadingimg"
        src={Spinner}
        alt="로딩중"
        width="5%"
      />
      <LoadingText>
        강의 정보를 불러오는 중입니다. <br /> 잠시만 기다려주세요
      </LoadingText>
    </Background>
  );
};
