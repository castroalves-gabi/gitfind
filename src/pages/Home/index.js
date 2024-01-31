import {useState} from 'react';
import { Header } from '../../components/Header';
import background from '../../assets/pngwing.com.png';
import profileimg from '../../assets/profile-img-1.jpg'
import ItemList, {} from '../../components/ItemList';
import './styles.css';


function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

const handleGetData = async () => {
  const userData = await fetch (`https://api.github.com/users/${user}`);
  const newUser = userData.json();

  if(newUser.name) {
    const {avatar_url, name, bio, login} = newUser;
    setCurrentUser({avatar_url, name, bio, login});

    const reposData = await fetch (`https://api.github.com/users/${user}/repos`);
    const newRepos = reposData.json();

    if(newRepos.length) {
      setRepos(newRepos);
    }
  }
}

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background icon" />
      </div>
      <div className="info">
        <div>
          <input 
          name="user" 
          value={user} onChange={event => setUser(event.target.value)} 
          placeholder="@username" 
          />
          <button onClick={handleGetData}>Buscar</button>
        </div>
        {currentUser?.name ? (
          <>
          <div className="profile">
            <img src={currentUser.avatar_url} id="profileimg" alt="imagem do perfil"></img>
            <div className="profile profiletext">
              <h3>{currentUser.name}</h3>
              <span>{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          </>
        ) : null}
        {repos?.length ? (
          <div className="itemList">
            <h4>Repositórios</h4>
            {repos.map(repo => (
              <ItemList title={repo.name} description={repo.description} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
