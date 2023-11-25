import React, {useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {useNavigate} from "react-router-dom";


const Register = ({signUpWithEmailAndPassword}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async () => {
        try {
            await signUpWithEmailAndPassword(email, password, firstName, lastName, phoneNumber);
            // If registration succeeds, navigate to the list of recipes
            navigate('/RecipeList');
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <Form onFinish={handleSubmit}>
                <Form.Item label="First Name" name="firstName"
                           rules={[{required: true, message: 'Please input your first name!'}]}>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Last Name" name="lastName"
                           rules={[{required: true, message: 'Please input your last name!'}]}>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input your email!'}]}>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Password" name="password"
                           rules={[{required: true, message: 'Please input your password!'}]}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Phone Number" name="phoneNumber"
                           rules={[{required: true, message: 'Please input your phone number!'}]}>
                    <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

};

export default Register;
