import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enbocwxrhgglnoqjkxjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuYm9jd3hyaGdnbG5vcWpreGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNTY4NjIsImV4cCI6MjA0NzkzMjg2Mn0.VKiysZwgBD8JkXm7Zb3AIQxVevmoto6x-n5uVTqOFj4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign up function
export async function signUp(email, password, fullname, phoneNumber) {
    const { data, error } = await supabase.auth.signUp(
        { email, password },
        {
            data: { fullname, phoneNumber } // Save additional user information
        }
    );

    if (error) {
        console.error('Error during sign up:', error.message);
        return { error };
    } else {
        // Check if the user is logged in
        const { data: session } = await supabase.auth.getSession();

        if (session) {
            console.log('User is logged in:', session.user);
            // Fetch user metadata
            const { data: user } = await supabase.auth.getUser();
            console.log('User metadata:', user);
        } else {
            console.log('No active session');
        }

        return { data };
    }
}



// Login function
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
}

// Logout function
export async function logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

// Check authentication status function
export async function checkAuthStatus() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error checking authentication status:', error.message);
        return null;
    }
    return user; // Return user if logged in, otherwise null
}
