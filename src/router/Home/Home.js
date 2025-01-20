import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";

function Home() {
  return (
    <div>
      <Header />
      <Background>
        <Footer></Footer>
      </Background>
    </div>
  );
}

export default Home;
