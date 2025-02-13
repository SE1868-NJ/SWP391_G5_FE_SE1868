import { InputCustom } from "../input/InputCustom"
import { UserComment } from "./UserComment"
import styles from './styles.module.css';

export const Comments = () =>{
    return (
        <div className={styles.comment_container}>
            
            <InputCustom/>

            <div className={styles.comment_body}>
                {[1,2,3,4,5].map((i) =><UserComment />)}
            </div>
        </div>
    )
}