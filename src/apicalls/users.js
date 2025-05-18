const { default: axiosInstance } = require(".");

export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/register', payload);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
            data: null
        };
    }
}

export const loginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/login', payload);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
            data: null
        };
    }
}

export const getUserInfo = async () => {
    try {
        const response = await axiosInstance.post('/api/users/get-user-info');
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
            data: null
        };
    }
}

export const adminLogin = async (values) => {
    try {
        const response = await axiosInstance.post('/api/users/admin-login', values);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
            data: null
        };
    }
}
