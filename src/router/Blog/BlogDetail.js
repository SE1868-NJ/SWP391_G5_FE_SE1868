import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import styles from "./BlogDetail.module.css";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const navigate = useNavigate();

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
                <div className={styles.topPage}>
                    <h2 className={styles.title}>{blog.Title}</h2>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>Quay lại</button>
                    <button className={styles.editButton} onClick={() => navigate(`/blog/update/${id}`)}>Sửa</button>
                </div>
                <p className={styles.category}>
                    <strong>Danh mục:</strong> {categoryName}
                </p>
                <div className={styles.imageWrapper}>
                    <img src={blog.Image} alt={blog.Title} className={styles.blogImage} />
                    <p />
                    {blog.Images && blog.Images.length > 0 ? (
                        blog.Images.map((img, index) => (
                            <img key={index} src={img.ImageURL} alt={`Ảnh ${index + 1}`} className={styles.blogImage} />
                        ))
                    ) : (
                        <p className={styles.noImage}>No image</p>
                    )}
                </div>
                <div className={styles.contentWrapper}>
                    <p className={styles.content}>{blog.ShortDescription}</p>
                    {blog.Sections && blog.Sections.length > 0 ? (
                        blog.Sections.map((section, index) => (
                            <p key={index} className={styles.contentSection}>
                                {section.Content}
                            </p>
                        ))
                    ) : (
                        <p className={styles.noContent}>No content</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BlogDetail