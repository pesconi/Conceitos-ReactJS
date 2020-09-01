import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

import Header  from './components/Header';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response =>{
          setRepositories(response.data);
      })
  }, []);
  async function handleAddRepository() {
    // TODO
    const response =  await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: `https://github.com/pesconi/ ${Date.now()}`,
      techs: 'Node'
      });

      const repositorie = response.data;
      
      setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id);
    api.delete(`repositories/${id}`).then(response => {
      console.log(response);
    });
    setRepositories([...repositories.filter(repositorie => repositorie.id !== id)]);
  }

  return (
    <div>
      <Header title="Teste Conceitos ReactJS" />
      <ul data-testid="repository-list">
        
        {repositories.map(repositorie => 
        <li key={repositorie.id}>
          {repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)}
          
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
