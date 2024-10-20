import './styles.css';

const IconComponent = ({ icon, style, handleClick, className }) => {
    return (

        <>
            <i className={`material-icons ${className}`} style={style} onClick={handleClick}>
                {icon}
            </i>
        </>
    );
}

export default IconComponent;