import React from 'react'
import {Document} from '@react-pdf/renderer'

type Props = {}

const page = (props: Props) => {
  // Your React component or page
const generatePDF = async () => {
  try {
    const response = await fetch('/api/generate-pdf');
    const blob = await response.blob();

    const pdfUrl = URL.createObjectURL(blob);

    // Use the pdfUrl to set the source of an iframe
    const iframe = document.createElement('iframe');
    iframe.src = pdfUrl;
    iframe.style.width = '100%';
    iframe.style.height = '500px'; // Adjust the height as needed

    // Append the iframe to the DOM
    document.body.appendChild(iframe);
  } catch (error) {
    console.error('Error fetching or displaying PDF:', error);
  }
};

// Call the function when needed
generatePDF();

  return (
    <div>
      
    </div>
  )
}

export default page