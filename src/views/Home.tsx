import React from "react";
import { observer } from "mobx-react-lite";
import Upload from "components/Upload";
import Tips from "components/Tips";
import styled from "styled-components";

const UploadWrapper = styled.section`
  margin-top: 40px;
`;

const Home: React.FC = observer(() => {
  return (
    <div>
      <Tips>请先登录后再操作！</Tips>
      <UploadWrapper>
        <Upload />
      </UploadWrapper>
    </div>
  );
});

export default Home;
