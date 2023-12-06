'use client'

import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink, Note } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  part: {
    margin: 5,
    padding: 5,
    color: "rgb(23,123,34)"
  }
});


type Props = {}

const Pdfv = (props: Props) => {
  
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true)
  },[])


  return (
    <PDFViewer className='w-full h-screen'>
      <Document title='fdfdf'>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          <Text>second</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
  )
}

export default Pdfv