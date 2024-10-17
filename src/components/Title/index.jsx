import IconComponent from '../IconComponent';
import './styles.css';

const Title = ({ children }) => {
    return (
        <div className='title'>
            <h1>{children}</h1>
            <IconComponent icon={'done_outline'} style={{ fontSize: 32 }} />
        </div>
    );
}

export default Title;