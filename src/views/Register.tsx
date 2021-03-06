import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import type { RuleRender, ValidatorRule } from "rc-field-form/lib/interface";
import { useStores } from "store";
import { useHistory } from "react-router-dom";

const RegisterWrapper = styled.div`
  max-width: 600px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.84);
  border-radius: 6px;
  padding: 24px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  text-align: center;
`;

type FormType = {
  username: string;
  password: string;
  verifyPassword: string;
};

const Register: React.FC = () => {
  const { AuthStore } = useStores();
  const history = useHistory();

  const onFinish = (values: FormType) => {
    AuthStore.register(values.username, values.password)
      .then(userInfo => {
        console.log("注册成功！");
        history.push('/')
      })
      .catch((error) => {
        console.log("注册失败");
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const usernameValidator: ValidatorRule = {
    validator: (rule, value) => {
      if (value) {
        if (/\W/.test(value))
          return Promise.reject("用户名只能是字母数字下划线");
        if (value.length < 3) return Promise.reject("用户名长度不能小于3");
        if (value.length > 10) return Promise.reject("用户名长度不能大于10");
      }

      return Promise.resolve("");
    },
  };

  const confirmPassword: RuleRender = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("两次密码不一致");
    },
  });

  return (
    <RegisterWrapper>
      <Title>注册</Title>
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
            { required: true, message: "请输入用户名", type: "string" },
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
