import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const defaultAuthData = {
    "user":{
        "email": "",
        "name": "",
        "affiliation":"",
    },
    "loggedIn":false
}

const AuthProvider = (props) =>{
    const [data, setData] = useState(defaultAuthData)

    useEffect(() => {
        const fetchLoggedInState = async () => {
            const response = await fetch ("/api/auth/member_center/checkLogin",{
                method:'GET',
                mode:'cors'
            })
            return response.json()
        }
        fetchLoggedInState().then(data=>{
            if(data.loggedIn){
                setData(data)
            }else{
                setData(defaultAuthData)
            }
        })
      }, [])

      return (
        <AuthContext.Provider value={{
          ...data,
          updateAuthContext: d => {
            setData(Object.assign({}, data, d))
          }
        }}>
          {props.children}
        </AuthContext.Provider>
      );
    }

    export {
        AuthContext as default,
        AuthProvider,
      }