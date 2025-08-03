import React from 'react';
import {usePuterStore} from "~/lib/puter";
import  {useLocation ,useNavigate} from "react-router";
import {useEffect} from "react";

// export const meta : ()=> (
//     [
//         {title : "Resumind | Auth"},
//         {name : 'descripation', content :"log into your account"}
//     ]
// )
function Auth() {
    const {isLoading ,auth} = usePuterStore();
    const location = useLocation();
    const next  = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated)navigate(next);

    },[auth.isAuthenticated,next]);


    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-scren flex items-center justify-center w-full">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h1>Welcome</h1>
                        <h2>Log In To Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) :(
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button 0"
                                            onClick={() => auth.signOut()}
                                    >
                                        Log Out
                                    </button>
                                ):(
                                    <button className="auth-button"
                                            onClick={auth.signIn}
                                    >
                                        Log In
                                    </button>
                                )}

                            </>
                        )}
                    </div>

                </section>
            </div>
        </main>
    );
}

export default Auth;