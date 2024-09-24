import {Link,Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {setUser} = useContext(UserContext);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
        const response = await axios.post('/register', {
            name,
            email,
            password,
        });
        const data = response.data; // Correctly access response data
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data)); 
        // alert('Registration successful. Now you can log in');
       
        navigate('/')
    } catch (e) {
        console.error(e); // Log the error for debugging
        if (e.response) {
            // If there's a response from the server, log it
            console.error('Server responded with:', e.response.data);
            alert(`Registration failed: ${e.response.data.error || 'Please try again later'}`);
        } else {
            // If there's no response from the server
            alert('Registration failed. Please check your network connection.');
        }
    }
}
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto"  onSubmit={registerUser}>
          <input type="text"
                 placeholder="John Doe"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button type="submit" className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}