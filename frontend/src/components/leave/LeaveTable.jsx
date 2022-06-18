import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';
import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import { leaveStatusOptions, leaveStatusColorOptions, leaveStatusPermission } from '../../constants';
import { getDateFormat, getStatusColor, getValueOption } from '../../utils/common';
import CustomPagination from '../form/CustomPagination';
import CustomSelect from '../form/CustomSelect';
import { getUser } from '../../reducks/users/selectors';
import { useSelector } from 'react-redux';
import leaveRequest from '../../requests/leave-request';

export default function LeaveTable(props) {
    const { leaves, page, handlePageChange, isLoading, onChangeHandler } = props;
    const totalPage = leaves ? leaves.total_pages : 0;
    const perPage = leaves ? leaves.per_page : 0;
    const count = leaves ? leaves.count : 0;
    const hasLeaves = leaves && leaves.results && !!leaves.results.length;
    console.log('props', props);
    const selector = useSelector(state => state);
    const curUser = getUser(selector);
    const history = useHistory();

    const statusRoles = () => {
        const roles = leaveStatusPermission[curUser.role];        
        return roles
    }
    
    const onStatusChange = () => {
        let putStatus = {
        "status": this.value
        }
        leaveRequest
                .update(leaves.id, {                  
                })
                .then(() => history.push('/'))
    }


    console.log('leave status option test', leaveStatusPermission[curUser.role]);
    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">No</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Applied on</StyledTableCell>
                                <StyledTableCell align="center">Subject</StyledTableCell>
                                <StyledTableCell align="center">No of Days</StyledTableCell>
                                <StyledTableCell align="center">Leave From</StyledTableCell>
                                <StyledTableCell align="center">Leave to</StyledTableCell>
                                <StyledTableCell align="center">No of Leaves left</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>

                                <StyledTableCell align="center">Permission</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leaves.results.map((leave, index) => (
                                <StyledTableRow key={leave.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {perPage * (page - 1) + (1 + index)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{leave.user.name}</StyledTableCell>
                                    {console.log('leave.user.name', leave.user.name)}
                                    <StyledTableCell
                                        align="center"
                                        style={{ color: getStatusColor(leaveStatusColorOptions, leave.status) }}
                                    >
                                        {getValueOption(leaveStatusOptions, leave.status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getDateFormat({ date: leave.created_at })}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{leave.subject}</StyledTableCell>
                                    <StyledTableCell align="center">5</StyledTableCell>
                                    <StyledTableCell align="center">{leave.from_date}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.to_date}</StyledTableCell>
                                    <StyledTableCell align="center">1</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <CustomButton
                                            onClick={() =>
                                                history.push(`/leave/edit/${leave.id}`, {
                                                    id: leave.id
                                                })
                                            }
                                            text="Edit"
                                            variant="outlined"
                                        ></CustomButton>
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                        <CustomSelect
                                            name="status"
                                            selectedValue={leave.status}
                                            options={statusRoles()}
                                            onChange={onStatusChange}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CustomPagination
                        page={page}
                        handlePageChange={handlePageChange}
                        totalPage={totalPage}
                        count={count}
                        perPage={perPage}
                    />
                </TableContainer>
            )}
        </>
    );
}
