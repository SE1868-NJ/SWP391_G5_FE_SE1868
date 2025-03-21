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
                console.log("Dữ liệu nhận được từ API:", response.data);
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

    const sortedImages = (blog.Images || []).sort((a, b) => a.SortOrder - b.SortOrder);
    const sortedSections = (blog.Sections || []).sort((a, b) => a.SortOrder - b.SortOrder);

    return (
        <div className={styles.blogDetailWrapper}>
            <Header />
            <div className={styles.container}>
                <div className={styles.topPage}>
                    <button className={styles.backButton} onClick={() => navigate(`/blog`)}>Quay lại</button>
                    <h2 className={styles.title}>{blog.Title}</h2>
                    <button className={styles.editButton} onClick={() => navigate(`/blog/update/${id}`)}>Sửa</button>
                </div>
                <p className={styles.category}>
                    <strong>Danh mục:</strong> {categoryName}
                </p>

                <div className={styles.imageWrapper}>
                    <img src={blog.Image} alt={blog.Title} className={styles.blogImage} />
                </div>

                <p className={styles.shortDescription}>{blog.ShortDescription}</p>

                <div className={styles.contentWrapper}>
                    {sortedImages.length > 0 && sortedSections.length > 0 ? (
                        sortedImages.map((img, index) => (
                            <div key={index} className={styles.contentBlock}>
                                <img src={img.ImageURL} alt={`Ảnh ${index + 1}`} className={styles.blogImage} />
                                {sortedSections[index] && (
                                    <p className={styles.contentSection}>{sortedSections[index].Content}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        sortedSections.map((section, index) => (
                            <div key={index} className={styles.contentBlock}>
                                <p className={styles.contentSection}>{section.Content}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BlogDetail