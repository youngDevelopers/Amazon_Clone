import React, {useState} from 'react';
import {darkLogo} from '../assets/assetsExports';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {RotatingLines} from "react-loader-spinner";
import {motion} from "framer-motion";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SignUp() {

    const navigate = useNavigate();

    const auth = getAuth();

    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Error messages for each input
    const [errClientName, setErrClientName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errConfirmPassword, setErrConfirmPassword] = useState("");
    const [firebaseErr, setFirebaseErr] = useState("");

    //for loading and success 
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    //Start of handleName change functions
    const handleName = (e) => {
        setClientName(e.target.value);
        setErrClientName("");
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
        setFirebaseErr("");
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setErrConfirmPassword("");
    };

    //email validation
    const emailValidation = (email) => {
        return String(email).toLowerCase().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    }

    //handle form submission
    const handleRegistration = (e) => {
        e.preventDefault();

        //Form submissin validation for Registration
        if(!clientName){
            setErrClientName("Enter Your name")
        }
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
        else{
            if(password.length < 6){
                setErrPassword("Password must be atleast 6 characters")
            }
        }
        if(!confirmPassword){
            setErrConfirmPassword("Enter your Confirm Password")
        }else{
            if(confirmPassword !== password){
                setErrConfirmPassword("Passwords doesn't match")
            }
        }

        //console.log(emailValidation(email))
        //sendin-d input data to database
        if(clientName && email && password && emailValidation(email) && password.length >= 6 && confirmPassword && confirmPassword === password){

            //set loading true when we send data to the firebase
            setLoading(true);

            //sending data to firebase to create user for sign up
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: clientName,
                        photoURL: "https://avatars.githubusercontent.com/u/91829067?s=400&u=2a9dcc486cc3c0c9b17ad4e10968ed1cc51eb309&v=4"
                    })

                    // Signed in  that is creating the user 
                    const user = userCredential.user;
                    //console.log(user);

                    //the user is now created hence set loading false
                    setLoading(false);
                    
                    // Set account successfully created
                    setSuccessMessage("Account successfully created");

                    //Once the successfull message is delayed we need to set timer which will allow render or navigate to sign in route
                    setTimeout( () =>{
                        navigate("/login");
                    }, 3000);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    setLoading(false);//we need to set loading false if there is an error in allowing signing up
                    if(errorCode.includes("auth/email-already-in-use")){
                        setFirebaseErr("Email Already in use. Try another one");
                    }
                    // ..-
                });
            
            //after signing up clear data in the form fields
            setClientName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
    }

    
    return (
        <div className="w-full">
            <div className="w-full bg-gray-100 pb-10 pt-2">
                <form className="w-[350px] mx-auto flex flex-col items-center" >
                    <img className="w-32 mb-4" src={darkLogo} alt="amazon-logo"/>
                    <div className="w-full border border-zinc-200 p-6">
                        <h2 className="font-titleFont text-3xl font-medium mb-4">Create Account</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">Your Name</p>
                                <input onChange={handleName} className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100" type="text" value={clientName}/>
                                {
                                    errClientName && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{errClientName}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">Email or Phone Number</p>
                                <input onChange={handleEmail} className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100" type="email" value={email}/>
                                {
                                    errEmail && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{errEmail}
                                        </p>
                                    )
                                }
                                {
                                    firebaseErr && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{firebaseErr}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">Password</p>
                                <input onChange={handlePassword} className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100" type="password" value={password}/>
                                {
                                    errPassword && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{errPassword}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium">Confirm Password</p>
                                <input onChange={handleConfirmPassword} className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100" type="password" value={confirmPassword}/>
                                {
                                    errConfirmPassword && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="text-red-600 italic font-titleFont font-extrabold text-base"><PriorityHighIcon/></span>{errConfirmPassword}
                                        </p>
                                    )
                                }
                                <p className="text-sm text-gray-600">Passwords must be atleast 6 characters</p>
                            </div>
                            <button onClick={handleRegistration} className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active-:shadow-amazonInput">
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
                            {
                                successMessage && (
                                    <div className="text-sm  text-skate-300">
                                        <motion.p initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2,duration:0.5}}>{successMessage} <span className="p-2"><CheckCircleIcon className="text-green-400" /></span></motion.p>
                                    </div>
                                )
                            }
                        </div>
                        <p className="text-sm text-black leading-4 mt-4 mb-8">
                            By Continuing, you agree to Amazon's <span className="text-blue-600">Conditions of use {" "}</span> and <span className="text-blue-600">Private Notice.</span>
                        </p>
                        <div className="text-xs text-black">
                            <p>Already have an accounnt? {" "} 
                                <Link to='/login'>
                                    <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100"> Sign in {" "}<span><ArrowRightIcon /></span></span>
                                </Link>
                            </p>
                            <p className="text-xs text-black mt-1">Buying for work? <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 pl-1">Create a free business account</span></p>
                        </div>
                    </div>
                </form>
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

export default SignUp
