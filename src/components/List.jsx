import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert, Table, Button, Modal, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const BASE_URL = 'https://659abd4b652b843dea53ef2e.mockapi.io/api/user1/users1';

function List() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTodo() {
    try {
      const response = await axios.get(BASE_URL);
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  async function deleteTodo(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/${id}`);
      await fetchTodo();
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  }
    const [showAlert, setShowAlert] = useState(false);

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteTodo(id)
          .then(() => {
            setShowAlert(true); 
            fetchTodo(); 
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      },
    });
  };


  useEffect(() => {
    fetchTodo();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (text, record) => (
        <Link to={`/Edit/${record.id}`}>
          <Button style={{backgroundColor:'#E4BB25', color:'white'}}>Edit</Button>
        </Link>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, record) => (
        <Button
          style={{ backgroundColor: '#CA2D23',color:'white'}}
          onClick={() => showDeleteConfirm(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className='container mt-3'>
    {isLoading && <LoadingIndicator />}
    {!isLoading && (
      <div>
        <h2 style={{textAlign:'center', marginTop:'10px'}}>Dataset API</h2>
        {showAlert && ( 
          <Alert
            message="Delete success"
            description="Detailed description and advice about successful copywriting."
            type="success"
            showIcon
            closable
            onClose={() => setShowAlert(false)} 
          />
        )}
        <div className='col-12 mt-2'>
          <Table columns={columns} dataSource={todos} />
        </div>
      </div>
    )}
  </div>
);
}

const LoadingIndicator = () => (
  <div className='text-center' style={{ marginLeft: '400px' }}>
    Loading...
  </div>
);

export default List;
