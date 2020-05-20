import React from 'react';
import { Route } from 'react-router';
import PeopleCarTable from './PeopleCarTable';
import AddPerson from './AddPerson';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';

const App = () => {

    return (
        <div>
            <Route exact path='/' component={PeopleCarTable} />
            <Route exact path='/addperson' component={AddPerson} />
            <Route exact path='/addcar/:id' component={AddCar} />
            <Route exact path='/deletecars/:id' component={DeleteCars} />
        </div>
        );
}

export default App;