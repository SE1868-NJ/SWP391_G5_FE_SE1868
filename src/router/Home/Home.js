import Header from "../../layout/Header/Header";
import {useNavigate}  from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
      <div>
        <Header />
        <button onClick={()=> navigate('/StatusOrder')}> Order Status</button>
      </div>
  );
}

export default Home;
