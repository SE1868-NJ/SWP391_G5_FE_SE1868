import { useEffect, useState } from "react";
import { InputCustom } from "../input/InputCustom"
import { UserComment } from "./UserComment"
import styles from './styles.module.css';
import { addReviewProduct, getReviewProduct } from "../../service/review";

export const Comments = ({ isPage, product }) => {
    const [comments, setComments] = useState([])
    const [textComment, setTextComment] = useState('')
    const [isReset, setIsReset] = useState(false)

    const handleGetData = async () => {
        if (!product.ProductID) return
        const rs = await getReviewProduct({
            form: {
                ProductID: product.ProductID,
                category: 'product'
            }
        })
        setComments(rs.data[0])
    }

    const onComment = async (text) => {
        try {
            const storedUser = localStorage.getItem("user");
            const userData = JSON.parse(storedUser);
            const rs = await addReviewProduct({
                formReview: {
                    reviewText: text || textComment,
                    rating: 5,
                    category: 'product'
                },
                cusID: userData.id,
                categoryID: product.ProductID
            })
            setIsReset(!isReset)
        } catch (error) {
            console.error('error onComment: ', error);

        }
    }

    useEffect(() => {
        handleGetData()
    }, [product, isReset])
    return (
        <div className={isPage ? styles.comment_container_page : styles.comment_container}>

            <InputCustom textComment={textComment} setTextComment={setTextComment} onComment={onComment} />

            <div className={isPage ? styles.comment_body_page : styles.comment_body}>
                {comments?.map((i) => <UserComment review={i} />)}
            </div>
        </div>
    )
}