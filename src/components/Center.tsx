import React from "react";
import styled from "styled-components";

const CenterWrapper = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const Center: React.FC = (props) => {
  return (
    <CenterWrapper>
      {props.children}
    </CenterWrapper>
  );
};

export default Center;
