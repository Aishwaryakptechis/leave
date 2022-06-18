import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LeaveFilter from '../../components/leave/LeaveFilter';
import LeaveTable from '../../components/leave/LeaveTable';
import { FormContext } from '../../contexts/FormContext';
import CustomButton from '../../components/form/CustomButton';
import { useQuery } from '../../hooks/useQuery';
import querystring from 'query-string';
import { useHistory } from 'react-router';
import LeaveRequest from '../../requests/leave-request';

const List = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const searchQuery = useQuery();
    const [leaves, setLeaves] = useState(null);
    const [queries, setQueries] = useState({
        status: searchQuery.get('status') || ''
    });
    const [queryDateRange, setQueryDateRange] = useState({
        from_date: searchQuery.get('from_date') || null,
        to_date: searchQuery.get('to_date') || null
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const onChangeDateRange = (from_date, to_date) => {
        setQueryDateRange({
            ...queryDateRange,
            from_date,
            to_date
        });
    };
    const submitSearch = () => {
        setIsLoading(true);
        setPage(1);
        const queriesObject = handleQueryString({ page: 1 });
        LeaveRequest.index({
            ...queriesObject,
            user: querySelect.user.key
        });
    };

    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        LeaveRequest.index({ page }).then(response => {
            setLeaves(response);
            setIsLoading(false);
        });
        setQueries({
            status: '',
            name: ''
        });
        setQuerySelect({ user_id_assigned_by: { value: '', key: '' }, user_id_assigned: { value: '', key: '' } });
        setQueryDateRange({ start_date: null, due_date: null });
        history.replace('/leave');
    };

    const [querySelect, setQuerySelect] = useState({
        user: JSON.parse(searchQuery.get('leave')) || { value: '', keys: '' },
        user: JSON.parse(searchQuery.get('leave')) || { value: '', keys: '' }
    });

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,
            ...queryDateRange,
            page
        };
        history.replace({
            pathname: 'leave',
            search: querystring.stringify(
                {
                    ...queriesObject,
                    user: querySelect.leave.key ? JSON.stringify(querySelect.leave) : '',
                    user: querySelect.leave.key ? JSON.stringify(querySelect.leave) : ''
                },
                { skipEmptyString: true, skipNull: true }
            )
        });

        return queriesObject;
    };
    const handlePageChange = (e, value) => {
        handleQueryString({ page: value });
        setPage(value);
    };

    const onChangeHandler = e => {
        const { value, name } = e.target;

        setQueries({
            ...queries,
            [name]: value
        });
    };

    const onChangeSearchSelect = (value, name) => {
        setQuerySelect({
            ...querySelect,
            [name]: value
        });
    };

    useEffect(() => {
        let isSubscribed = true;
        LeaveRequest.index({
            ...queries,
            ...queryDateRange,
            user: querySelect.user.key,
            user: querySelect.user.key,
            page
        }).then(response => {
            if (isSubscribed) {
                setLeaves(response);
                setIsLoading(false);
            }
        });
        return () => (isSubscribed = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <>
            <FormContext.Provider
                value={{
                    clearSearch,
                    isLoading,
                    onChangeDateRange,
                    onChangeHandler,
                    onChangeSearchSelect,
                    queries,
                    queryDateRange,
                    querySelect,
                    submitSearch
                }}
            >
                <LeaveFilter />
            </FormContext.Provider>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" mt={3}>
                <CustomButton
                    text="Apply for Leave"
                    variant="contained"
                    onClick={() => history.push('/leave/create')}
                />
            </Grid>
            <LeaveTable
                isLoading={isLoading}
                leaves={leaves}
                page={page}
                handlePageChange={handlePageChange}
            />
        </>
    );
};
export default List;
