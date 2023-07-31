import React, { Component } from "react";
import { nanoid } from 'nanoid';

export class PhoneBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            name: ''
        }
    }

    handleChange = (e) => {
        return this.setState({name: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name} = this.state;
        const {addContact} = this.props;

        addContact(name); // store the entered name here?

        this.setState({name:""}); //reverse the input to empty line
        
    }

    render() {
        const{name} = this.state;
        const {handleChange, handleSubmit} = this

        return (
            <div>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
                    required
                    // value={name}
                    onChange = {handleChange}
                />
                <button onClick={handleSubmit}>Add contact</button>
                <h2>contact</h2>
                <ul>
                    <li>{name}</li>
                </ul>
            </div>
        )
    }

}


