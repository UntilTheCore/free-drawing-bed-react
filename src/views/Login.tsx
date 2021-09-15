import React, { useRef } from "react";
import { useStores } from "store";
import { observer } from "mobx-react-lite";

const Login: React.FC = observer(() => {
  const { AuthStore } = useStores();

  const inputRef = useRef<HTMLInputElement>(null);

  const onHandleBlur = () => {
    if (inputRef.current !== null) {
      console.log(inputRef.current.value);
      AuthStore.setUserName(inputRef.current.value);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <section>username: {AuthStore.getUserName}</section>
      <input type="text" ref={inputRef} onChange={onHandleBlur} />
    </>
  );
});

export default Login;
