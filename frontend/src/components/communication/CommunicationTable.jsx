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
    const { communications, page, handlePageChange, isLoading } = props;
    const totalPage = communications ? communications.total_pages : 0;
    const perPage = communications ? communications.per_page : 0;
    const count = communications ? communications.count : 0;
    const hasCommunications = communications && communications.results && !!communications.results.length;
    const history = useHistory();

    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasCommunications ? (
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
                                <StyledTableCell align="center">Review Type</StyledTableCell>
                                <StyledTableCell align="center">Score</StyledTableCell>
                                <StyledTableCell align="center"> Comment </StyledTableCell>
                                <StyledTableCell align="center"> Critical Score (%) </StyledTableCell>
                                <StyledTableCell align="center"> General Score (%) </StyledTableCell>
                                <StyledTableCell align="center"> Error Total </StyledTableCell>
                                <StyledTableCell align="center"> Overall Comment </StyledTableCell>
                                <StyledTableCell align="center"> Score</StyledTableCell>




                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {communications.results.map((communication, index) => (
                                <StyledTableRow key={communication.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {perPage * (page - 1) + (1 + index)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{communication.user_id.name}</StyledTableCell>
                                    
                                    
                                    <StyledTableCell align="center">{communication.communication_number}</StyledTableCell>
                                    <StyledTableCell align="center">{communication.cohort}</StyledTableCell>
                                    <StyledTableCell align="center">{communication.project_start_date}</StyledTableCell>
                                    <StyledTableCell align="center">{communication.project_due_date}</StyledTableCell>
                                    <StyledTableCell align="center">{communication.project_name}</StyledTableCell>
                                    <StyledTableCell align="center">{communication.project_github_link}</StyledTableCell>
                                    <StyledTableCell align="center">{communication.project_student_name}</StyledTableCell>
                                    <StyledTableCell align="center">{communication.note}</StyledTableCell>

                                    <StyledTableCell align="center">
                                        {getDateFormat({ date: communication.created_at })}
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                        <CustomButton
                                            onClick={() =>
                                                history.push(`/communication/edit/${communication.id}`, {
                                                    id: communication.id
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
