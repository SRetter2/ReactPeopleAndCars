import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class AddPerson extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age:''
        }
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.person[e.target.name] = e.target.value;
        })        
        this.setState(nextState);
    }
    onAddClick = async() => {
        await axios.post('api/peoplecar/addperson',this.state.person);
        this.props.history.push('/');
    }
    render() {
        const { firstName, lastName, age } = this.state.person;
        return (
            <div className='container' style={{ marginTop: 60 }}>
                <div className="col-md-6 col-md-offset-3 well">
                    <input name='firstName'
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={this.onTextChange} />
                    <br />
                    <input
                        name='lastName'
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={this.onTextChange} />
                    <br />
                    <input
                        name='age'
                        className="form-control"
                        type="text"
                        placeholder="Age Name"
                        value={age}
                        onChange={this.onTextChange} />
                    <br />
                    <button onClick={this.onAddClick} className="btn btn-success btn-lg btn-block">Add</button>
                </div>
            </div>
            );
    }

}

export default AddPerson;