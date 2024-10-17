import Button from '../Button';
import './styles.css';

const IconComponent = ({ icon, style, state, handleClick, handleDeleteAll, className }) => {
    return (

        <>
            <i className={`material-icons ${className}`} style={style} onClick={handleClick}>
                {icon}
                {state ?
                    <div className="window option-box" style={{ width: 150, textAlign: 'center' }}>
                        <div className="title-bar">
                            <div className="title-bar-text">Delete List</div>
                            <div className="title-bar-controls">
                                <button aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="window-body">
                            <Button
                                handleDeleteAll={handleDeleteAll}
                            >
                                Delete All
                            </Button>
                        </div>
                    </div>
                    :
                    null
                }
            </i>
        </>
    );
}

export default IconComponent;