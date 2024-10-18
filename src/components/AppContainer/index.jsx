import { useEffect, useState } from 'react';
import IconComponent from '../IconComponent';
import Button from '../Button';
import Title from '../Title';
import './styles.css';

const AppContainer = () => {

    const [list, setList] = useState([]);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    let checklist = JSON.parse(localStorage.getItem('listLocal')) || [];

    useEffect(() => {
        setList(checklist);
    }, []);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    function setListSetValue() {
        setList(checklist);
        setValue('');
    }

    function handleSubmit(event) {
        if (value !== ' ') {
            event.preventDefault();
            checklist.push(value.charAt(0).toUpperCase() + value.slice(1));
            localStorage.setItem('listLocal', JSON.stringify(checklist));
            setListSetValue();
        } else {
            alert('This item is not valid')
        }
    }

    function handleDeleteAll() {
        localStorage.setItem('listLocal', JSON.stringify([]));
        checklist = [];
        setListSetValue();
    }

    function handleDeleteItem(index) {
        checklist.splice(index, 1);
        localStorage.setItem('listLocal', JSON.stringify(checklist));
        setListSetValue();
    }

    function handleEditItem(index) {
        const newValue = prompt('Edit your item!.');
        checklist.splice(index, 1);
        checklist.splice(index, 0, (newValue.charAt(0).toUpperCase() + newValue.slice(1)));
        localStorage.setItem('listLocal', JSON.stringify(checklist));
        setListSetValue();
    }

    return (
        <div className="window" style={{ width: '100%', minHeight: '95vh' }}>
            <div className="title-bar">
                <div className="title-bar-text">Checklist</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body">
                <Title>Checklist App</Title>
                <form onSubmit={handleSubmit}>
                    <div className="field-row">
                        <label htmlFor="text-input">Item</label>
                        <input
                            required={true}
                            id='text-input'
                            type={'text'}
                            placeholder={'Describe your item.'}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button>Add</Button>
                    </div>
                </form>
                <ul className="tree-view">
                    <div className="list-title">
                        <p>Items</p>
                        <IconComponent
                            icon={'more_vert'}
                            style={{ cursor: 'pointer', position: 'relative', userSelect: 'none' }}
                            state={isOpen}
                            handleClick={handleClick}
                            handleDeleteAll={handleDeleteAll}
                        />
                    </div>
                    <hr />
                    {list ?
                        list.map((item, index) => (
                            <>
                                <li className="list-item" key={index}>
                                    {item}
                                    <div className="options">
                                        <IconComponent
                                            handleClick={() => handleEditItem(index)}
                                            className={'edit'}
                                            icon={'edit'}
                                            style={{ fontSize: 20 }}
                                        />
                                        <IconComponent
                                            handleClick={() => handleDeleteItem(index)}
                                            className={'delete'}
                                            icon={'delete'}
                                            style={{ fontSize: 20 }}
                                        />
                                    </div>
                                </li>
                                <hr />
                            </>
                        ))
                        :
                        []
                    }
                </ul>
            </div>
            <div className="status-bar">
                <p className="status-bar-field">Press F1 for help</p>
                <p className="status-bar-field">Slide 1</p>
                <p className="status-bar-field">CPU Usage: 14%</p>
            </div>
        </div>
    );
}

export default AppContainer;