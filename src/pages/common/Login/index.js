import { Form, message, Radio, Input, Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, adminLogin } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("user");

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (userType === "admin") {
        response = await adminLogin(values);
      } else {
        response = await loginUser(values);
      }
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = userType === "admin" ? "/admin/exams" : "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient">
      <div className="w-full max-w-md p-4 bg-white rounded shadow">
        <h1 className="text-2xl text-center mb-4">Login</h1>
        <Form layout="vertical" onFinish={onFinish} className="login-form">
          <Form.Item label="User Type" name="userType" initialValue="user">
            <Radio.Group onChange={(e) => setUserType(e.target.value)}>
              <Radio value="user">User</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>
          {userType === "admin" && (
            <div className="mb-4 p-2 bg-light rounded">
              <p className="text-sm">Admin Credentials:</p>
              <p className="text-sm">Email: admin@cui.com</p>
              <p className="text-sm">Password: admin</p>
            </div>
          )}
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-primary">
              Login
            </Button>
          </Form.Item>
          <div className="text-center">
            <Link to="/register" className="underline">
              Not a member? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;