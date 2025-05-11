import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/SignIn');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Registration Successful!</h2>
      <p>Redirecting you to Sign In...</p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
  },
};

export default RegisterSuccess;
