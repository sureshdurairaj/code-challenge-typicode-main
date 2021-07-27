import App from './App';

describe('listUsers', () => {
  it('returns a ul', () => {
    const instance = new App();
    const actual = instance.listUsers([]);

    expect(actual).toHaveProperty('type', 'ul');
  });

  it('returns a child element for each user', () => {
    const instance = new App();
    const actual = instance.listUsers([{ name: 'User A' }, { name: 'User B' }], [], 'all');

    expect(actual.props.children).toHaveLength(2);
  });
  it('returns a child element for each user with filter email', () => {
    const instance = new App();
    const actual = instance.listUsers([{ name: 'User A', email:'email.test' }, { name: 'User B' }], [], '.test');
    expect(actual.props.children).toHaveLength(1);
  });

  it('getUserTodos shoud returns filtered array', () => {
    const instance = new App();
    const actual = instance.getUserTodos([{
      "userId": 2,
      "completed": true
    },{
      "userId": 1,
      "completed": true
    },{
      "userId": 2,
      "completed": false
    }], 1)
    expect(actual).toEqual(1)
  });
  
});
