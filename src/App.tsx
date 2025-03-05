import { ComponentType } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
//pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Check from "./pages/Check";
import Profile from "./pages/Profile";
import Others from "./pages/Others";
import Turf from "./pages/Turf";
import Event from "./pages/Event";
import Product from "./pages/Product";
//components
import { PartnerSignup } from "./components/Signup/index";
import { Login } from "./components/Login/index";
import { SidebarDesktop } from "./components/sidebar/sidebar-desktop";
import { Booking } from "./components/Booking/BookingList";
import { TurfDetails } from "./components/Turf/TurfDetails";
import { ProductDetails } from "./components/Product/ProductDetails";
import { EventDetails } from "./components/Event/EventDetails";

import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { sidebarItems } from "./constants";
import { Slot } from "./pages/Slot";
import Pass from "./pages/Pass";
import ScheduleDetails from "./pages/ScheduleDetails";

type RequireAuthProps = {
  component: ComponentType<any>;
  path?: string;
};

const RequireAuth: React.FC<RequireAuthProps> = ({
  component: Component,
  ...rest
}) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("accessToken");
  const { toast } = useToast();
  if (!isAuthenticated) {
    toast({
      title: "Error",
      description: "You are not authenticated",
      variant: "destructive",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Component {...rest} />;
};

const LayoutWithSidebar = () => {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/partner"];

  const showSidebar = !hiddenRoutes.includes(location.pathname);

  return (
    <div>
      {showSidebar && (
        <div className="w-[300px]">
          <SidebarDesktop sidebarItems={sidebarItems} />
        </div>
      )}
      <div className={`${showSidebar ? "ml-[300px]" : "ml-0"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/**Auth login and dashBoard */}
          <Route path="/login" element={<Login />} />
          <Route path="/partner" element={<PartnerSignup />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/dashboard"
            element={<RequireAuth component={Dashboard} />}
          />
          {/**pages and routes to different modules */}
          <Route path="/slot" element={<Slot />} />
          <Route path="/slot/:id" element={<ScheduleDetails />} />
          <Route path="/turf" element={<Turf />} />
          <Route path="/turf/:id" element={<TurfDetails />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/pass" element={<Pass />} />

          <Route path="/others" element={<Others />} />
          {/**check and booking */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/logicCheck" element={<Check />} />
        </Routes>
        <Toaster />
        {/* <div><img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"></div> */}

{/* <img className="h-full w-full " src="turf.jpg" alt="image description"></img> */}

        
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <LayoutWithSidebar />
    </Router>
  );
}
