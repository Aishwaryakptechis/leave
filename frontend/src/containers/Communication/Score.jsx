import { Grid, Stack } from '@mui/material';
import React from 'react';
import CustomSelect from '../../components/form/CustomSelect';
import CustomTextField from '../../components/form/CustomTextField';
import { scoreOption } from '../../constants';
import { useState, useEffect } from 'react';
import communication_fieldRequest from '../../requests/communication_field-request';
import { id } from 'date-fns/locale';

function Score(props) {
    const [errors, setErrors] = useState([]);
    const [communicationFields, setCommunicationFields] = useState([]);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(!!id);
    const [communicationScore, setCommunicationScore] = useState({
        score: '',
        comment: ''
    });
    const handleOnChanges = e => {
        const { name, value } = e.target;
        setCommunicationScore(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getCommunicationFields = async () => {
        communication_fieldRequest.index().then(res => {
            setCommunicationFields(res);
        });
    };

    useEffect(() => {
        getCommunicationFields();
    }, []);

    

    return (
        <>
            {communicationFields.map(fields => {
                return (
                    <>
                        <Grid container spacing={2} marginTop={2}>
                            <Grid item xs={4}>
                                {fields[0].communication_type}
                            </Grid>
                        </Grid>

                        {fields.map(field => {
                            return (
                                <Grid container spacing={2} marginTop={2} marginLeft={2}>
                                    <Grid item xs={5}>
                                        <CustomTextField
                                            label="Field"
                                            name="field"
                                            value={field.attribute_of_communication}
                                            key={field.id}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            // disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomSelect
                                            label="Score"
                                            name="score"
                                            selectedValue={communicationScore.score[id]}
                                            key={communicationScore.id}
                                            onChange={handleOnChanges}
                                            options={scoreOption}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomTextField
                                            label="Comment"
                                            name="comment"
                                            errors={!!errors.comment}
                                            key={communicationScore}
                                            helperText={errors.comment}
                                            value={communicationScore.comment[id]}
                                            onChange={handleOnChanges}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </>
                );
            })}
          
        </>
    );
}

export default Score;
