import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/SignIn');
    }, 10000); // 10 seconds before redirect

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Verify Your Email</h2>
      <p>We’ve sent a verification email. Please check your inbox and click the link to activate your account.</p>
      <p>You’ll be redirected to the login page shortly.</p>
    </div>
  );
};

export default CheckEmail;
