import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import styles from "./Blog.module.css";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/Blog/${id}`);
                setBlog(response.data);

                const categoryResponse = await axios.get(`http://localhost:3001/api/blogcategory/${response.data.CategoryID}`);
                setCategoryName(categoryResponse.data?.Name || "Unknown");
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
        <div className={styles.detailwrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>{blog.Title}</h2>
                <p className={styles.category}>Danh mục:{categoryName}</p>
                <img src={blog.Image} alt={blog.Title} className={styles.image} />
                <p className={styles.content}>{blog.Content}</p>
            </div>
            <Footer />
        </div>
    )
}

export default BlogDetails