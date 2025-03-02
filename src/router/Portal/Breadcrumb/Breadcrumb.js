import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css"; // Tạo file CSS riêng cho breadcrumb

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>Trang chủ</Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                return (
                    <span key={index}>
                        {" > "}
                        <Link to={routeTo} className={styles.breadcrumbLink}>
                            {decodeURIComponent(name)}
                        </Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
