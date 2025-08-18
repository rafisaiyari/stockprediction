import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../../assets/firebase";

function Registration({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Sign up successful");
            onClose && onClose();
        } catch (error) {
            console.log(error);
            setLoginError(error.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            onClose && onClose();
        } catch (error) {
            console.log(error.code);
            setLoginError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        setLoginError("");
        try {
            await signInWithPopup(auth, provider);
            console.log("Google login successful");
            onClose && onClose();
        } catch (error) {
            console.log(error);
            setLoginError(error.message);
        }
    };

    return (
        <div className="formContent">
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            
            <form className="loginForm" onSubmit={isSignUp ? handleSignup : handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                <button type="submit">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>

            {loginError && (
                <div className="error-message">
                    {loginError}
                </div>
            )}

            <div className="auth-divider">OR</div>

            <div className="googleSignUp">
                <button className="googleLogin" type="button" onClick={handleGoogleLogin}>
                    Continue with Google
                </button>
                
                <button 
                    type="button" 
                    onClick={() => setIsSignUp(!isSignUp)}
                >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
            </div>
        </div>
    );
}

export default Registration;