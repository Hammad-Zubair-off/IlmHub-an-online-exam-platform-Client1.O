import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReports } from "../../../apicalls/reports";
import moment from "moment";

function AdminReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = React.useState({
    examName: "",
    userName: "",
  });

  // Define columns with responsive considerations
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
      ellipsis: true,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
      responsive: ["md"],
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>,
      responsive: ["lg"],
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.obtainedMarks}</>,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => <>{record.result.Status}</>,
    },
  ];

  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReports(tempFilters);
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
    getData(filters);
  }, []);

  return (
    <div className="admin-reports-container">
      <PageTitle title="Reports" />
      <div className="divider"></div>
      
      {/* Responsive search form */}
      <div className="search-form">
        <div className="search-fields">
          <input
            type="text"
            placeholder="Exam"
            value={filters.examName}
            onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
            className="search-input"
          />
          <input
            type="text"
            placeholder="User"
            value={filters.userName}
            onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
            className="search-input"
          />
        </div>
        <div className="search-buttons">
          <button
            className="primary-outlined-btn"
            onClick={() => {
              setFilters({
                examName: "",
                userName: "",
              });
              getData({
                examName: "",
                userName: "",
              });
            }}
          >
            Clear
          </button>
          <button 
            className="primary-contained-btn" 
            onClick={() => getData(filters)}
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Responsive table with scroll options */}
      <div className="table-container">
        <Table 
          columns={columns} 
          dataSource={reportsData} 
          className="mt-2"
          scroll={{ x: 'max-content' }}
          pagination={{ 
            responsive: true,
            position: ['bottomCenter']
          }}
        />
      </div>
      
      {/* Add CSS for responsiveness */}
      <style jsx>{`
        .admin-reports-container {
          padding: 10px;
          width: 100%;
        }
        
        .search-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .search-fields {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .search-input {
          flex: 1;
          min-width: 200px;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
        }
        
        .search-buttons {
          display: flex;
          gap: 10px;
        }
        
        .table-container {
          overflow-x: auto;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .search-form {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          
          .search-fields {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminReports;