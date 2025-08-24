import React from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography } from '@mui/material';
import { Bill } from '../services/api';

// Props for the BillModal component
type BillModalProps = {
  open: boolean;
  onClose: () => void;
  bill: Bill;
};

// Modal that shows bill details in English and Irish
const BillModal: React.FC<BillModalProps> = ({ open, onClose, bill }) => {
  const [tab, setTab] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
  // Material UI Dialog wrapper
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Details of the Bills</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="language tabs">
            <Tab label="English" />
            <Tab label="Gaeilge" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2 }}>
          {tab === 0 && (
            <>
              <Typography variant="h6">{bill.titleEn}</Typography>
              <Typography>
                <b>Broj:</b> {bill.billNo}
              </Typography>
              <Typography>
                <b>Tip:</b> {bill.billType}
              </Typography>
              <Typography>
                <b>Status:</b> {bill.status}
              </Typography>
              <Typography>
                <b>Sponzor:</b> {bill.sponsor}
              </Typography>
            </>
          )}
          {tab === 1 && (
            <>
              <Typography variant="h6">{bill.titleGa}</Typography>
              <Typography>
                <b>Uimhir:</b> {bill.billNo}
              </Typography>
              <Typography>
                <b>Cineál:</b> {bill.billType}
              </Typography>
              <Typography>
                <b>Stádas:</b> {bill.status}
              </Typography>
              <Typography>
                <b>Urraitheoir:</b> {bill.sponsor}
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default BillModal;
