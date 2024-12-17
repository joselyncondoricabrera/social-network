import { Route, Routes } from "react-router-dom"
import { PetsLover, PublicationsView } from "../pages"

export const HomeRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/publications' element={<PublicationsView/>}/>
        <Route path='/friends' element={<PetsLover/>}/>
        <Route path='/' element={<PublicationsView/>}/>
    </Routes>
    </>
  )
}
