import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./FAQ.module.css";

function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const { data } = await axios.get("http://localhost:3001/api/faqs/popular");
                setFaqs(data);
            } catch (error) {
                console.error("Lỗi tải FAQ:", error);
            }
        };

        fetchFAQs();
    }, []);

    const handleFAQClick = async (index, faq) => {
        try {
            await axios.patch(`http://localhost:3001/api/subitems/increment/${faq.id}`);

            const { data: categories } = await axios.get("http://localhost:3001/api/categories");
            const foundCategory = categories.find(cat => cat.id === faq.category_id);

            if (foundCategory) {
                navigate(`/category/${foundCategory.link.replace("/category/", "")}/${faq.id}`);
            } else {
                navigate(`/category/unknown/${faq.id}`);
            }

            setExpandedIndex(expandedIndex === index ? null : index);
        } catch (error) {
            console.error("Lỗi điều hướng FAQ:", error);
        }
    };

    return (
        <div className={styles.faqContainer}>

            <ul className={styles.faqList}>
                {faqs.map((faq, index) => (
                    <li
                        key={faq.id}
                        className={`${styles.faqItem} ${expandedIndex === index ? styles.active : ""}`}
                        onClick={() => handleFAQClick(index, faq)}
                    >
                        <h3 className={styles.faqQuestion}>{faq.question}</h3>
                        {expandedIndex === index && <p className={styles.faqAnswer}>{faq.answer}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQ;
