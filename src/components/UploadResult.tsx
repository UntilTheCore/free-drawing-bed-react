import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite/";
import { useStores } from "store";
import styled from "styled-components";
import { Input } from "antd";

const UploadResultWrapper = styled.div`
  border: 1px dashed #ccc;
  margin-top: 20px;
  padding: 14px;

  p {
    margin: 10px 0;
  }

  h2 {
    text-align: center;
    font-weight: bold;
  }

  img {
    max-width: 300px;
  }

  section {
    display: flex;
    width: 240px;

    > input {
      margin-right: 10px;
    }
  }
`;

const UploadResult: React.FC = observer(() => {
  const { imageStore } = useStores();
  const { url, filename } = imageStore.getServerFile?.attributes
    ? imageStore.getServerFile.attributes
    : { url: "", filename: "" };

  const onWidthChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    localStore.setWidth(e.target.value);
  };

  const onHeightChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    localStore.setHeight(e.target.value);
  };

  const localStore = useLocalObservable(() => ({
    width: "",
    height: "",
    setWidth(width: string) {
      this.width = width;
    },
    setHeight(height: string) {
      this.height = height;
    },
    get getWidthStr() {
      return this.width ? `/w/${this.width}` : "";
    },
    get getHeightStr() {
      return this.height ? `/h/${this.height}` : "";
    },
    get getFullStr() {
      return (
        imageStore.getServerFile?.attributes.url +
        "?imageViews2/0" +
        this.getWidthStr +
        this.getHeightStr
      );
    },
  }));

  return imageStore.getServerFile ? (
    <UploadResultWrapper>
      <h2>上传结果</h2>
      <p>线上地址</p>
      <p>
        <a target="_blank" href={url} rel="noreferrer">
          {url}
        </a>
      </p>
      <p>文件名</p>
      <p>{filename}</p>
      <p>图片预览</p>
      <img src={url} alt={filename} />
      <p>更多尺寸</p>
      <section>
        <Input
          type="number"
          placeholder="宽度（可选）"
          min="0"
          onChange={onWidthChange}
        ></Input>
        <Input
          type="number"
          placeholder="高度（可选）"
          min="0"
          onChange={onHeightChange}
        ></Input>
      </section>
      <p>图片新链接：</p>
      <a href={localStore.getFullStr} target="_blank" rel="noreferrer">
        {localStore.getFullStr}
      </a>
    </UploadResultWrapper>
  ) : null;
});

export default UploadResult;
