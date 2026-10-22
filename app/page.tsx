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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <Location />
        <Dining />
        <GuestExperience />
        <PracticalInfo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
