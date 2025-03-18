import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";
import  TransactionHistory from "../../layout/TransactionHistory/TransactionHistory"
import { GlobalProvider } from "../../globalContext/GlobalContext";

function PayBillss (){
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Background>
            <TransactionHistory></TransactionHistory>
          <Footer></Footer>
        </Background>
      </GlobalProvider>
    </div>
  );
}

export default PayBillss;
