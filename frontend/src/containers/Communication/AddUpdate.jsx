import { Typography } from '@mui/material';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Grid, Stack } from '@mui/material';

import CustomTextField from '../../components/form/CustomTextField';
import CustomSelect from '../../components/form/CustomSelect';
import CustomButton from '../../components/form/CustomButton';
import { useEffect } from 'react';
import communicationsRequest from '../../requests/communications-request';
import taskRequest from '../../requests/task-request';
import userRequest from '../../requests/user-request';
import CustomSearchSelect from '../../components/form/CustomSearchSelect';
import CustomDateTimePicker from '../../components/form/CustomDateTimePicker';
import CustomLoadingButton from '../../components/form/CustomLoadingButton';

import { communicationTypeOption, scoreOption } from '../../constants';
import Score from './Score';

const AddUpdate = (toggleDrawer, open) => {
    const history = useHistory();
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    const [errors, setErrors] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    const [engineerNameOption, setEngineerNameOption] = useState([]);
    const [typeOption, setTypeOption] = useState([]);
    const [studentNameOption, setStudentNameOption] = useState([]);

    const [communication, setCommunication] = useState({
        reviewed_by: { key: '', value: '' },
        date_reviewed: ''
    });
    const [communicationField, setCommunicationField] = useState({
        communication_type: '',
        attribute_of_communication: ''
    });

    useEffect(() => {
        if (id) {
            communicationsRequest.find(id).then(res => {
                setCommunication({
                    ...res,
                    reviewed_by: res.reviewed_by ? { key: res.reviewed_by.id, value: res.reviewed_by.name } : null
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
                setUserOptions(userOpt);
            });
        }
    }, []);
    const onChangeSearchSelect = (value, name) => {
        setCommunication(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const getUsers = async filter => {
        userRequest.index(filter).then(res => {
            let newOptions = res.results.length
                ? res.results.map(Option => {
                      return {
                          key: Option.id,
                          value: Option.name
                      };
                  })
                : [];
            setUserOptions(newOptions);
        });
    };
    const onChangeDate = (value, name) => {
        setCommunication(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleOnchange = e => {
        const { name, value } = e.target;
        setCommunicationField(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            communicationsRequest
                .update(id, {
                    ...communication,
                    reviewed_by: communication.reviewed_by.key
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                    console.log('err', err);
                });
                
        } else{
            communicationsRequest.store({
                ...communication, reviewed_by: communication.reviewed_by.key
            })
            .then(() => history.goBack())
            .catch(err => {
                setErrors(err.response.data);
                setIsLoading(false)
            })
        }
    };

    // const stateValue = history.location.state ? history.location.state : null;
    // const [communication, setCommunication] = useEffect({
    //     user_id_assigned: stateValue ? stateValue.user_id_assigned : { key: '', value: '' },
    //     type: stateValue ? stateValue.type : { key: '', value: '' },
    //     student_name: stateValue ? stateValue.student_name : { key: '', value: '' },
    //     reviewed_by: { key: '', value: '' }
    // },[]);
    // useEffect(() => {
    //     if (id) {
    //         communicationsRequest.find(id).then(res => {
    //             setCommunication({
    //                 ...res,
    //                 user_id_assigned: res.task ? { key: res.task.id, value: res.task.name } : { key: '', value: '' },
    //                 type: res.task ? { key: res.task.id, value: res.task.type } : { key: '', value: '' },
    //                 session_student_name: res.task
    //                     ? { key: res.task.id, value: res.task.session_student_name }
    //                     : { key: '', value: '' },
    //                 reviewed_by: res.reviewed_by ? { key: res.reviewed_by.id, value: res.reviewed_by.name } : null
    //             });
    //             setIsLoading(false);
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const handleOnchange = e => {
    //     const { name, value } = e.target;
    //     setCommunication(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };
    // const onChangeSearchSelect = (value, name) => {
    //     setCommunication(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };
    // const onChangeDate = (value, name) => {
    //     setCommunication(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const getEngineer = async filter => {
    //     taskRequest.index(filter).then(res => {
    //         let newOptions = res.results.length
    //             ? res.results.map(option => {
    //                   return {
    //                       key: option.id,
    //                       value: option.name
    //                   };
    //               })
    //             : [];
    //         setEngineerNameOption(newOptions);
    //     });
    // };

    // const onSubmit = () => {
    //     setIsLoading(true);
    //     if (id) {
    //         communicationsRequest
    //             .update(id, {
    //                 ...communication,
    //                 user_id_assigned: communication.task.key,
    //                 type: communication.task.type,
    //                 student_name: communication.task.session_student_name
    //             })
    //             .then(() => history.goBack())
    //             .catch(err => {
    //                 setErrors(err.response.data);
    //                 setIsLoading(false);
    //             });
    //     } else {
    //         communicationsRequest
    //             .store({
    //                 ...communication,
    //                 user_id_assigned: communication.task.key,
    //                 type: communication.task.type,
    //                 student_name: communication.task.session_student_name,
    //             })
    //             .then(() => history.push('/communication'))
    //             .catch(err => {
    //                 setErrors(err.response.data);
    //                 setIsLoading(false);
    //             });
    //     }
    // };
    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} an Score
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSelect label="Student" name="Engineer name" />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect label="Type" name="type" />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect label="Student Name" name="student Name" />
                </Grid>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        label="Reviewed By"
                        name="reviewed_by"
                        errors={!!errors.reviewed_by}
                        helperText={errors.reviewed_by}
                        availableOptions={userOptions}
                        selectedValue={communication.reviewed_by}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsers({ name: e && e.target.value })}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={4}>
                    <CustomDateTimePicker
                        label="Date Reviewed"
                        name="date_reviewed"
                        errors={!!errors.date_reviewed}
                        helperText={errors.date_reviewed}
                        value={taskRequest.date_reviewed}
                        onChange={onChangeDate}
                    />
                </Grid>
            </Grid>
            
            <Score comm={communicationField} />

            <Stack spacing={2} direction="col">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Update' : 'Add'}
                />
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.goBack()} />
            </Stack>
        </>
    );
};
export default AddUpdate;
