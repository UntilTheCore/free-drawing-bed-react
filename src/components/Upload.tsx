import React from "react";
import { Upload as AntdUpload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import type { UploadProps } from "antd";
import { useStores } from "store";
import UploadResult from "components/UploadResult";

const { Dragger } = AntdUpload;

const Upload: React.FC = observer(() => {
  const { imageStore, userStore } = useStores();

  const dragProps: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      console.log(file);

      if (!userStore.getCurrentUser) {
        message.warning("用户未登录!");
        return false;
      }
      imageStore
        .upload(file, file.name)
        .then(() => {
          console.log("上传成功");
        })
        .catch((error) => {
          console.log("上传失败", error);
        });
      return false;
    },
  };

  return (
    <div>
      <Dragger {...dragProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <UploadResult></UploadResult>
    </div>
  );
});

export default Upload;
