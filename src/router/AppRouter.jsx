import { Route, Routes } from 'react-router-dom';
import { SignIn, Home, SignUp } from '../pages';


export const AppRouter = () => {
  return (
    <Routes>
        
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/home/*' element={<Home/>}/>

    </Routes>
  )
}
