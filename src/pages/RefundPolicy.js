import React from 'react';
import { Typography, Container, Paper, List, ListItem } from '@mui/material';
import LayoutPage from './LayoutPage';
const RefundPolicy = () => {
  return (
    <LayoutPage>
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Refund Policy
        </Typography>

        <Typography variant="h6">Refundable Tickets:</Typography>
        <List>
          <ListItem>These tickets typically allow you to get a full refund if you cancel your reservation, usually with no penalty or a minimal fee.</ListItem>
          <ListItem>Some airlines might also offer refundable tickets with certain restrictions, such as a deadline for cancellations or partial refunds.</ListItem>
        </List>

        <Typography variant="h6">Non-Refundable Tickets:</Typography>
        <List>
          <ListItem>These tickets are usually cheaper but come with more restrictions.</ListItem>
          <ListItem>If you cancel a non-refundable ticket, you may not get any money back, or you might receive a partial credit for future travel, minus a cancellation fee.</ListItem>
        </List>

        <Typography variant="h6">Our General Policies:</Typography>
        <Typography paragraph>1. 24-Hour Rule:</Typography>
        <List>
          <ListItem>Many airlines offer a full refund within 24 hours of booking, as long as the reservation was made at least seven days before the flight's departure.</ListItem>
        </List>

        <Typography paragraph>2. Change Fees:</Typography>
        <List>
          <ListItem>Even if a ticket is non-refundable, you might be able to make changes to your flight for a fee.</ListItem>
          <ListItem>This fee can vary widely between airlines and depends on factors like the type of ticket, destination, and how far in advance you make the change.</ListItem>
        </List>

        <Typography paragraph>3. Travel Insurance:</Typography>
        <List>
          <ListItem>Purchasing travel insurance can provide coverage for trip cancellations, interruptions, or delays due to various reasons, including illness, natural disasters, or other unforeseen events.</ListItem>
          <ListItem>Check the terms of the insurance policy for details on what is covered and the process for making a claim.</ListItem>
        </List>

        <Typography paragraph>4. Canceling vs. Changing:</Typography>
        <List>
          <ListItem>In some cases, canceling a non-refundable ticket might result in a credit for future travel rather than a refund.</ListItem>
          <ListItem>Changing the date or time of your flight might incur fees but could be more cost-effective than canceling altogether.</ListItem>
        </List>

        <Typography paragraph>5. Refund Processing Time:</Typography>
        <List>
          <ListItem>If you are eligible for a refund, the processing time can vary.</ListItem>
          <ListItem>Some airlines might issue refunds within a few days, while others could take several weeks.</ListItem>
        </List>

        <Typography variant="h6">Things to Remember:</Typography>
        <List>
          <ListItem>Always read the terms and conditions of your ticket before purchasing.</ListItem>
          <ListItem>Keep track of any deadlines for cancellations or changes.</ListItem>
          <ListItem>If you think your plans might change, consider purchasing a more flexible ticket or travel insurance.</ListItem>
          <ListItem>Document all communications with the airline or booking agency regarding your ticket.</ListItem>
        </List>
      </Paper>
    </Container>
    </LayoutPage>
  );
};

export default RefundPolicy;
