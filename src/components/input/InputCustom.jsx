import styles from './styles.module.css';

export const InputCustom = ({textComment, setTextComment, onComment}) => {
    const handleComment = (text) =>{
        onComment(text)
        setTextComment('')
    }
    return (
        <label className={styles.label}>
            <span className={styles.icon} onClick={()=> handleComment(textComment)}>
                <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="1.25"
                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    ></path>
                </svg>
            </span>
            <input
            onKeyPress={(e) => {
                if(e.key === 'Enter'){
                    handleComment(e.target.value)
                }
            }}
            onChange={(e) => setTextComment(e.target.value)}
            value={textComment}
                type="text"
                className={styles.input}
                placeholder="Nêu cảm nghĩ của bạn ..."
                autoComplete="off"
            />
        </label>
    );
};
