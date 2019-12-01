import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logUser } from '../redux/actions/currentUser';

const LoginForm = ({ logUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    logUser({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  logUser: PropTypes.func.isRequired,
};

export default connect(null, { logUser })(LoginForm);
