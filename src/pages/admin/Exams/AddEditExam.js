import { Form, message, Table } from "antd";
import React, { useEffect } from "react";
import {
  addExam,
  deleteQuestionById,
  editExamById,
  getExamById,
} from "../../../apicalls/exams";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Tabs } from "antd";
import AddEditQuestion from "./AddEditQuestion";
const { TabPane } = Tabs;

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = React.useState(null);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const params = useParams();
  
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (params.id) {
        response = await editExamById({
          ...values,
          examId: params.id,
        });
      } else {
        response = await addExam(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      console.log('getExamById response:', response); // Debug log
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
        setExamData(null); // Explicitly set to null if not found
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      setExamData(null); // Explicitly set to null on error
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const deleteQuestion = async (questionId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteQuestionById({
        questionId,
        examId: params.id
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
      ellipsis: true,
      responsive: ['md']
    },
    {
      title: "Question",
      dataIndex: "name",
      ellipsis: true,
      responsive: ['xs', 'sm'],
      render: (text) => (
        <div className="truncate max-w-xs">{text}</div>
      )
    },
    {
      title: "Options",
      dataIndex: "options",
      responsive: ['md'],
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div key={key}>
              {key} : {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      responsive: ['md'],
      render: (text, record) => {
        return ` ${record.correctOption} : ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line cursor-pointer"
            onClick={() => {
              setSelectedQuestion(record);
              setShowAddEditQuestionModal(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line cursor-pointer"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-2 md:px-4">
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />
      <div className="divider"></div>

      {(examData || !params.id) ? (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1" className="w-full">
            <TabPane tab="Exam Details" key="1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Form.Item label="Exam Name" name="name" rules={[{ required: true, message: 'Please enter exam name' }]}>
                    <input type="text" className="w-full p-2 border rounded" />
                  </Form.Item>
                </div>
                <div className="col-span-1">
                  <Form.Item label="Exam Duration (minutes)" name="duration" rules={[{ required: true, message: 'Please enter duration' }]}>
                    <input type="number" className="w-full p-2 border rounded" />
                  </Form.Item>
                </div>
                <div className="col-span-1">
                  <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
                    <select className="w-full p-2 border rounded">
                      <option value="">Select Category</option>
                      <option value="SOC Basic">SOC</option>
                      <option value="Network Basic">Networking</option>
                      <option value="SIEM Basic">SIEM</option>
                      <option value="Web Security Basics">Web Security</option>
                    </select>
                  </Form.Item>
                </div>
                <div className="col-span-1">
                  <Form.Item label="Total Marks" name="totalMarks" rules={[{ required: true, message: 'Please enter total marks' }]}>
                    <input type="number" className="w-full p-2 border rounded" />
                  </Form.Item>
                </div>
                <div className="col-span-1">
                  <Form.Item label="Passing Marks" name="passingMarks" rules={[{ required: true, message: 'Please enter passing marks' }]}>
                    <input type="number" className="w-full p-2 border rounded" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="primary-outlined-btn px-4 py-2"
                  type="button"
                  onClick={() => navigate("/admin/exams")}
                >
                  Cancel
                </button>
                <button className="primary-contained-btn px-4 py-2" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">
                <div className="flex justify-end mb-4">
                  <button
                    className="primary-outlined-btn px-4 py-2"
                    type="button"
                    onClick={() => setShowAddEditQuestionModal(true)}
                  >
                    Add Question
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <Table
                    columns={questionsColumns}
                    dataSource={examData?.questions || []}
                    rowKey="_id"
                    scroll={{ x: 'max-content' }}
                    pagination={{
                      pageSize: 5,
                      responsive: true,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '20']
                    }}
                  />
                </div>
              </TabPane>
            )}
          </Tabs>
        </Form>
      ) : (
        <div className="text-center text-red-500 mt-8">No exam found with this ID.</div>
      )}

      {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExam;