import './styles.css';

const Button = ({ children, handleDeleteAll }) => {
    return (
        <div className="button">
            <button onClick={handleDeleteAll}>{children}</button>
        </div>
    );
}

export default Button;