import React, { useEffect, useState } from 'react';
import { AgGridReact} from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCars();
    }, [])

    const fetchCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                fetchCars();
                setMsg('Car deleted succesfully')
                setOpen(true);
            }
            else {
                alert('Jokin meni vikaan');
            }
        })
        .catch(err => console.error(err))
    }
}

    const addCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
          method: 'POST', 
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok) {
                fetchCars();
            }
            else {
                alert('Jokin meni vikaan lisäyksessä');
            }
        })
        .catch(err => console.error(err))
    }

    const updateCar = (url, updatedCar) => {
        fetch(url, {
            method: 'PUT',
            headers:  { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
                setMsg('Car edited succesfully')
                setOpen(true);
            }
            else {
                alert('Muokkaus epäonnistui');
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true, width: 120},
        {field: 'year', sortable: true, filter: true, width: 120},
        {field: 'fuel', sortable: true, filter: true, width: 120},
        {field: 'price', sortable: true, filter: true, width: 120},
        {
            headerName: '',
            field: '_links.self.href',
            width: 120,
            cellRendererFramework: params => <EditCar updateCar={updateCar} params={params} />
        },
        {
            headerName: '',
            field: '_links.self.href',
            sortable: false,
            filter: false,
            width: 120,
            cellRendererFramework: params =>
             <Button 
                size="small" 
                onClick={() => deleteCar(params.value)}
                color="error"
             >
                Delete
            </Button>
        }
    ]

    return(
        <React.Fragment>
            <AddCar addCar={addCar} />
        <div className="ag-theme-material" style={{height: 600, width: '80%', margin:'auto'}}>
            <AgGridReact
                rowData={cars}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message={msg}
        />
        </React.Fragment>
    )
}

export default Carlist;