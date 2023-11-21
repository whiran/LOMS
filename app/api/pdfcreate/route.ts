
import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';

const generatePDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const doc = new PDFDocument();
  doc.text('Hello, this is a PDF generated with Next.js and PDFKit!');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="example.pdf"');

  doc.pipe(res);
  doc.end();
};

export default generatePDF;
