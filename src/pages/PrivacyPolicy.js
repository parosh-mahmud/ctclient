import React from 'react';
import { Typography, Container, Paper, List, ListItem } from '@mui/material';
import LayoutPage from './LayoutPage';

const PrivacyPolicy = () => {
  return (
    <LayoutPage>
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography paragraph>
          It's essential for users to read and understand privacy policies before providing any personal information or using services. This empowers individuals to make informed decisions about how their data is shared and used. Our website may automatically collect certain information about your device for various purposes, such as understanding how users interact with our site and improving the user experience.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Types of Information We May Collect
        </Typography>
        <List>
          <ListItem>Web Browser: Information about the web browser you are using to access the site.</ListItem>
          <ListItem>IP Address: The unique numerical label assigned to your device when connected to the internet.</ListItem>
          <ListItem>Time Zone: The geographical time zone in which your device is located.</ListItem>
          <ListItem>Cookies: Small pieces of data stored on your device that help the website remember your preferences, track your activities, and provide personalized experiences.</ListItem>
        </List>
<Typography variant="h6" gutterBottom>
          Purpose of Collecting Users' Data
        </Typography>

        <Typography paragraph>1. Providing Services:</Typography>
        <List>
          <ListItem>Customization: Personalizing the user experience based on preferences, history, or settings.</ListItem>
          <ListItem>Account Management: Managing user accounts, profiles, and preferences.</ListItem>
          <ListItem>Transactional Purposes: Processing orders, payments, and transactions.</ListItem>
        </List>

        <Typography paragraph>2. Improving User Experience:</Typography>
        <List>
          <ListItem>Analytics: Understanding how users interact with our website or app to improve its design, content, and functionality.</ListItem>
          <ListItem>Research and Development: Using data to develop new features, products, or services.</ListItem>
          <ListItem>Testing: Conducting A/B testing or user testing for enhancements.</ListItem>
        </List>

        <Typography paragraph>3. Communication:</Typography>
        <List>
          <ListItem>Customer Support: Providing assistance, troubleshooting, and resolving issues.</ListItem>
          <ListItem>Notifications: Sending updates, alerts, or notifications related to services or accounts.</ListItem>
          <ListItem>Marketing: Sending promotional materials, newsletters, or offers based on user preferences.</ListItem>
        </List>

        <Typography paragraph>4. Security and Fraud Prevention:</Typography>
        <List>
          <ListItem>Protecting Data: Safeguarding user information from unauthorized access, theft, or misuse.</ListItem>
          <ListItem>Authentication: Verifying user identity for account access and security.</ListItem>
          <ListItem>Fraud Detection: Detecting and preventing fraudulent activities or unauthorized transactions.</ListItem>
        </List>

        <Typography paragraph>5. Legal and Compliance:</Typography>
        <List>
          <ListItem>Compliance with Laws: Adhering to legal requirements and regulations related to data collection, processing, and retention.</ListItem>
          <ListItem>Contractual Obligations: Fulfilling contractual obligations with users, partners, or service providers.</ListItem>
          <ListItem>Risk Management: Assessing and managing risks related to data security and privacy.</ListItem>
        </List>

        <Typography paragraph>6. Marketing and Advertising:</Typography>
        <List>
          <ListItem>Targeted Advertising: Displaying ads based on user interests, behaviors, or demographics.</ListItem>
          <ListItem>Remarketing: Showing relevant ads to users who have visited the site or app previously.</ListItem>
          <ListItem>Analysis: Analyzing user trends and preferences to create effective marketing strategies.</ListItem>
        </List>

        <Typography paragraph>7. Personalization:</Typography>
        <List>
          <ListItem>Content Recommendations: Offering personalized content, products, or services based on user behavior.</ListItem>
          <ListItem>User Preferences: Remembering user preferences, such as language, location, or settings.</ListItem>
        </List>

        <Typography paragraph>8. Aggregate Data Analysis:</Typography>
        <List>
          <ListItem>Trends and Patterns: Using aggregated data for market research, trend analysis, or business planning.</ListItem>
          <ListItem>Reporting: Generating reports or insights for business decisions and strategies.</ListItem>
        </List>
        <Typography paragraph>
          Providing Services, Improving User Experience, Communication, Security and Fraud Prevention, Legal and Compliance, Marketing and Advertising, Personalization, and Aggregate Data Analysis are various purposes for collecting user data. Each category is defined by specific goals such as customization, account management, analytics, research and development, protecting data, compliance with laws, targeted advertising, content recommendations, and more.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Importance of Transparency
        </Typography>
        <Typography paragraph>
          Informed Consent, Trust and Reputation, and Legal Compliance are pillars of our approach to handling user data. We ensure users are informed about how their data will be used and provide options to consent or opt-out. Our transparent data practices are designed to build trust with users and ensure compliance with data protection laws and regulations.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Terminology: "Device Information"
        </Typography>
        <Typography paragraph>
          The term "Device Information" refers to data collected automatically about your device, browsing behavior, and interactions with the site. This includes improving user experiences through understanding user preferences and behaviors, as well as tailoring marketing strategies and performing analytics.
        </Typography>
         <Typography variant="h6" gutterBottom>
          Purpose of Collecting Device Information:
        </Typography>
        <Typography paragraph>
	Improving User Experience: This information helps the website understand user preferences and behaviors, allowing for enhancements to the site's design, content, and functionality.
	Marketing and Analytics: It also enables the website to tailor marketing strategies, personalize content, and perform analytics to measure site performance and effectiveness.
        </Typography>


        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          If you have specific concerns or questions about our privacy practices, you may contact us at +8801312596124 or +8801730596121-3. Alternatively, you can email us at thecityflyers@gmail.com.
        </Typography>
      </Paper>
    </Container>
    </LayoutPage>
  );
};

export default PrivacyPolicy;
