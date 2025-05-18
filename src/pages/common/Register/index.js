import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        form.resetFields();
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient">
      <div className="card w-full max-w-md p-3 bg-white">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl break-words">
            IlmHub an online exam platform - REGISTER<i className="ri-user-add-line ml-1"></i>
          </h1>
          <div className="divider"></div>
          <Form 
            form={form}
            layout="vertical" 
            className="mt-2" 
            onFinish={onFinish}
            validateTrigger="onBlur"
          >
            <Form.Item 
              name="name" 
              label="Name"
              rules={[
                { required: true, message: 'Please enter your name' },
                { min: 3, message: 'Name must be at least 3 characters' }
              ]}
            >
              <input type="text" className="w-full" />
            </Form.Item>
            <Form.Item 
              name="email" 
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <input type="email" className="w-full" />
            </Form.Item>
            <Form.Item 
              name="password" 
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <input type="password" className="w-full" />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-full"
              >
                Register
              </button>
              <Link to="/login" className="text-center">Already a member? Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;