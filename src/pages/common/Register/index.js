import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
      <div className="card w-full max-w-md p-3 bg-white">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl break-words">
            Insider Threat trainee platform - REGISTER<i className="ri-user-add-line ml-1"></i>
          </h1>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <input type="text" className="w-full" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <input type="text" className="w-full" />
            </Form.Item>
            <Form.Item name="password" label="Password">
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