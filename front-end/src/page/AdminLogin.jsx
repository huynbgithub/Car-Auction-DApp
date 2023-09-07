import React, { useState } from "react";
import { Container, Form, Button } from 'react-bootstrap';

export default function AdminLogin() {
    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');

    const handleAdminNameChange = (e) => {
        setAdminName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Here you can add your login logic.
        console.log('Admin Name:', adminName);
        console.log('Password:', password);
        // Replace the above console.log statements with your authentication logic.
    };

    return (
        <Container style={{ width: 300 }}>
            <div className="login-container">
                <Form>
                    <Form.Group controlId="formBasicAdminName">
                        <Form.Label>Adminname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter admin name"
                            value={adminName}
                            onChange={handleAdminNameChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>

                    <Button
                        variant="success"
                        type="button"
                        onClick={handleLogin}
                        className="login-button mt-2 float-end"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
