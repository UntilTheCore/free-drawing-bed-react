import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import type { RuleRender, ValidatorRule } from "rc-field-form/lib/interface";

const RegisterWrapper = styled.div`
  max-width: 600px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.84);
  border-radius: 6px;
  padding: 24px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
`;

const Register: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const usernameValidator: ValidatorRule = {
    validator: (_, value: string, callback) => {
      if (/\W/.test(value)) return callback("不能出现字母数字下划线以外的字符");
      if (value.length < 3) return callback("用户名长度不能小于3");
      if (value.length > 10) return callback("用户名长度不能大于10");
      callback();
    },
  };

  const confirmPassword: RuleRender = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <RegisterWrapper>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名" },
            usernameValidator,
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 5, message: "位数需大于5" },
            { max: 20, message: "位数需小于20" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="verifyPassword"
          rules={[
            { required: true, message: "请再次输入密码" },
            confirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </RegisterWrapper>
  );
};

export default Register;
