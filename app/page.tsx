import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Amenities from "@/components/Amenities";
import Location from "@/components/Location";
import Dining from "@/components/Dining";
import GuestExperience from "@/components/GuestExperience";
import PracticalInfo from "@/components/PracticalInfo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HotelHighlights from "@/components/HotelHighlights";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingPartners from "@/components/BookingPartners";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <HotelHighlights />
        <Rooms />
        <Amenities />
        <Location />
        <Dining />
        <GuestExperience />
        <PracticalInfo />
        <BookingPartners />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
