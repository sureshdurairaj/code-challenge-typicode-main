import React, { PureComponent } from 'react';
import { getTodos, getUsers } from './service';

export default class App extends PureComponent {
  defaultDomainIndex = 0;
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

  state = {
    users: [],
    todos: [],
    filter: this.domains[this.defaultDomainIndex],
  };

  getUserTodos(todos,userId) {
    return todos.filter((o) => o.userId === userId && o.completed).length
  }

  async componentDidMount() {
    const users = await getUsers();
    const todos = await getTodos();
    this.setState({ users, todos });
  }

  // checking if filter is 'all' then render all items
  // for other types using endsWith to filter email
  listUsers(users, todos, filter) {
    const filteredUsers = users.filter((o) => filter === 'all' || o?.email?.endsWith(filter));
    return (
      <ul>
        {filteredUsers.map((user) => {
          return <li key={user.name}>{user.name} has completed {this.getUserTodos(todos,user.id)} todos</li>;
        })}
      </ul>
    );
  }

  renderDropDown() {
    return (
      <select value={this.state.filter} onChange={(e) => {this.setState({filter:e.target.value})}}>
        {this.domains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { users, todos, filter } = this.state;
    return (
      <>
        {this.renderDropDown()}
        {this.listUsers(users,todos, filter)}
      </>
    );
  }
}
