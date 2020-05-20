import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { produce } from 'immer';
import PersonCarRow from './PersonCarRow';

class PeopleCarTable extends React.Component {

    state = {
        people: [],
        filteredPeople: [],
        searchText:''
    }

    componentDidMount = async () => {
       await this.refreshTable();
    }

    refreshTable = async () => {
        const { data } = await axios.get('api/peoplecar/getall');
        this.setState({ people: data, filteredPeople: data, searchText: '' }); 
    }
    onSearchChange = e => {
        const nextState = produce(this.state, draft => {  
            draft.searchText = e.target.value.toLowerCase();
            draft.filteredPeople = draft.filteredPeople.filter
                (person => person.firstName.toLowerCase().includes(draft.searchText) || person.lastName.toLowerCase().includes(draft.searchText));  
   
        });
        this.setState(nextState);
        console.log(this.state.filteredPeople);
    }

    render() {

        return (
            <div className='container' style={{ marginTop: 60 }}>
                <div className='row'>
                    <div className='col-md-6  col-md-offset-3'>
                        <Link to='/addperson'>
                            <button className='btn btn-success btn-block'>
                                Add person</button></Link>
                    </div>
                    <div className='row' style={{ marginTop: 40 }}>
                        <input type='text' placeholder='Search...' className='form-control' value={this.searchText} onChange={this.onSearchChange}/>
                    </div>
                    <table style={{ marginTop: 20 }} className='table table-striped table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Car Count</th>
                                <th>Add Car</th>
                                <th>Delete Cars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filteredPeople.map(p =>
                                <PersonCarRow key={p.Id} person={p}  />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default PeopleCarTable;