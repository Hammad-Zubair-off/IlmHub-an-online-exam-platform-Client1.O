const { default: axiosInstance } = require(".");

// add report
export const addReport = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/reports/add-report", payload);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
            data: null
        };
    }
}

// get all reports
export const getAllReports = async (filters) => {
    try {
        const response = await axiosInstance.post("/api/reports/get-all-reports" , filters);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
            data: null
        };
    }
} 

// get all reports by user
export const getAllReportsByUser = async () => {
    try {
        const response = await axiosInstance.post("/api/reports/get-all-reports-by-user");
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Unknown error",
            data: null
        };
    }
}