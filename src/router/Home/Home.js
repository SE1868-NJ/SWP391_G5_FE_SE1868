import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";
import Main from "../../layout/Main/Main";

function Home() {
  return (
    <div>
      <Header />
      <Background>
        <Main></Main>
        <Footer></Footer>
      </Background>
    </div>
  );
}

export default Home;
