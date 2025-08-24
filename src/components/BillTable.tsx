import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Tooltip,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import BillModal from './BillModal';
import { Bill } from '../services/api';
import { useBills } from '../hooks/useBills';

type BillTableProps = {
  showFavourites: boolean;
  favourites: Bill[];
  setFavourites: React.Dispatch<React.SetStateAction<Bill[]>>;
};

const BillTable: React.FC<BillTableProps> = ({ showFavourites, favourites, setFavourites }) => {
  // Custom hook to fetch bills and metadata
  const { bills, loading, error, billTypes } = useBills();
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState<string>('');

  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Add or remove bill from favourites
  const handleFavourite = (bill: Bill) => {
    const exists = favourites.find((f) => f.billNo === bill.billNo);
    if (exists) {
      setFavourites(favourites.filter((f) => f.billNo !== bill.billNo));
      console.info(`Dispatch: Un-favourited bill ${bill.billNo}`);
    } else {
      setFavourites([...favourites, bill]);
      console.info(`Dispatch: Favourited bill ${bill.billNo}`);
    }
  };

  // Open modal when user clicks a row
  const handleRowClick = (bill: Bill) => {
    setSelectedBill(bill);
    setOpen(true);
  };

  const filteredBills = bills.filter((b) => (filter ? b.billType === filter : true));
  const displayBills = showFavourites ? favourites : filteredBills;

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <p>{error}</p>
      </Box>
    );
  }

  return (
    <Paper>
      {!showFavourites && (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2 }}>
          <Select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0);
            }}
            displayEmpty
            size="small"
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="">All Types</MenuItem>
            {billTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Bill Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sponsor</TableCell>
              <TableCell>Favourite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayBills
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bill) => (
                <TableRow
                  key={bill.billNo}
                  hover
                  onClick={() => handleRowClick(bill)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{bill.billNo}</TableCell>
                  <TableCell>{bill.billType}</TableCell>
                  <TableCell>{bill.status}</TableCell>
                  <TableCell>{bill.sponsor}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        favourites.find((f) => f.billNo === bill.billNo)
                          ? 'Unfavourite'
                          : 'Favourite'
                      }
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavourite(bill);
                        }}
                        size="small"
                      >
                        {favourites.find((f) => f.billNo === bill.billNo) ? (
                          <StarIcon color="warning" />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

            {displayBills.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={displayBills.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {selectedBill && <BillModal open={open} onClose={() => setOpen(false)} bill={selectedBill} />}
    </Paper>
  );
};
export default BillTable;
