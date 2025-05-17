import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../../apicalls/users';
import { SetUser } from '../../../redux/usersSlice';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import PageTitle from '../../../components/PageTitle';

function Profile() {
  const { user } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      // Here you would call an API to update the user profile
      // For now, we'll simulate a successful update
      setTimeout(() => {
        dispatch(HideLoading());
        message.success('Profile updated successfully!');
      }, 1000);
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <PageTitle title="Profile" />
      <div className="flex justify-center">
        <Card className="bg-white w-full max-w-lg">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-primary">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;