import Header from "../../../layout/Header/Header";
import Footer from "../../../layout/Footer/Footer";
import Background from "../../../layout/Background/Background";
import Bills from "../../../layout/Bills/Bills";
import { GlobalProvider } from "../../../globalContext/GlobalContext";

function Bill() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Background>
          <Bills></Bills>
          <Footer></Footer>
        </Background>
      </GlobalProvider>
    </div>
  );
}

export default Bill;
