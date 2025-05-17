import { Form, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addQuestionToExam, editQuestionById } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion
}) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };

      let response
      if(selectedQuestion){
        response = await editQuestionById({
          ...requiredPayload,
          questionId: selectedQuestion._id
        })
      }
      else{
        response = await addQuestionToExam(requiredPayload);
      }
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
      setSelectedQuestion(null)
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={selectedQuestion ? "Edit Question" : "Add Question"}
      visible={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false)
        setSelectedQuestion(null)
      }}
      width="100%"
      style={{ maxWidth: "600px", margin: "0 auto" }}
      centered
    >
      <Form 
        onFinish={onFinish} 
        layout="vertical"
        initialValues={{
          name: selectedQuestion?.name,
          A: selectedQuestion?.options?.A,
          B: selectedQuestion?.options?.B,
          C: selectedQuestion?.options?.C,
          D: selectedQuestion?.options?.D,
          correctOption: selectedQuestion?.correctOption,
        }}
      >
        <Form.Item 
          name="name" 
          label="Question"
          rules={[{ required: true, message: "Please enter the question!" }]}
        >
          <input type="text" className="w-full p-2 border rounded" />
        </Form.Item>
        
        <Form.Item 
          name="correctOption" 
          label="Correct Option" 
          rules={[{ required: true, message: "Please select the correct option!" }]}
        > 
          <select className="w-full p-2 border rounded">
            <option value="">Select Correct Option</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item 
            name="A" 
            label="Option A"
            rules={[{ required: true, message: "Please enter option A!" }]}
          >
            <input type="text" className="w-full p-2 border rounded" />
          </Form.Item>
          <Form.Item 
            name="B" 
            label="Option B"
            rules={[{ required: true, message: "Please enter option B!" }]}
          >
            <input type="text" className="w-full p-2 border rounded" />
          </Form.Item>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item 
            name="C" 
            label="Option C"
            rules={[{ required: true, message: "Please enter option C!" }]}
          >
            <input type="text" className="w-full p-2 border rounded" />
          </Form.Item>
          <Form.Item 
            name="D" 
            label="Option D"
            rules={[{ required: true, message: "Please enter option D!" }]}
          >
            <input type="text" className="w-full p-2 border rounded" />
          </Form.Item>
        </div>

        <div className="flex justify-end mt-4 gap-3">
          <button
            className="primary-outlined-btn px-4 py-2"
            type="button"
            onClick={() => {
              setShowAddEditQuestionModal(false);
              setSelectedQuestion(null);
            }}
          >
            Cancel
          </button>
          <button className="primary-contained-btn px-4 py-2" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;