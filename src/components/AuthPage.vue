<template>
    <v-container>
    <v-form>
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field v-model="password" label="Password" type="password" required></vtext-field>
    <v-btn @click="handleSignUp">Sign Up</v-btn>
    <v-btn @click="handleLogin">Log In</v-btn>
    <v-btn @click="handleLogout">Log Out</v-btn>
    </v-form>
    </v-container>
   </template>
   <script>
   import { ref } from 'vue';
   import { signUp, login, logout } from '../supabase';
   export default {
    setup() {
    const email = ref('');
    const password = ref('');
    const handleSignUp = async () => {
    const { data, error } = await signUp(email.value, password.value);
    if (error) {
    alert(`Sign Up Error: ${error.message}`);
    } else {
    alert('Sign Up Successful');
    }
    };
    const handleLogin = async () => {
    const { data, error } = await login(email.value, password.value);
    if (error) {
    alert(`Login Error: ${error.message}`);
    } else {
    alert('Login Successful');
}
 };
 const handleLogout = async () => {
 const { error } = await logout();
 if (error) {
 alert(`Logout Error: ${error.message}`);
 } else {
 alert('Logged Out Successfully');
 }
 };
 return { email, password, handleSignUp, handleLogin, handleLogout };
 }
};
</script>