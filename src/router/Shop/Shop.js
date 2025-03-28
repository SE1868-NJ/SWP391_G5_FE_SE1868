import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";
import Shop from "../../layout/Shop/Shop";
import { GlobalProvider } from "../../globalContext/GlobalContext";
import Chatbot from "../../components/chatbox/ChatBox";


function Home() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Background>
          <Shop></Shop>
          <Chatbot></Chatbot>
          <Footer></Footer>
        </Background>
      </GlobalProvider>
    </div>
  );
}

export default Home;
