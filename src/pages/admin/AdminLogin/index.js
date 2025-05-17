import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../apicalls/users';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Admin login form submitted", values);
    try {
      dispatch(ShowLoading());
      const response = await adminLogin(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success('Admin login successful');
        localStorage.setItem('token', response.data);
        navigate('/admin/exams');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient">
      <div className="w-400 p-4 bg-white rounded shadow">
        <h1 className="text-2xl text-center mb-4">Admin Login</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-primary">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin; 