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
            if (contacts.some(contact => contact.name === name)){
                window.alert('Error: Contact already exists.')
            } else{
                // If contact doesn't exist, create a new contact object with the current timestamp as the unique 'id'
                const newContact = {
                    id: Date.now(),
                    name: name,
                    number: number,
                }
                // Add the new contact to the contacts array and reset the name field

                this.setState(prevState => ({
                    contacts: [...prevState.contacts, newContact],
                    name: '',
                    number: ''
                }));
            }
            
        } 
    };
    // Event handler for changes in the filter input field
    handleFilterChange = e => {
        this.setState({
            filter: e.target.value
        })
    }

    handleRemove = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId)
        }))
    
    }

    render() {
        // Extract the values from the state for ease of use
        const { number, name, contacts, filter } = this.state;
        // const { handleChange, handleNumberChange, handleSubmit, handleFilterChange } = this;

         // Filter the contacts based on the 'filter' state
         const filteredContacts = contacts.filter(contact => contact.name.includes(filter))

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
                    onChange={this.handleChange} // Call handleChange function when the input value changes
                />
                <h2>Phone Number</h2>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={this.handleNumberChange}
                />
                <button onClick={this.handleSubmit}>Add contact</button>

                <h2>contact</h2>

                <p>Find contacts by name</p>
                <input
                type="text"
                placeholder="Search by name"
                value={filter}
                onChange={this.handleFilterChange}
                
                />

                {filteredContacts.length === 0 ? (
                    // Display "No contacts" if there are no contacts in the 'contacts' array
                    <h2>No contacts</h2>
                ) : (
                    // Display the list of contacts using the 'ul' and 'li' elements
                    <ul>
                        {filteredContacts.map(({name, number, id})=>(
                            <li key={id}>{name} : {number}
                            <button type='button' onClick={() => this.handleRemove(id)} >Delete Contact</button>
                            </li>
                           
                        ))
                        }
                       
                    </ul>
                     
                   
                )}  
                
            </div>
        );
    }
}