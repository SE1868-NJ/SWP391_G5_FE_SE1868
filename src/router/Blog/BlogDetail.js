import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import styles from "./BlogDetail.module.css";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/Blog/${id}`);
                setBlog(response.data);

                const categoryResponse = await axios.get(`http://localhost:3001/api/blogcategory`);
                const categories = categoryResponse.data || [];

                const category = categories.find(c => c.ID === response.data.CategoryID);
                setCategoryName(category ? category.Name : "Không xác định");
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className={styles.blogDetailwrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>{blog.Title}</h2>
                <p className={styles.category}>
                    <strong>Danh mục:</strong> {categoryName}
                </p>
                <div className={styles.imageWrapper}>
                    <img src={blog.Image} alt={blog.Title} className={styles.blogImage} />
                </div>
                <p className={styles.content}>{blog.Content}</p>
            </div>
            <Footer />
        </div>
    )
}

export default BlogDetail