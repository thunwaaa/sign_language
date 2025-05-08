import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // adjust the path if needed

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <h1 style={styles.welcome}>
          Welcome back to <span style={styles.brand}>HandsUp!</span>
        </h1>
        <div style={styles.circles}>
          <div style={{ ...styles.circle, ...styles.circle1 }} />
          <div style={{ ...styles.circle, ...styles.circle2 }} />
          <div style={{ ...styles.circle, ...styles.circle3 }} />
          <div style={{ ...styles.circle, ...styles.circle4 }} />
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>E-mail</label>
          <input
            type="email"
            style={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: 'red' }}> Incorrect Email or Password </p>}

          <button type="submit" style={styles.button}>Sign In</button>

          <p style={styles.registerText}>
            Don't have an account?
            <a href="/Register" style={styles.registerLink}>Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 5%',
    position: 'relative',
    overflow: 'hidden',
  },
  leftSection: {
    flex: 1,
    zIndex: 1,
  },
  welcome: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#000',
    maxWidth: '400px',
  },
  brand: {
    color: '#3B4CCA',
  },
  circles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#3B4CCA',
    opacity: 0.2,
  },
  circle1: {
    width: 150,
    height: 150,
    bottom: -40,
    left: -40,
  },
  circle2: {
    width: 100,
    height: 100,
    bottom: 50,
    left: 100,
    backgroundColor: '#6D83F2',
  },
  circle3: {
    width: 60,
    height: 60,
    top: 100,
    left: 200,
  },
  circle4: {
    width: 40,
    height: 40,
    top: 50,
    left: 600,
    backgroundColor: '#A1A9FF',
  },
  formCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 1,
    maxWidth: '400px',
    width: '100%',
  },
  formTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
    fontWeight: '500',
    marginTop: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #3B4CCA',
    marginBottom: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#3B4CCA',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  registerText: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  registerLink: {
    color: '#3B4CCA',
    textDecoration: 'none',
    marginLeft: '0.3rem',
  },
};

export default SignIn;
