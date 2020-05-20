import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class AddCar extends React.Component {
    state = {
        car: {
            make: '',
            model: '',
            year: ''
        },
        person: {
            id: '',
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`api/peoplecar/getpersonbyid?id=${this.props.match.params.id}`);
        this.setState({ person: data });
    }
    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.car[e.target.name] = e.target.value;
        })
        this.setState(nextState);
    }
    onAddClick = async () => {
        await axios.post('api/peoplecar/addcar', {Car: this.state.car, personId: this.state.person.id });
        this.props.history.push('/');
    }
    render() {
        const { make, model, year } = this.state.car;
        const { firstName, lastName } = this.state.person;
        return (
            <div className='container' style={{ marginTop: 60 }}>
                <div className="col-md-6 col-md-offset-3 well">
                    <h2>Add car for {firstName} {lastName}</h2>
                    <input name='make'
                        className="form-control"
                        type="text"
                        placeholder="Make"
                        value={make}
                        onChange={this.onTextChange} />
                    <br />
                    <input
                        name='model'
                        className="form-control"
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={this.onTextChange} />
                    <br />
                    <input
                        name='year'
                        className="form-control"
                        type="text"
                        placeholder="Year"
                        value={year}
                        onChange={this.onTextChange} />
                    <br />
                    <button onClick={this.onAddClick} className="btn btn-success btn-lg btn-block">Add Car</button>
                </div>
            </div>
        );

    }
}

export default AddCar;