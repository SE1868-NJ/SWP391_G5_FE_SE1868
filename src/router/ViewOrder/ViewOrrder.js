import React from 'react'
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer'
import styles from './ViewOrder.module.css'
import {useCustomer} from '../../Context'

function StatusOrrder() {
    const {customer} = useCustomer();
  return (
    <div>
      <Header></Header>
      <div className={styles.content}>
        <div className={styles.innerContent}>
             <div className={styles.index}>
                    <img alt='' src={customer.Avatar}/>
             </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default StatusOrrder
