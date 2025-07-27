import { useState } from 'react';
import Login from './pages/Login';
import Todo from './pages/Todo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>Gizem RemWaste</h1>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} style={{ float: 'right', marginBottom: '10px' }}>
            Logout
          </button>
          <Todo />
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
