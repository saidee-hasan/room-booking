import { Outlet } from "react-router-dom"
import Banner from "../components/Banner"
import Navbar from "../shared/Navbar"


function MainLayout() {
  return (
    <div>
      <Navbar isAuthenticated={true}/>
      <Outlet/>

    </div>
  )
}

export default MainLayout
