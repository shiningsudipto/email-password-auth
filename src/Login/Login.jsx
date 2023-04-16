import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase.config';

const Login = () => {
    const auth = getAuth(app);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [name, setName] = useState('');

    const emailRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');
        setSuccess('');
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                if (!loggedUser.emailVerified) {

                }
                setError('')
                setSuccess("User login successful")
            })
            .catch(error => {
                setError(error.message)
            })
    }
    const handleResetPassword = event => {
        const email = emailRef.current.value;
        console.log(email);
        if (!email) {
            alert('Please provide your email to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Please check your email")
            })
            .catch(error => setError(error.message))
    }

    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in
            console.log(user.displayName); // Display the display name
            const name = user.displayName;
            setName(name)
        }
    })



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    ref={emailRef}
                    required
                    placeholder="Your Email"
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder=" Your Password"
                />
                <br />
                <button type="submit">Log In</button>
            </form>
            <p>Forgotten password? <button onClick={handleResetPassword}>reset password</button></p>
            <p>{name}</p>
            {
                <div>
                    <p>{error}</p>
                    <p>{success}</p>
                </div>
            }
        </div>
    );
};

export default Login;