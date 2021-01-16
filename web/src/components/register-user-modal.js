import { useCallback, useEffect } from "react";
import { useApi, useInputs } from "../hooks";
import apiClient from "../libs/api-client";

export const RegisterUserModal = ({ open, onClose }) => {
  const [
    { email, password, confirmPassword, nickname },
    onChange,
    resetForm,
  ] = useInputs({
    email: "",
    password: "",
    confirmPasword: "",
    nickname: "",
  });
  const [register, registerData, loading, error] = useApi(apiClient.register);

  const emitClose = useCallback(() => {
    onClose && onClose();
    resetForm();
  }, [onClose, resetForm]);

  useEffect(() => {
    // loading은 데이터 주입받은 직후 false로 바뀌도록 구현돼있다.
    if (loading && registerData?.token) {
      alert("회원가입에 성공했습니다.");
      console.log(registerData?.token);
      emitClose();
    }
  }, [loading, registerData, emitClose]);

  useEffect(() => {
    if (error) {
      alert(error.errorMessage);
    }
  }, [error]);

  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={() => emitClose()}>창 닫기</button>
      <h3>회원가입</h3>
      <input
        name="email"
        value={email}
        disabled={loading}
        onChange={onChange}
        type="text"
        placeholder="사용할 이메일을 입력해주세요"
      />
      <input
        name="password"
        value={password}
        disabled={loading}
        onChange={onChange}
        type="password"
        placeholder="사용할 패스워드를 입력해주세요"
      />
      <input
        name="confirmPassword"
        value={confirmPassword}
        disabled={loading}
        onChange={onChange}
        type="password"
        placeholder="패스워드를 다시 한번 입력해주세요"
      />
      <input
        name="nickname"
        value={nickname}
        disabled={loading}
        onChange={onChange}
        type="text"
        placeholder="닉네임을 입력해주세요"
      />
      <button
        onClick={() => register({ email, password, confirmPassword, nickname })}
        disabled={loading}
      >
        가입하기
      </button>
    </div>
  );
};
