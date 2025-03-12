import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer'
import styles from './Blog.module.css';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/Blog/');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/Blog/categories');
    
            console.log("Dữ liệu categories từ API:", response.data); 
    
            if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
                console.log("Không có danh mục nào, hiển thị mặc định.");
                setCategories([{ id: 'All', name: 'Tất cả' }]);
                return;
            }
    
            setCategories([{ id: 'All', name: 'Tất cả' }, ...response.data.map(category => ({ id: category.ID, name: category.Name }))]);
        } catch (error) {
            console.error('Lỗi khi lấy categories:', error);
            setCategories([{ id: 'All', name: 'Tất cả' }]);
        }
    };    

    useEffect(() => {
        fetchBlogs();
        fetchCategories();
    }, []);

    const filteredBlogs =
        selectedCategory === 'All' ?
            blogs :
            blogs.filter(blog => blog.CategoryID === selectedCategory);

    return (
        <div className={styles.blogWrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>Blog Đồ Ăn</h2>

                <div className={styles.categoryContainer}>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {filteredBlogs.length > 0 ? (
                    <div className={styles.blogList}>
                        {filteredBlogs.map(blog => {
                            const categoryName = categories.find(c => c.ID === blog.CategoryID)?.name || 'Chưa xác định';
                            return (
                                <Link to={`/blog/${blog.BlogID}`} key={blog.BlogID} className={styles.blogLink}>
                                    <img src={blog.Image} alt={blog.Title} className={styles.blogImage} />
                                    <div className={styles.blogContent}>
                                        <p className={styles.blogCategory}>{categoryName}</p>
                                        <h3 className={styles.blogTitle}>{blog.Title}</h3>
                                        <p className={styles.blogDescription}>{blog.ShortDescription}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <p>Không tìm thấy blog nào!</p>
                )}

                {filteredBlogs.length > 0 && (
                    <div className={styles.button}>
                        <button className={styles.button}>Xem thêm</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default BlogList;