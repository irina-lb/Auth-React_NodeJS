import {FC, useEffect, useContext, useState} from 'react';
import LoginForm from './components/LoginForm';
import {Context} from './index';
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () =>{
  const {store} = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  },[])

  if (store.isLoading) {
    return <div>Loading...</div>
}

  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>
            <button onClick={getUsers}>Get all Users</button>
        </div>
    );
}

async function getUsers() {
  try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
  } catch (e) {
      console.log(e);
  }
}

  return (
    <div>
      <h1>{store.isAuth ? `User ${store.user.email} authorized` : 'You should to authorize'}</h1>
      <h1>{store.user.isActivated ? 'User confirmed' : 'Confirm your account'}</h1>
      <button onClick={()=>store.logout()}>Log Out</button>
      <div>
        <button onClick={getUsers}>Get all Users</button>
      </div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);
