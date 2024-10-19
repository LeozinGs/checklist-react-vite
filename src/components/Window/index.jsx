import './styles.css';

const Window = ({ children }) => {
    return (
        <div className="window-frame">
            {children}
        </div>
    );
}

export default Window;