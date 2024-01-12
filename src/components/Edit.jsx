import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';

const BASE_URL = 'https://659abd4b652b843dea53ef2e.mockapi.io/api/user1/users1';

const Edit = () => {
  const { id } = useParams();

  const [form] = Form.useForm();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  async function fetchTodo(todoId) {
    try {
      const response = await axios.get(`${BASE_URL}/${todoId}`);
      form.setFieldsValue(response.data);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  }

  useEffect(() => {
    fetchTodo(id);
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, values);
      setUpdateSuccess(true);
      window.alert('Update Successfully');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="container text-center mt-3">
     
        <h2 style={{ textAlign:'center', marginTop:'50px' }}>Form Edit</h2>
        <Form 
          form={form}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, alignItems:'center', justifyContent:'center', marginLeft:'330px',marginTop:'10px' }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button style={{marginLeft:'100px'}} type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to={`/`}>
          <Button style={{ marginLeft: '20px', backgroundColor:'#CA2D23',color:'white' }} >
            Back
          </Button>
        </Link>

          </Form.Item>
        </Form>
      </div>
   
  );
};

export default Edit;
