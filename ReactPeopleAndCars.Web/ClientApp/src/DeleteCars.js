import React from 'react';
import axios from 'axios';


class DeleteCars extends React.Component {
    state = {
        cars: [],
        id: this.props.match.params.id 
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`api/peoplecar/getcarsbyid?id=${this.props.match.params.id}`);
        this.setState({ cars: data });
    }
    onYesClick = async() => {
        await axios.post('api/peoplecar/deletecars', { id: this.state.id });
        this.props.history.push('/');
    }
    onNoClick = () => {
        this.props.history.push('/');
    }

    render() {

        return (            
            <div className='container' style={{ marginTop: 60 }}>
                <div className='well'>
                    <ul>
                    {this.state.cars.length === 0 && <h1>There are no cars to delete!</h1>}
                        {this.state.cars.length >= 1 && this.state.cars.map(car => <li>{car.make} {car.model} {car.year}</li>)}
                    </ul>                 
                </div>
                <h4>Are you sure you want to delete all of these cars?</h4>
                <br />
                <button className='btn btn-danger' onClick={this.onYesClick}>Yes</button>
                <button style={{ marginLeft: 15 }} className='btn btn-primary' onClick={this.onNoClick}>No</button>
            </div>);
    }
}

export default DeleteCars;