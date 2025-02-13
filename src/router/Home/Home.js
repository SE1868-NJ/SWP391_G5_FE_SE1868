import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";
import Main from "../../layout/Main/Main";
import { GlobalProvider } from "../../globalContext/GlobalContext";

function Home() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Background>
          <Main></Main>
          <Footer></Footer>
        </Background>
      </GlobalProvider>
    </div>
  );
}

export default Home;
