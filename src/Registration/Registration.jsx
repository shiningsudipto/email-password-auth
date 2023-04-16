import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase.config';

const auth = getAuth(app);
const Registration = () => {

    const [regError, setRegError] = useState('');
    const [successful, setSuccessful] = useState();
    const handleSubmit = (event) => {
        // prevent page refresh
        event.preventDefault();
        setSuccessful('');
        setRegError('');
        // collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        // console.log(email, password);
        //    validate
        if (!/(?=.*[A-Z])/.test(password)) {
            setRegError('add at least 1 uppercase');
            return;
        } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setRegError("add at least 2 numbers");
            return;
        } else if (password.length < 6) {
            setRegError("input at least 6 characters")
            return;
        }
        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setRegError('')
                // field reset
                event.target.reset();
                setSuccessful('user has been created successfully');
                // email verification
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert('Confirm email')
                    });
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    console.log("Profile updated");
                }).catch((error) => {
                    setRegError(error.message)
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                setRegError(errorMessage)
                // console.error(error)
            });
    }

    // password visible
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handlePasswordVisibility = () => {
        setPasswordVisible(prevState => !prevState);
    };

    return (
        <div>
            <h4>Registration</h4>
            <form onSubmit={handleSubmit}>
                <input type="name" name="name" id="name" placeholder='Your name' required />
                <br />
                <input type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input type={passwordVisible ? 'text' : 'password'} name="password" id="password" placeholder='Your Password' required />
                <br />

                <button type="button" onClick={handlePasswordVisibility}>{passwordVisible ? 'Hide Password' : 'Show Password'}</button>

                <br />
                {regError && <p>{regError}</p>
                }
                <input type="submit" value="Register" />
                <br />
                <p>{successful}</p>
            </form>
        </div>
    );
};

export default Registration;