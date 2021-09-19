import React from "react";
import { useStores } from "store";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

const TipsWrapper = styled.div`
  height: 40px;
  line-height: 40px;
  background-color: #f8a75b;
  color: #fff;
  border-radius: 4px;
  margin-top: 40px;
  margin-bottom: 20px;
  padding-left: 10px;
`;

const Tips: React.FC = observer((props) => {
  const { userStore } = useStores();
  return userStore.getCurrentUser ? null : (
    <TipsWrapper>{props.children}</TipsWrapper>
  );
});

export default Tips;
