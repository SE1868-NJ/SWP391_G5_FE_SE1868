import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";
import Main from "../../layout/Main/Main";
import { GlobalProvider } from "../../globalContext/GlobalContext"; // Sử dụng GlobalProvider

function Home() {
  return (
    <GlobalProvider> {/* BỌC Ở NGOÀI TOÀN BỘ ỨNG DỤNG */}
      <Header />
      <Background>
        <Main />
        <Footer />
      </Background>
    </GlobalProvider>
  );
}

export default Home;
