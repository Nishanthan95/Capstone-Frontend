// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ReportDashboard() {
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         let token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found, redirecting to login.');
//           return;
//         }

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.get('http://localhost:5000/api/reports', config);
//         setReport(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching report:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [navigate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Inventory Report</h1>
//       {report && (
//         <div>
//           <h2>Total Products: {report.totalProducts}</h2>
//           <h2>Total Inventory Value: ${report.totalValue.toFixed(2)}</h2>

//           <h3>Stock Details:</h3>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 <th style={{ border: '1px solid black', padding: '8px' }}>Product Name</th>
//                 <th style={{ border: '1px solid black', padding: '8px' }}>Quantity</th>
//                 <th style={{ border: '1px solid black', padding: '8px' }}>Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.stockDetails.map((product, index) => (
//                 <tr key={index}>
//                   <td style={{ border: '1px solid black', padding: '8px' }}>{product.name}</td>
//                   <td style={{ border: '1px solid black', padding: '8px' }}>{product.quantity}</td>
//                   <td style={{ border: '1px solid black', padding: '8px' }}>${product.value.toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReportDashboard;
