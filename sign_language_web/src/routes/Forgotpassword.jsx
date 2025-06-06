
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
      navigate('/forget-success');
    } catch (err) {
      setError("Failed to send reset email. Please check your email address.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <h1 style={styles.welcome}>
          Forgot your password? <Link to="/" style={styles.brand}>HandsUp!</Link>
        </h1>
        <div style={styles.circles}>
          <div style={{ ...styles.circle, ...styles.circle1 }} />
          <div style={{ ...styles.circle, ...styles.circle2 }} />
          <div style={{ ...styles.circle, ...styles.circle3 }} />
          <div style={{ ...styles.circle, ...styles.circle4 }} />
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>Reset Password</h2>
        <form onSubmit={handleReset}>
          <label style={styles.label}>Enter your email</label>
          <input
            type="email"
            style={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" style={styles.button}>Send Reset Link</button>
          <p style={styles.registerText}>
            Go back to <Link to="/signin" style={styles.registerLink}>Sign In</Link>
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
    zIndex: 2,
  },
  brand: {
    color: '#3B4CCA',
    cursor: 'pointer',
    zIndex: 100,
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


export default ForgotPassword;
