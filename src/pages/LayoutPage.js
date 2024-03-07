import React from 'react';
import DashBoardHeader from '../components/Header/MainHeader';
import Footer from '../components/footer/Footer'; // Ensure the path is correct

const LayoutPage = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '90vh', // Sets minimum height to full viewport height
      justifyContent: 'space-between', // Spaces out the header, content, and footer
    }}>
      <DashBoardHeader />
      <main style={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
