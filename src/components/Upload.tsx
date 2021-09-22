import React from "react";
import { Upload as AntdUpload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import type { UploadProps } from "antd";
import { useStores } from "store";
import UploadResult from "components/UploadResult";
import UploadProgress from "components/UploadProgress";

const { Dragger } = AntdUpload;

const Upload: React.FC = observer( () => {
  const { imageStore, userStore } = useStores();

  const dragProps: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      console.log( file );

      if ( !/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test( file.type ) ) {
        message.error( "只能上传png/jpg/svg/gif格式的图片" );
        return false;
      }

      if ( file.size > 1024 * 1024 ) {
        message.error( "图片大小不能超过1M" );
        return false;
      }

      if ( !userStore.getCurrentUser ) {
        message.warning( "用户未登录!" );
        return false;
      }
      imageStore
      .upload( file, file.name )
      .then( () => {
        console.log( "上传成功" );
      } )
      .catch( (error) => {
        console.log( "上传失败", error );
      } );
      return false;
    },
  };

  return (
    <div>
      <UploadProgress>
        <Dragger { ...dragProps }>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            点击或拖拽上传图片
          </p>
          <p className="ant-upload-hint">
            图片仅支持 ".png/.jpg/.svg/.gif" 格式文件，最大不超过1M
          </p>
        </Dragger>
      </UploadProgress>
      <UploadResult />
    </div>
  );
} );

export default Upload;
