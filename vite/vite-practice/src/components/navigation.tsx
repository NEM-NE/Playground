import { Link } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';

function Navigation() {
    const list = [
        {
            title: "Home",
            logo: <HomeIcon fontSize="large"/>,
            url: "/"
        },
        {
            title: "Models",
            logo: <HomeIcon fontSize="large"/>,
            url: "/test"
        },
        {
            title: "Volumes",
            logo: <HomeIcon fontSize="large"/>,
            url: "/test"
        },
        {
            title: "Registries",
            logo: <HomeIcon fontSize="large"/>,
            url: "/test"
        },
        {
            title: "Monitorings",
            logo: <HomeIcon fontSize="large"/>,
            url: "/test"
        },
        {
            title: "Tests",
            logo: <HomeIcon fontSize="large"/>,
            url: "/test"
        },
        {
            title: "Deployments",
            logo: <HomeIcon fontSize="large"/>,
            url: "/test"
        },
    ]

    return (
      <div>
          <div className="w-80 h-screen float-left bg-white">
            {list.map(el => (
                <div className="px-5 py-7"> 
                    <Link to={el.url} className="flex space-x-6 text-2xl">
                      <div>{el.logo}</div>
                      <div>{el.title}</div>
                    </Link>
                </div>
            ))}
          </div>
      </div>
    )
  }
  
  export default Navigation;