import Jwt from 'jsonwebtoken'
import HTTP from './http'
export const saveJWT = ( token, user ) => {
    if(localStorage.getItem(user)){
      return 
    }

    localStorage.setItem(user, token)
    
    return token
}


export const validateJWT = async (token, user) => {
  if(!token || new Date( Jwt.decode( token ).exp * 1000) < new Date()){
    const { data: newToken } = await HTTP.post('token', user)
      await saveJWT(newToken, user.email)
      return newToken
    }
      return token

 
}