import { Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import CustomDateTimePicker from '../../components/form/CustomDateTimePicker';
import CustomTextField from '../../components/form/CustomTextField';
import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import CustomButton from '../../components/form/CustomButton';
import CustomTextarea from '../../components/form/CustomTextArea';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import userRequest from '../../requests/user-request';
import leaveRequest from '../../requests/leave-request';

const AddUpdate = () => {
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    const [userOptions, setUserOptions] = useState([]);
    const [leaves, setLeaves] = useState({
        status: 'applied',
        from_date: null,
        to_date: null,
        subject: ''
    });
    const [errors, setErrors] = useState([]);
    

    useEffect(() => {
        if (id) {
            leaveRequest.find(id).then(res => {
                setLeaves({
                    ...res,
                    user_id: res.user_id ? { key: res.user_id.id, value: res.user_id.name } : null
                });

                setIsLoading(false);
                let userOpt = res.user
                    ? [
                          {
                              key: res.user.id,
                              value: res.user.name
                          }
                      ]
                    : [];
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUsers = async filter => {
        userRequest.index(filter).then(res => {
            let newOptions = res.results.length
                ? res.results.map(option => {
                      return {
                          key: option.id,
                          value: option.name
                      };
                  })
                : [];
            setUserOptions(newOptions);
        });
    };

    const handleOnchange = e => {
        const { name, value } = e.target;
        setLeaves(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const onChangeDate = (value, name) => {
        setLeaves(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            leaveRequest
                .update(id, {
                    ...leaves
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            leaveRequest
                .store({
                    ...leaves
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
    };
    const [openDialog, setOpenDialog] = useState(false);
    console.log(leaves);

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Apply'} Leave
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomDateTimePicker
                        name="from_date"
                        error={!!errors.from_date}
                        helperText={errors.from_date}
                        value={leaves.from_date}
                        label="leave from"
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomDateTimePicker
                        name="to_date"
                        error={!!errors.to_date}
                        helperText={errors.to_date}
                        value={leaves.to_date}
                        label="leave to"
                        onChange={onChangeDate}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={4}>
                    <CustomTextField name="subject" label="Subject" onChange={handleOnchange} value={leaves.subject} />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12}>
                    <CustomTextarea
                        name="message"
                        value={leaves.message}
                        placeholder="Body"
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>

            <Stack spacing={2} direction="row">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Update' : 'Apply'}
                ></CustomLoadingButton>
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.goBack()} />
            </Stack>
        </>
    );
};
export default AddUpdate;
