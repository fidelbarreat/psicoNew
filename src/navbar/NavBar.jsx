import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { auth } from '../firebase-config';
import styles from './NavBarmo.css';


function NavBar() {

  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    history.push('/');
  };

  return (
    <ul className={styles.navbarContainer}>
      <li>
        <Link to="/" className={styles.link}>
          Home
        </Link>
      </li>

      {!!user && (
        <li>
          <Link to="/Perfil" className={styles.link}>
            Ver perfil
          </Link>
        </li>
      )}

      <li className={styles.rightSide}>
        {!!user ? (
          <div className={styles.container}>
            <button type="button" onClick={handleLogout}>
              Logout, {user.name}
            </button>
          </div>
        ) : (
          <>
            <div className={styles.container}>
              <Link to="/Login" className={styles.link}>
                Login
              </Link>
            </div>

            <div className={styles.container}>
              <Link to="/Registrarse" className={styles.link}>
                Register
              </Link>
            </div>
            
          </>


        )}
      </li>
    </ul>
  );
}

export default NavBar;