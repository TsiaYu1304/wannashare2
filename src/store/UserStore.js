import React ,{createContext,useState,useEffect} from "react";
import {AsyncStorage} from "react-native";
import userData from "../json/user.json";
const ME_PERSISTENCE_KEY = "ME_PERSISTENCE_KEY";
const HAS_SET_KEY = "HAS_SET_KEY";

const SIGN_PERSISTENCE_KEY = "SIGN_PERSISTENCE_KEY";
const SIGN_HAS_SET_KEY = "SIGN_HAS_SET_KEY";

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user,setUser] = useState(userData);
    const store = {
        isLoginState: [isLogin, setIsLogin],
        userState: [user,setUser]
    };
    
    const LoginrestoreState = async () => {
        try{
            const login_hasSetString = await AsyncStorage.getItem(SIGN_HAS_SET_KEY);
            const login_hasSet = JSON.parse(login_hasSetString);
            if(login_hasSet){
                const loginbool = await AsyncStorage.getItem(SIGN_PERSISTENCE_KEY);
                const state_login = JSON.parse(loginbool);
                setIsLogin(state_login);
            }
            console.log();
        
        }catch(e) {}
    };


    const restoreState = async () => {
        try{
            const hasSetString = await AsyncStorage.getItem(HAS_SET_KEY);
            const hasSet = JSON.parse(hasSetString);
            if(hasSet){
                const userString = await AsyncStorage.getItem(ME_PERSISTENCE_KEY);
                const state_user = JSON.parse(userString);
                setUser(state_user);
                console.log(`store user =${user.email} ${user.password} ${user.name}`);
            }
        
        }catch(e) {}
    };

    useEffect(()=>{
        restoreState();
    },[]);

    useEffect(()=>{
        LoginrestoreState();
    },[]);

    return(
        <StoreContext.Provider value={store}> 
            {children} 
        </StoreContext.Provider> //value要傳遞給childrean
    );
};