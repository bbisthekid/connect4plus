import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth, AuthProvider } from "../contexts/AuthContext";
import "./pages.css";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                usernameRef.current.value
            );
            history.push("/dashboard");
        } catch {
            setError("Failed to create acount");
        }
        setLoading(false);
    }

    return (
        <AuthProvider>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <>
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Sign Up</h2>
                                {error && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                <Form id="signup-form" onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            ref={emailRef}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group id="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            ref={usernameRef}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            ref={passwordRef}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group id="password-confirm">
                                        <Form.Label>
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            ref={passwordConfirmRef}
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        disabled={loading}
                                        className="w-100"
                                        type="submit"
                                    >
                                        Sign Up
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Already a Member? <Link to="/login">Log In</Link>.
                        </div>
                    </>
                </div>
            </Container>
        </AuthProvider>
    );
}
