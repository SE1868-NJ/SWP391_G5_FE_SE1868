import Header from "../../layout/Header/Header";
import {useNavigate}  from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
      <div>
        <Header />
        <button onClick={()=> navigate('/ViewOrder')}> View Order</button>
        <button onClick={()=> navigate('/OrderCheckOut')}> Order checkout</button>
      </div>
  );
}

export default Home;
