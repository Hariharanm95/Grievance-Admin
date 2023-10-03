import { useState } from 'react';
import { useAuthContext } from './useAuthContext'; // Update the context import to your GrievancesContext

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext(); // Update to use your GrievancesContext

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        // Replace the API endpoint with your actual signup endpoint
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            // Update loading state
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
}
