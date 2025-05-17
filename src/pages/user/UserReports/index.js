import React from "react";
import PageTitle from "../../../components/PageTitle";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReportsByUser } from "../../../apicalls/reports";
import { useEffect } from "react";
import moment from "moment";

function UserReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  
  // Responsive columns configuration
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam ? record.exam.name : "N/A"}</>,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{record.createdAt ? moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss") : "N/A"}</>
      ),
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "shortDate",
      render: (text, record) => (
        <>{record.createdAt ? moment(record.createdAt).format("DD-MM-YYYY") : "N/A"}</>
      ),
      responsive: ["xs", "sm"],
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam ? record.exam.totalMarks : "N/A"}</>,
      responsive: ["md"],
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam ? record.exam.passingMarks : "N/A"}</>,
      responsive: ["md"],
    },
    {
      title: "Obtained",
      dataIndex: "obtainedMarks",
      render: (text, record) => <>{record.result ? record.result.obtainedMarks : "N/A"}</>,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <span className={record.result && record.result.Status === "Pass" ? "text-success" : "text-error"}>
          {record.result ? record.result.Status : "N/A"}
        </span>
      ),
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4">
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="reports-table-container">
        <Table 
          columns={columns} 
          dataSource={reportsData} 
          rowKey={(record) => record._id} 
          scroll={{ x: "max-content" }}
          pagination={{ 
            pageSize: 10,
            responsive: true,
            showSizeChanger: false
          }}
        />
      </div>
    </div>
  );
}

export default UserReports;