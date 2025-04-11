import React from 'react';

class EmergencyContactManager extends React.Component {
    constructor(props) {
        super(props);
        this.contacts = [
            { name: 'John Doe', phone: '123-456-7890' },
            { name: 'Jane Smith', phone: '098-765-4321' },
            // ... add more contacts as needed ...
        ];
        this.state = {
            showContacts: false,
        };
    }

    // Method to toggle the display of emergency contacts
    toggleEmergencyContacts = () => {
        this.setState(prevState => ({ showContacts: !prevState.showContacts }));
        if (!this.state.showContacts) {
            setTimeout(() => {
                this.setState({ showContacts: false });
            }, 5000); // Automatically hide after 5 seconds
        }
    };

    render() {
        return (
            <div>
                <button 
                    onClick={this.toggleEmergencyContacts} 
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: 'red',
                        color: 'white',
                        fontSize: '20px',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        zIndex: '1000', // Ensure button is on top
                    }}
                >
                    SOS
                </button>

                {this.state.showContacts && (
                    <div style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        padding: '10px',
                        zIndex: '1000', // Ensure contact list is on top
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Add shadow for visibility
                    }}>
                        {this.contacts.map((contact, index) => (
                            <p key={index}>{contact.name}: {contact.phone}</p>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default EmergencyContactManager; 