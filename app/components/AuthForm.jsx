'use client'

import { useState } from "react"
import { supabase } from "../utils/supabaseClient"
import { useRouter } from "next/navigation"

export default function AuthForm(){
    const [isNewUser, setIsNewUser] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    async function handleLogin(e){
        e.preventDefault();
        setIsSigningIn(true)
        setErrorMessage('')
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email, password
            })
            console.log({ error, data })

            if (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            } else if (data.session) {
                router.push('/main')
            } else {
                setErrorMessage('Login failed: No session data found.')
                setIsSigningIn(false)
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred.')
            console.error("Unexpected error:", error)
            setIsSigningIn(false)
        }
    }

    async function handleSignUp(e) {
        e.preventDefault();
        setIsSigningUp(true)
        setErrorMessage('')
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });
            console.log({ data, error })

            if (error) {
                setErrorMessage(error.message)
                setIsSigningUp(false)
            } else if (data.user) {
                // Notify the user to check their email
            } else {
                setErrorMessage('Sign up failed: No user data found.')
                setIsSigningUp(false)
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred.')
            console.error("Unexpected error:", error)
            setIsSigningUp(false)
        }
    }
    
    let signInMessage = 'Sign In';

    if (isSigningIn){
        signInMessage = 'Signing In...'
    } else if (isNewUser){
        signInMessage = 'Sign Up'
    }

    const signUpMessage = <p className="text-center text-neutral-300">Email sent! Check your email to confirm sign up.</p>

    return (
        <form onSubmit={isNewUser ? handleSignUp : handleLogin} className="space-y-8">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-neutral-400 text-gray-900 focus:outline-none focus:ring-neutral-700 focus:border-neutral-700"
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-neutral-400 text-gray-900 focus:outline-none focus:ring-neutral-700 focus:border-neutral-700"
                placeholder="Password"
            />
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-neutral-300 bg-neutral-600 hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-700"
            >
                {signInMessage}
            </button>
            {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
            <p className="text-center text-neutral-300">
                {isNewUser ? (
                <>
                    Already have an account? {' '}
                    <button
                    type="button"
                    onClick={() => setIsNewUser(false)}
                    className="text-indigo-400 hover:text-indigo-600"
                    >
                    Sign In
                    </button>
                </>
                ) : (
                <>
                    Don't have an account? {' '}
                    <button
                    type="button"
                    onClick={() => setIsNewUser(true)}
                    className="text-indigo-400 hover:text-indigo-600"
                    >
                    Sign Up
                    </button>
                </>
                )}
            </p>
            {isSigningUp && signUpMessage}
        </form>
    );
}
