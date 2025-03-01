import React,{useState,useEffect} from 'react'
import {useCustomer} from '../../Context'
import axios from 'axios'
import styles from './Address.module.css'


function Address() {
    const [address,setAddress] = useState([]);
    const [ selectAddress,setSelectAddress] = useState();
    const [showPopup,setShowPopup] = useState(false);
    const {customer} = useCustomer();
    const[otherAddress,setOtherAddress] = useState(false)
    const [area,setArea] = useState();
    const [houseAddress,setHouseAddress] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const customerID=customer.CustomerID;
    useEffect(()=>{
        fetchAddress();
    },[])
    async function fetchAddress(){
        const response = await axios.get(`http://localhost:3001/address/${customerID}`)
        await setAddress(response.data);
        console.log(response.data)
        await setSelectAddress(response.data.find(item => item.isDefault === 1));
    }
    async function changeSelectAddress(value){
        await setSelectAddress(address.find(item => item.AddressID == value))
        if(selectAddress.isDefault === 1) setIsChecked(true); 
        else setIsChecked(false); 
    }
    async function setDefaultAddress(){
        if (!isChecked) {
            const confirm  = window.confirm(`Bạn muốn để địa chỉ ${selectAddress.HouseAddress} ${selectAddress.Area} làm địa chỉ mặc định ? `)
            if(confirm){
                const addressDefault = address.find(item => item.isDefault == 1) 
                console.log(addressDefault)
                const AddressID = [selectAddress.AddressID,addressDefault.AddressID]
                const response = await axios.post('http://localhost:3001/address/setDefault',{AddressID,customerID});
                setAddress(response.data)
                setShowPopup(false)
                console.log(response.data)
                setIsChecked((prev) => !prev); 
            }
        }
        
    }
    async function addAddress(){
        const confirm  = window.confirm(`Bạn muốn thêmthêm địa chỉ ${houseAddress} ${area}  ? `)
            if(confirm){
                await axios.post('http://localhost:3001/address/',{customerID,houseAddress,area});
                const response = await axios.get(`http://localhost:3001/address/${customerID}`)
                setAddress(response.data)
            }
    }
  return (
    <>
      <img alt="" src="./addressIcon.png" />
        Tên - Số điện thoại - Địa chỉ:
        <span>{customer.FirstName} {customer.LastName}</span><span>{customer.PhoneNumber}</span>
        {selectAddress ?(<span >{selectAddress.HouseAddress} {selectAddress.Area}</span>):''}
        <button className={styles.changebutton} onClick={()=>setShowPopup(true)}>Thay đổi địa chỉ</button>
        {showPopup ?(
            <div className={styles.popup} onClick = {e=> e.target === e.currentTarget ? setShowPopup(false):''}>
                <div className={styles.innerPopup}>
                    <h2>Thay đổi địa chỉ</h2>
                    {otherAddress ?(
                        <>
                            <p>Chọn địa chỉ:</p>
                            <select onChange={(event) => setArea(event.target.value)}>
                                <option value='Khu A'>Khu A</option>
                                <option value="Khu B">Khu B</option>
                                <option value="Khu C">Khu C</option>
                                <option value="Khu D">Khu D</option>
                            </select><br/>
                            <p>Địa chỉ cụ thể : </p>
                            <input type='text' onChange={(event) => setHouseAddress(event.target.value)} placeholder='Nhập địa chỉ cụ thể của bạn ' /><br/><br/>
                            <button onClick={()=>addAddress()}>Thêm địa chỉ này</button>
                            <button onClick={()=>setOtherAddress(false)}>Chọn địa chỉ sẵn có</button>
                        </>
                    ):(
                        <>
                            <p>Chọn địa chỉ:</p>
                            <select onChange={(event) => changeSelectAddress(event.target.value)}>
                                {address.length !== 0 && address.map(item=>(
                                    <option value={item.AddressID}><span >{item.HouseAddress} {item.Area}</span></option>
                                ))}
                            </select>
                            <br/><br/>
                            <input type='radio'  checked={isChecked} onChange={()=>setDefaultAddress()} />Đặt làm địa chỉ mặc định<br/><br/>
                            <button onClick={()=>setOtherAddress(true)}>Thêm địa chỉ khác</button>
                            <button  onClick={()=>setShowPopup(false)}>Chọn địa chỉ này</button>
                        </>
                    )}
                    

                </div>
            </div>
        ) :''}
    </>
  )
}

export default Address
