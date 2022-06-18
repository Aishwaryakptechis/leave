import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';

import {
    taskTypeOption,
    taskStatusOption,
    taskStudentSupportOptions,
    taskStatusColorOptions,
} from '../../constants';
import { getDateFormat, getStatusColor, getValueOption } from '../../utils/common';
import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import CustomPagination from '../form/CustomPagination';


export default function TaskTable(props) {
    const { tasks, page, handlePageChange, isLoading } = props;
    const totalPage = tasks ? tasks.total_pages : 0;
    const perPage = tasks ? tasks.per_page : 0;
    const count = tasks ? tasks.count : 0;
    const hasTasks = tasks && tasks.results && !!tasks.results.length;
    const history = useHistory();


    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasTasks ? (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">No.</StyledTableCell>
                                <StyledTableCell align="center">Assigned By</StyledTableCell>
                                <StyledTableCell align="center">Assigned To</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Task Name</StyledTableCell>
                                <StyledTableCell align="center">Task Type</StyledTableCell>
                                <StyledTableCell align="center">Start Date</StyledTableCell>
                                <StyledTableCell align="center">Student support type</StyledTableCell>
                                <StyledTableCell align="center">Duration</StyledTableCell>
                                <StyledTableCell align="center">Topic of session</StyledTableCell>
                                <StyledTableCell align="center">Feedback Form</StyledTableCell>
                                <StyledTableCell align="center">Student Name</StyledTableCell>
                                <StyledTableCell align="center">Video Link</StyledTableCell>
                                <StyledTableCell align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Edit Task</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.results.map((task, index) => (
                                <StyledTableRow key={task.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {perPage * (page - 1) + (1 + index)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{task.user_id_assigned_by.name}</StyledTableCell>
                                    <StyledTableCell align="center">{task.user_id_assigned.name}</StyledTableCell>
                                    <StyledTableCell align="center" style={{ color: getStatusColor(taskStatusColorOptions, task.status) }}>
                                        {getValueOption(taskStatusOption, task.status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{task.name}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(taskTypeOption, task.type)}
                                    </StyledTableCell>    
                                    <StyledTableCell align="center">{task.start_date}</StyledTableCell>
                                    {/* <StyledTableCell align="center">{task.due_date}</StyledTableCell> */}

                                    <StyledTableCell align="center">
                                        {getValueOption(taskStudentSupportOptions, task.student_support_type)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{task.duration}</StyledTableCell>
                                    <StyledTableCell align="center">{task.session_topic}</StyledTableCell>
                                    <StyledTableCell align="center">{task.session_feedback}</StyledTableCell>
                                    <StyledTableCell align="center">{task.session_student_name}</StyledTableCell>
                                    <StyledTableCell align="center">{task.session_video_link}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getDateFormat({ date: task.created_at })}
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                        <CustomButton
                                            onClick={() =>
                                                history.push(`/task/edit/${task.id}`, {
                                                    id: task.id
                                                })
                                            }
                                            text="Edit"
                                            variant="outlined"
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
            ) : (
                <h3>NO DATA</h3>
            )}
         </>
         
    );
}
