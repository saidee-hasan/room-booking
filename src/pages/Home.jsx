import Banner from "../components/Banner"
import Map from "../components/Map"
import FeaturedRooms from "../components/Rooms"

function Home() {
  return (
    <div className="container mx-auto">
    <Banner></Banner>
    <Map/>
    <FeaturedRooms/>
    </div>
  )
}

export default Home
