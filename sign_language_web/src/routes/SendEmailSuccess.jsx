import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgetSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate('/signin');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <h1 style={styles.welcome}>Password Reset Email Sent!</h1>
        <div style={styles.circles}>
          <div style={{ ...styles.circle, ...styles.circle1 }} />
          <div style={{ ...styles.circle, ...styles.circle2 }} />
          <div style={{ ...styles.circle, ...styles.circle3 }} />
          <div style={{ ...styles.circle, ...styles.circle4 }} />
        </div>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>Please check your email</h2>
        <p style={{ textAlign: 'center' }}>
          You will be redirected to the login page in <strong>{countdown}</strong> seconds.
            <p style={styles.registerText}>
                Go back to <Link to="/signin" style={styles.registerLink}>Sign In</Link>
            </p>
        </p>
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
};

export default ForgetSuccess;
