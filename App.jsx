import React, { useEffect, useState } from 'react';
import { getTodos, getUsers } from './service';

export default function App() {
  const defaultDomainIndex = 0,
  domains = [
    'all',
    '.biz',
    '.tv',
    '.net',
    '.org',
    '.ca',
    '.info',
    '.me',
    '.io',
  ];

  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(domains[defaultDomainIndex]);

  const getUserTodos = (todos, userId) => todos.filter((o) => o.userId === userId && o.completed).length;

  useEffect(() => {
   const fetchData = async () => {    try{
        const _users = await getUsers();
        const _todos = await getTodos();
        // setState({ users, todos });
        setUsers(_users);
        setTodos(_todos);
      }
      catch(error){
        console.error(error);
      }
    }
    fetchData()
  }, []);

  const listUsers = (users, todos, filter) => <ul>
        {users.filter((o) => filter === 'all' || o?.email?.endsWith(filter)).map((user) => {
          return <li key={user.name}>{user.name} has completed {getUserTodos(todos,user.id)} todos</li>;
        })}
      </ul>;

  const renderDropDown = () => <select value={filter} onChange={(e) => {setFilter(e.target.value)}}>
        {domains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>;

    return (
      <>
        {renderDropDown()}
        {listUsers(users, todos, filter)}
      </>
    );
}
