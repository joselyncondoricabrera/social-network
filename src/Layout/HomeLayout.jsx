import { Navbar } from "../components/Navbar"


export const HomeLayout = ({children}) => {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}
