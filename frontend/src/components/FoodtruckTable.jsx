import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, CircularProgress, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import MapModal from './MapModal';

const FoodtruckTable = () => {
    const [foodtrucks, setFoodtrucks] = useState([]);
    const [filter, setFilter] = useState('');
    const [status, setStatus] = useState('');
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/foodtrucks').then(response => {
            const dataWithId = response.data.map((truck) => ({
                ...truck,
                id: truck.locationid,
            }));
            setFoodtrucks(dataWithId);
            setLoading(false);
        });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleRowClick = (params) => {
        setSelected(params.row);
    };

    const handleCloseModal = () => {
        setSelected(null);
    };

    const columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button onClick={() => handleRowClick(params)}>View on Map</Button>
            ),
        },
        { field: 'locationid', headerName: 'Location ID', width: 100 },
        { field: 'Applicant', headerName: 'Applicant Name', width: 150 },
        { field: 'FacilityType', headerName: 'Type', width: 100 },
        { field: 'cnn', headerName: 'CNN', width: 100 },
        { field: 'LocationDescription', headerName: 'Description', width: 200 },
        { field: 'Address', headerName: 'Location', width: 200 },
        { field: 'blocklot', headerName: 'Blocklot', width: 100 },
        { field: 'block', headerName: 'Block', width: 100 },
        { field: 'lot', headerName: 'Lot', width: 100 },
        { field: 'permit', headerName: 'Permit', width: 100 },
        { field: 'Status', headerName: 'Status', width: 100 },
        { field: 'FoodItems', headerName: 'Food Items', width: 300 },
        { field: 'X', headerName: 'X', width: 100 },
        { field: 'Y', headerName: 'Y', width: 100 },
        { field: 'Latitude', headerName: 'Latitude', width: 100 },
        { field: 'Longitude', headerName: 'Longitude', width: 100 },
        { field: 'Schedule', headerName: 'Schedule', width: 200 },
        { field: 'dayshours', headerName: 'Days/Hours', width: 150 },
        { field: 'NOISent', headerName: 'NOI Sent', width: 100 },
        { field: 'Approved', headerName: 'Approved', width: 100 },
        { field: 'Received', headerName: 'Received', width: 100 },
        { field: 'PriorPermit', headerName: 'Prior Permit', width: 100 },
        { field: 'ExpirationDate', headerName: 'Expiration Date', width: 150 },
        { field: 'Location', headerName: 'Location', width: 200 },
        { field: 'Fire Prevention Districts', headerName: 'Fire Prevention Districts', width: 200 },
        { field: 'Police Districts', headerName: 'Police Districts', width: 200 },
        { field: 'Supervisor Districts', headerName: 'Supervisor Districts', width: 200 },
        { field: 'Zip Codes', headerName: 'Zip Codes', width: 100 },
        { field: 'Neighborhoods (old)', headerName: 'Neighborhoods (old)', width: 200 },

    ];

    const filteredRows = foodtrucks.filter(truck =>
        (truck.Applicant.includes(filter) || truck.Address.includes(filter)) &&
        (status === '' || truck.Status === status)
    );

    return (
        <div className="flex flex-col items-center">
            <Grid container spacing={2} className="mb-4">

                <Grid item xs={12} sm={12}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        "justifyContent": "center",
                        gap: "20px",
                        padding: "20px"

                    }}>
                        <span>Filter:</span>
                        <TextField
                            label="Filter by Applicant or Location"
                            value={filter}
                            onChange={handleFilterChange}
                            className="w-full"
                        />
                        <FormControl variant="outlined" className="selectFilter">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={handleStatusChange}
                                label="Status"
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="REQUESTED">REQUESTED</MenuItem>
                                <MenuItem value="EXPIRED">EXPIRED</MenuItem>
                                <MenuItem value="APPROVED">APPROVED</MenuItem>
                                <MenuItem value="ISSUED">ISSUED</MenuItem>
                                <MenuItem value="SUSPEND">SUSPEND</MenuItem>
                            </Select>
                        </FormControl>
                    </div>


                </Grid>

            </Grid>
            {loading ? (
                <div style={{ textAlign: "center", padding: "40px" }}><CircularProgress /></div>
            ) : (
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        pageSize={10}
                        className="bg-white"
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f5f5f5',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#f5f5f5',
                            },
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </div>
            )}
            {selected && <MapModal truck={selected} onClose={handleCloseModal} />}
        </div>
    );
};

export default FoodtruckTable;
