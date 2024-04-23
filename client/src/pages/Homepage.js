import About from "../components/Homepage/About";
import Hero from "../components/Homepage/Hero";

export default function Homepage({ activeUser }) {
  return(
    <div>
      <Hero activeUser={activeUser}/>
      <About/>
    </div>
  );
}
