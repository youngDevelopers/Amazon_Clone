import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {darkLogo} from '../assets/assetsExports';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {RotatingLines} from "react-loader-spinner";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { setUserInfo } from '../redux/amazonSlice';

function SignIn() {

    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [emailFirebaseErr, setEmailFirebaseErr] = useState("");
    const [passwordFirebaseErr, setPasswordFirebaseErr] = useState("");

    //for loading and success 
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
        setEmailFirebaseErr("");
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
        setPasswordFirebaseErr("");
    };

    //email validation
    const emailValidation = (email) => {
        return String(email).toLowerCase().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    }

    const handleSignIn = (e) => {
        e.preventDefault();

        if(!email){
            setErrEmail("Please Enter your email")
        }else{
            if(!emailValidation(email)){
                setErrEmail("Enter a valid Email")
            }
        }
        if(!password){
            setErrPassword("Enter Your Password")
        }

        if(email && emailValidation(email) && password){
            //console.log(email, password);

            //set loading true since we sending data to the firebase for authentication
            setLoading(true);

            //signing in
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    //console.log(user);

                    //Once we have logged in we need to dispatch user info
                    dispatch(setUserInfo({
                        _id: user.uid,
                        userName: user.displayName,
                        email: user.email,
                        image: user.photoURL
                    }))

                    //once the user is signed in we need to set loading false
                    setLoading(false);

                    // Set account successfully created
                    setSuccessMessage("Logged In Successfully, Welcome back");

                    //Once the successfull message is delayed we need to set timer which will allow render or navigate to sign in route
                    setTimeout( () =>{
                        navigate("/");
                    }, 2000);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoading(false);//we need to set loading false if there is an error in allowing signing up
                    //console.log(errorCode);

                    //incase there is an err
                    if(errorCode.includes("auth/user-not-found")){
                        setEmailFirebaseErr("Invalid Email");
                    }
                    if(errorCode.includes("auth/wrong-password")){
                        setPasswordFirebaseErr("Wrong password!!! try again");
                    }

            });

            //after signing in we need to clear data in the form fields
            //setEmail("");
            //setPassword("");
        }
    }

    return (
        <div className="w-full">
            <div className="w-full bg-gray-100 pb-10 pt-2">
                {
                    successMessage ? (
                        <div className="w-full flex justify-center items-center py-32">
                            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">{successMessage}</p>
                        </div>
                    ) : (
                        <form className="w-[350px] mx-auto flex flex-col items-center" >
                        <img className="w-32 mb-4" src={darkLogo} alt="amazon-logo"/>
                        <div className="w-full border border-zinc-200 p-6">
                            <h2 className="font-titleFont text-3xl font-medium mb-4">Sign In</h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Email or Phone Number</p>
                                    <input onChange={handleEmail} className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100" type="email" value={email}/>
                                    {
                                        errEmail && (
                                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                                <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{errEmail}
                                            </p>
                                        )
                                    }
                                    {
                                        emailFirebaseErr && (
                                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                                <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{emailFirebaseErr}
                                            </p>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Password</p>
                                    <input onChange={handlePassword} className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100" type="password" value={password}/>
                                    {
                                        errPassword && (
                                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                                <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{errPassword}
                                            </p>
                                        )
                                    }
                                    {
                                        passwordFirebaseErr && (
                                            <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                                <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{passwordFirebaseErr}
                                            </p>
                                        )
                                    }
                                </div>
                                <button onClick={handleSignIn} className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active-:shadow-amazonInput">
                                    Continoue
                                </button>
                                {
                                    loading && ( //if loading then show loader
                                        <div className="flex justify-center">
                                            <RotatingLines
                                                strokeColor="#febd69"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="50"
                                                visible={true}
                                                />
                                        </div>
                                    )
                                }
                            </div>
                            <p className="text-sm text-black leading-4 mt-4">
                                By Continuing, you agree to Amazon's <span className="text-blue-600">Conditions of use {" "}</span> and <span className="text-blue-600">Private Notice.</span>
                            </p>
                            <p className="text-sm text-gray-600 mt-4 cursor-pointer group"><ArrowRightIcon /> <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">Need Help ?</span></p>
                        </div>
                        <div className="w-full text-sm text-gray-600 mt-4 flex items-center">
                            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
                            <span className="w-1/3 text-center">New to Amazon?</span>
                            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
                        </div>
                        <Link className="w-full" to='/register' >
                            <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                                Create your Amazon Account
                            </button>
                        </Link>
                    </form>
                )
                }
            </div>
            <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 h-20 flex flex-col gap-4 justify-center items-center py-10">
                <div className="flex items-center gap-6">
                    <p className="text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Conditions of use</p>
                    <p className="text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Privacy Notice</p>
                    <p className="text-sm text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Security</p>
                </div>
                <p className="tetx-xs text-gray-600">© 1996-2023, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
    )
}

export default SignIn
