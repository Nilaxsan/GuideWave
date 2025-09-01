import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Bounce, ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import GuideHome from "./pages/guide/HomePage";
import SuccessfulRegistration from "./pages/SuccessfulRegistration";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import TouristHome from "./pages/tourist/TouristHome";
import GuideLayout from "./components/layout/GuideLayout";
import GuideBookings from "./pages/guide/BookingPage";
import GuideReviews from "./pages/guide/ReviewPage";
import GuidePayments from "./pages/guide/PaymentPage";
import GuideProfile from "./pages/guide/ProfilePage";
import PlacesPage from "./pages/guide/PlacesPage";
import TouristLayout from "./components/layout/TouristLayout";
import ExploreGuides from "./pages/tourist/ExploreGuides";
import Bookings from "./pages/tourist/Bookings";
import TouristTrips from "./pages/tourist/TouristTrips";
import GuidePlace from "./pages/tourist/Places";
import TouristProfile from "./pages/tourist/TouristProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-success" element={<SuccessfulRegistration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/tourist-home" element={<TouristHome />} />

        {/* Guide routes with sidebar */}
        <Route path="/guide" element={<GuideLayout />}>
          <Route path="home" element={<GuideHome />} />
          <Route path="bookings" element={<GuideBookings />} />
          <Route path="places" element={<PlacesPage />} />
          <Route path="reviews" element={<GuideReviews />} />
          <Route path="payments" element={<GuidePayments />} />
          <Route path="profile" element={<GuideProfile />} />
        </Route>
        {/* Tourist routes with sidebar */}
        <Route path="/tourist" element={<TouristLayout />}>
          <Route path="home" element={<TouristHome />} />
          <Route path="explore" element={<ExploreGuides />} />
          <Route path="trips" element={<TouristTrips />} />
          <Route path="places/:guideId" element={<GuidePlace />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<TouristProfile />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
