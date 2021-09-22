import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStores } from "store";
import { Progress } from "antd";

const UploadProgressWrapper = styled.div`
  position : relative;
  width    : 100%;
`;

const ProgressWrapper = styled.section`
  display          : flex;
  justify-content  : center;
  align-items      : center;
  position         : absolute;
  z-index          : 2;
  background-color : rgba(230, 247, 255, .8);
  width            : 100%;
  height           : 100%;
`;

const UploadProgress = observer( (props) => {
  const { imageStore } = useStores();
  return (
    <UploadProgressWrapper>
      {
        imageStore.getIsUploading ? (
          <ProgressWrapper>
            <Progress type="circle" percent={ imageStore.getPercent } width={ 100 } />
          </ProgressWrapper>
        ) : null
      }
      { props.children }
    </UploadProgressWrapper>
  );
} );

export default UploadProgress;