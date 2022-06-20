import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';
import { } from '../../constants';
import { getDateFormat, getStatusColor, getValueOption } from '../../utils/common';
import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import CustomPagination from '../form/CustomPagination';

export default function CommunicationTable(props) {
    const { communication, page, handlePageChange, isLoading } = props;
    const totalPage = communication ? communication.total_pages : 0;
    const perPage = communication ? communication.per_page : 0;
    const count = communication ? communication.count : 0;
    const hasCommunication = communication && communication.results && !!communication.results.length;
    const history = useHistory();
    console.log('communication',communication);
    console.log('props',props);
    console.log('history',history);
    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasCommunication ? (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">No.</StyledTableCell>
                                <StyledTableCell align="center">Engineer Name</StyledTableCell>
                                <StyledTableCell align="center">Student Name</StyledTableCell>
                                <StyledTableCell align="center">Task Type</StyledTableCell>
                                <StyledTableCell align="center">Task Name</StyledTableCell>
                                <StyledTableCell align="center">Duration</StyledTableCell>
                                <StyledTableCell align="center">Video Link</StyledTableCell>
                                <StyledTableCell align="center">Reviewed By</StyledTableCell>
                                <StyledTableCell align="center">Reviewed Date</StyledTableCell>
                                <StyledTableCell align="center"> Critical Score (%) </StyledTableCell>
                                <StyledTableCell align="center"> General Score (%) </StyledTableCell>
                                <StyledTableCell align="center"> Error Total </StyledTableCell>
                                <StyledTableCell align="center"> Edit</StyledTableCell>




                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {communication.results.map((task, index) => {
                                console.log('communication', communication);
                            return(
                                <StyledTableRow key={task.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {perPage * (page - 1) + (1 + index)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{task.task.user_id_assigned}</StyledTableCell>
                                    <StyledTableCell align="center">{task.task.session_student_name}</StyledTableCell>
                                    <StyledTableCell align="center">{task.task.type}</StyledTableCell>
                                    <StyledTableCell align="center">{task.task.student_support_type}</StyledTableCell>
                                    <StyledTableCell align="center">{task.task.duration}</StyledTableCell>
                                    <StyledTableCell align="center">{task.task.session_video_link}</StyledTableCell>
                                    <StyledTableCell align="center">{task.reviewed_by}</StyledTableCell>
                                    <StyledTableCell align="center">{task.date_reviewed}</StyledTableCell>
                                    <StyledTableCell align="center">{task.critical_total}</StyledTableCell>
                                    <StyledTableCell align="center">{task.general_total}</StyledTableCell>
                                    <StyledTableCell align="center">{task.error_total}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <CustomButton
                                            onClick={() =>
                                                history.push(`/communication/edit/${task.id}`, {
                                                    id: task.id
                                                })
                                            }
                                            text="Edit"
                                            variant="outlined"
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            )})}
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
            ) : (
                <h3>NO DATA</h3>
            )}
        </>
    );
}
