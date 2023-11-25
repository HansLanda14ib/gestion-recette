import React, {useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {useNavigate} from "react-router-dom";

const Login = ({signInWithEmailAndPassword}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(email, password);
            navigate('/RecipeList');
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input your email!'}]}>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Password" name="password"
                           rules={[{required: true, message: 'Please input your password!'}]}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
