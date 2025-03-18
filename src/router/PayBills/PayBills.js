import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";
import PayBills from "../../layout/PayBills/PayBills";
import { GlobalProvider } from "../../globalContext/GlobalContext";

function PayBillss (){
  return (
    <div>
      <GlobalProvider>
        <Header />
        <Background>
            <PayBills></PayBills>
          <Footer></Footer>
        </Background>
      </GlobalProvider>
    </div>
  );
}

export default PayBillss;
