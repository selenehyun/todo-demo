import { useCallback, useEffect } from "react";
import { useApi, useInputs } from "../hooks";
import apiClient from "../libs/api-client";

export const LoginModal = ({ open, onClose }) => {
  const [{ email, password }, onChange, resetForm] = useInputs({
    email: "",
    password: "",
  });
  const [login, loginData, loading, error] = useApi(apiClient.login);

  const emitClose = useCallback(() => {
    onClose && onClose();
    resetForm();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (loading && loginData?.token) {
      // 귀찮아서 토큰 주입하고 새로고침한다.
      localStorage.setItem("token", loginData?.token);
      emitClose();
      window.location.reload();
    }
  }, [loading, loginData, emitClose]);

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
      <h3>로그인</h3>
      <input
        name="email"
        value={email}
        disabled={loading}
        onChange={onChange}
        type="text"
        placeholder="가입된 이메일을 입력해주세요"
      />
      <input
        name="password"
        value={password}
        disabled={loading}
        onChange={onChange}
        type="password"
        placeholder="패스워드를 입력해주세요"
      />
      <button onClick={() => login({ email, password })} disabled={loading}>
        로그인
      </button>
    </div>
  );
};
