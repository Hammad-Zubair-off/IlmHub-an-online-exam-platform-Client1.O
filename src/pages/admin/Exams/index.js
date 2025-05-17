import { message, Table, Space, Button, Popconfirm, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExamById, getAllExams } from "../../../apicalls/exams";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [tableWidth, setTableWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setTableWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteExamById({
        examId,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Responsive columns configuration
  const getColumns = () => {
    // Base columns always visible
    const baseColumns = [
      {
        title: "Exam Name",
        dataIndex: "name",
        ellipsis: true,
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (_, record) => (
          <Space size="small">
            <Button 
              type="text" 
              icon={<i className="ri-pencil-line"></i>}
              onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
            />
            <Popconfirm
              title="Are you sure you want to delete this exam?"
              onConfirm={() => deleteExam(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                type="text" 
                icon={<i className="ri-delete-bin-line"></i>}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];

    // Columns to add as screen size increases
    const additionalColumns = [
      {
        title: "Duration",
        dataIndex: "duration",
        width: 100,
      },
      {
        title: "Category",
        dataIndex: "category",
        ellipsis: true,
      },
      {
        title: "Total Marks",
        dataIndex: "totalMarks",
        width: 110,
      },
      {
        title: "Passing Marks",
        dataIndex: "passingMarks",
        width: 120,
      },
    ];

    // Progressively add columns based on screen width
    if (tableWidth > 500) {
      baseColumns.splice(1, 0, additionalColumns[0]); // Add Duration
    }
    
    if (tableWidth > 700) {
      baseColumns.splice(2, 0, additionalColumns[1]); // Add Category
    }
    
    if (tableWidth > 900) {
      baseColumns.splice(3, 0, additionalColumns[2], additionalColumns[3]); // Add Marks columns
    }

    return baseColumns;
  };

  // Handle expandable row for small screens
  const expandedRowRender = (record) => {
    // Show these details when row is expanded (mainly on mobile)
    const hiddenInfo = [];
    
    if (tableWidth <= 500) {
      hiddenInfo.push({ label: "Duration", value: record.duration });
    }
    
    if (tableWidth <= 700) {
      hiddenInfo.push({ label: "Category", value: record.category });
    }
    
    if (tableWidth <= 900) {
      hiddenInfo.push(
        { label: "Total Marks", value: record.totalMarks },
        { label: "Passing Marks", value: record.passingMarks }
      );
    }
    
    // If no hidden info (on desktop), don't make expandable
    if (hiddenInfo.length === 0) return null;

    return (
      <div className="p-4">
        {hiddenInfo.map((item, index) => (
          <div key={index} className="flex justify-between py-1">
            <Typography.Text strong>{item.label}:</Typography.Text>
            <Typography.Text>{item.value}</Typography.Text>
          </div>
        ))}
      </div>
    );
  };

  // Check if we need expandable rows based on screen size
  const shouldUseExpandable = tableWidth <= 900;

  useEffect(() => {
    getExamsData();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mt-2 items-start sm:items-end mb-4">
        <PageTitle title="Exams" />
        <Button
          className="primary-outlined-btn mt-2 sm:mt-0"
          icon={<i className="ri-add-line"></i>}
          onClick={() => navigate("/admin/exams/add")}
        >
          Add Exam
        </Button>
      </div>
      <div className="divider"></div>

      <Table 
        columns={getColumns()} 
        dataSource={exams}
        rowKey="_id"
        expandable={shouldUseExpandable ? {
          expandedRowRender: expandedRowRender,
          rowExpandable: (record) => shouldUseExpandable,
        } : undefined}
        scroll={{ x: 'max-content' }}
        pagination={{ 
          responsive: true,
          position: ['bottomCenter'],
          showSizeChanger: tableWidth > 500,
          showTotal: tableWidth > 700 ? (total) => `Total ${total} exams` : undefined,
        }}
      />
    </div>
  );
}

export default Exams;