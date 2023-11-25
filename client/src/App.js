import React, {useEffect, useState} from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import RecipeList from "./Components/RecipeList";
import Navbar from "./Components/Navbar";

const db = firebase.firestore();

function App() {
    const [auth, setAuth] = useState(window.localStorage.getItem('auth') === 'true');
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem('auth', 'true');
                userCred.getIdToken().then((token) => {
                    console.log(token)
                    setToken(token);
                    // Save token in local storage
                    window.localStorage.setItem('token', token);
                });
            }
        });
    }, []);
    const signUpWithEmailAndPassword = async (email, password, firstName, lastName, phoneNumber) => {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            //console.log("user")
            //console.log(user.uid)
            const userDocRef = db.collection('users').doc(user.uid);
            await userDocRef.set({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                role: 'owner',
                _id: user.uid,
            });

            await user.updateProfile({
                displayName: `${firstName} ${lastName}`,
            });


        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    const logOut = () => {
        firebase.auth().signOut().then(() => {
            setAuth(false);
            window.localStorage.setItem('auth', 'false');
        });
    };

    const signInWithEmailAndPassword = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Error signing in:', error.message);
            setError(error.message);
        }
    };

    return (
        <BrowserRouter>
            <Navbar auth={auth} logOut={logOut}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login signInWithEmailAndPassword={signInWithEmailAndPassword}/>}/>
                <Route path="/register"
                       element={<Register signUpWithEmailAndPassword={signUpWithEmailAndPassword}/>}/>
                {auth && <Route path="/RecipeList" element={<RecipeList token={token}/>}/>}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
