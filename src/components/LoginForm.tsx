import { FC, useState, useContext } from 'react';
import {Context} from '../index';
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <div>
            <input 
                type="text" 
                placeholder="email" 
                onChange={e=>setEmail(e.target.value)}
                value={email}
            />
            <input 
                type="password" 
                placeholder="password"
                onChange={e=>setPassword(e.target.value)}
                value={password}
            />
            <button onClick={()=> store.login(email,password)}>Log In</button>
            <button onClick={()=> store.registration(email,password)}>Sign Up</button>
        </div>
    )
}

export default observer(LoginForm)
