import { useEffect, useState } from 'react';
import IconComponent from '../IconComponent';
import Button from '../Button';
import Title from '../Title';
import './styles.css';
import Content from '../Content';
import Window from '../Window';

const AppContainer = () => {

    const [list, setList] = useState([]);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    let checklist = JSON.parse(localStorage.getItem('listLocal')) || [];

    useEffect(() => {
        setList(checklist);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    function setListSetValue() {
        setList(checklist);
        setValue('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (value !== ' ') {
            const newItem = {
                name: value.charAt(0).toUpperCase() + value.slice(1),
                amount: null, // O preço começa como nulo
                quantity: 1 // A quantidade começa nula
            };
            checklist.push(newItem);
            localStorage.setItem('listLocal', JSON.stringify(checklist));
            setListSetValue();
        } else {
            alert('Please enter a valid item.');
        }
    }

    // function handleSubmit(event) {
    //     if (value !== ' ') {
    //         event.preventDefault();
    //         checklist.push(value.charAt(0).toUpperCase() + value.slice(1));
    //         localStorage.setItem('listLocal', JSON.stringify(checklist));
    //         setListSetValue();
    //     } else {
    //         alert('This item is not valid')
    //     }
    // }

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
        const newValue = prompt('Edit your item!', list[index].name);
        if (newValue) {
            checklist[index].name = newValue.charAt(0).toUpperCase() + newValue.slice(1);
            localStorage.setItem('listLocal', JSON.stringify(checklist));
            setListSetValue();
        }
    }

    function handleEditAmount(index) {
        const newAmount = prompt('Enter the price for your item:', list[index].amount);
        if (newAmount !== null && !isNaN(newAmount) && newAmount.trim() !== '') {
            checklist[index].amount = parseFloat(newAmount).toFixed(2);  // Atualiza o preço
            localStorage.setItem('listLocal', JSON.stringify(checklist));
            setListSetValue();
        }
    }

    function handleEditQuantity(index) {
        const newQuantity = prompt('Enter the quantity of your item:', list[index].quantity);
        if (newQuantity !== null && !isNaN(newQuantity) && newQuantity.trim() !== '') {
            checklist[index].quantity = parseInt(newQuantity);  // Atualiza a quantidade
            localStorage.setItem('listLocal', JSON.stringify(checklist));
            setListSetValue();
        }
    }

    const totalAmount = list.reduce((total, item) => total + (item.amount * item.quantity || 0), 0);

    return (
        <Window>
            <div className="holder">
                <div className="title-bar">
                    <div className="title-bar-text">Checklist</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
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
                <Content>
                    <div className="list-title">
                        <div className='list-title_text'>
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
                    </div>
                    {list ?
                        list.map((item, index) => (
                            <>
                                <li className="list-item" key={index}>
                                    {item.name} - {item.quantity !== null ? item.quantity : '0'} - {item.amount !== null ? 'R$' + item.amount * item.quantity : 'R$0'}
                                    <div className="options">
                                        <IconComponent
                                            handleClick={() => handleEditQuantity(index)}
                                            className={'quantity'}
                                            icon={'add_circle'}
                                            style={{ fontSize: 20 }}
                                        />
                                        <IconComponent
                                            handleClick={() => handleEditAmount(index)}
                                            className={'price'}
                                            icon={'sell'}
                                            style={{ fontSize: 20 }}
                                        />
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
                </Content>
                <div className="status-bar">
                    <p className="status-bar-field">Press F1 for help</p>
                    <p className="status-bar-field">Items: {list.length}</p>
                    <p className="status-bar-field">Total: {totalAmount.toFixed(2)}</p>
                </div>
            </div>
        </Window>
    );
}

export default AppContainer;