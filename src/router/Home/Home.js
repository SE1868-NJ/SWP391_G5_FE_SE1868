import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Background from "../../layout/Background/Background";
import Main from "../../layout/Main/Main";
import {useNavigate}  from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
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
