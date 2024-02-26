import React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import LayoutPage from './LayoutPage';

const TermsConditions = () => {
  return (
    <LayoutPage>
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms and Conditions
        </Typography>
        
        <Typography paragraph>
          Welcome to The City Flyers. Please read these Terms and Conditions carefully before using our services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By using the services of The City Flyers, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these Terms, please do not use our services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Booking and Payment
        </Typography>
        <Typography paragraph>
          All bookings are subject to availability. Prices quoted are in BDT and are subject to change without notice. Full payment is required at the time of booking unless otherwise stated. Payment methods accepted include Bank Transfer, bKash, Nagad, & Rocket. Additional charges such as taxes, fees, and surcharges may apply.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Ticket Changes and Cancellations
        </Typography>
        <Typography paragraph>
          Changes to bookings are subject to availability and may incur additional fees. Cancellation policies vary depending on the airline and fare type. Please refer to the specific terms of your booking. Refunds, if applicable, will be processed according to the airline's policy.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Travel Documents and Requirements
        </Typography>
        <Typography paragraph>
          It is the passenger's responsibility to ensure they have the necessary travel documents, including a valid passport, visas, and any required vaccinations. The City Flyers is not liable for any consequences resulting from incomplete or incorrect travel documentation.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Baggage Allowance
        </Typography>
        <Typography paragraph>
          Baggage allowance varies by airline and fare type. Please check with the airline for specific details. Excess baggage fees are the responsibility of the passenger.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Flight Delays and Cancellations
        </Typography>
        <Typography paragraph>
          The City Flyers is not liable for flight delays, cancellations, or schedule changes. In the event of a flight disruption, passengers should contact the airline directly for assistance.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Travel Insurance
        </Typography>
        <Typography paragraph>
          We highly recommend purchasing travel insurance to protect against unforeseen circumstances such as trip cancellations, medical emergencies, and lost luggage. The City Flyers can assist with arranging travel insurance upon request.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Limitation of Liability
        </Typography>
        <Typography paragraph>
          The City Flyers is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the cost of the booking.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Changes to Terms and Conditions
        </Typography>
        <Typography paragraph>
          The City Flyers reserves the right to update or modify these Terms and Conditions at any time without prior notice. Users will be notified of any changes, and continued use of our services constitutes acceptance of the modified Terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          10. Governing Law
        </Typography>
        <Typography paragraph>
          These Terms and Conditions are governed by the laws of Bangladesh, without regard to its conflict of law principles.
        </Typography>

        <Typography paragraph>
          By using the services of The City Flyers, you acknowledge that you have read, understood, and agree to these Terms and Conditions. If you have any questions or concerns, please contact us.
        </Typography>
        
        <Typography paragraph>
          Email: thecityflyers@gmail.com
        </Typography>
        <Typography paragraph>
          Phone: +8801312596124, +8801730596121-3
        </Typography>
      </Paper>
    </Container>
    </LayoutPage>
  );
};

export default TermsConditions;
