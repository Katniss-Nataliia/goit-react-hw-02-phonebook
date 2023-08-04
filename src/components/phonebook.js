import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class PhoneBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            filter: '',
            name: '',
            number: '',
        };
    }

    handleChange = e => {
        
        this.setState({
            name: e.target.value
        });
        
        
    };
    handleNumberChange = e => {
        this.setState({
            number: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { contacts, name, number } = this.state;

        if (name.trim() && number.trim() !== '') {
            const newContact = {
                id: nanoid(),  // Using nanoid() to generate a unique identifier for the new contact
                name: name,
                number: number,
            };

            // Add the new contact to the contacts array and reset the name field
            this.setState({
                contacts: [...contacts, newContact],
                name: '',
                number: ''
            });
        } else if(name.find(item => item.id === e.id)){
            window.alert("error")
        }
    };
    handleFilterChange = e => {
        this.setState({
            filter: e.target.value
        })
    }

    render() {
        const { number, name, contacts, filter } = this.state;
        const { handleChange, handleNumberChange, handleSubmit, handleFilterChange } = this;

        return (
            <div>
                {/* Input field for entering contact name */}
                <h2>Name</h2>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
                    required
                    value={name} // Bind the input value to the 'name' state
                    onChange={handleChange} // Call handleChange function when the input value changes
                />
                <h2>Phone Number</h2>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleNumberChange}
                />
                <button onClick={handleSubmit}>Add contact</button>

                <h2>contact</h2>

                <p>Find contacts by name</p>
                <input
                type="text"
                placeholder="Search by name"
                value={filter}
                onChange={handleFilterChange}
                
                />

                {contacts.length === 0 ? (
                    // Display "No contacts" if there are no contacts in the 'contacts' array
                    <h2>No contacts</h2>
                ) : (
                    // Display the list of contacts using the 'ul' and 'li' elements
                    <ul>
                        {contacts.filter(filter => filter.includes({name})).map(({name, number, id}) => {
                            <li key={id}>{name} : {number}</li>
                        })}
                    </ul>
                    // <ul>
                    //     {contacts.map(({name, number, id }) => (
                           
                    //         <li key={id}>{name} : {number}</li>
                           
                    //     ))}
                    // </ul>
                )}
            </div>
        );
    }
}