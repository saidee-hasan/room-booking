import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../shared/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar isAuthenticated={true} />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
