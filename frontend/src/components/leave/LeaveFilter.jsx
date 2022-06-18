import React, { useContext, useState } from 'react';
import { Grid, Paper, Stack } from '@mui/material';
import CustomLoadingButton from '../form/CustomLoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import CustomButton from '../form/CustomButton';
import CustomSelect from '../form/CustomSelect';
import CustomDateTimePicker from '../form/CustomDateTimePicker';

const LeaveFilter = () => {
    const onChangeDate = (value, name) => {};
    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSelect name="status" label="Status" />
                </Grid>
                <Grid item xs={3}>
                    <CustomDateTimePicker name="from_Date" label="leave from" onClick={onChangeDate} />
                </Grid>
                <Grid item xs={3}>
                    <CustomDateTimePicker name="to_Date" label="leave to" onClick={onChangeDate} />
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <Stack spacing={2} direction="row">
                    <CustomLoadingButton
                        startIcon={<SearchIcon />}
                        variant="contained"
                        text="Search"
                    ></CustomLoadingButton>
                    <CustomButton text="Clear" variant="outlined" />
                </Stack>
            </Grid>
        </Paper>
    );
};

export default LeaveFilter;
