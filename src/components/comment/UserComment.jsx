import styles from './styles.module.css';

export const UserComment = () =>{
    return(

        <div className={styles.card}>
            <div className={styles.img}></div>
            <div className={styles.textBox}>
                <div className={styles.textContent}>
                    <p className={styles.h1}>Đỗ Đức Việt</p>
                    <span className={styles.span}>12 min ago</span>
                </div>
                <p className={styles.p}>Món này thật sự ngon! Hương vị đậm đà, gia vị nêm nếm vừa phải, kết cấu món ăn cũng rất hoàn hảo.</p>
            </div>
        </div>

    )
}