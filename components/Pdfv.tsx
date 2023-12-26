'use client'

import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink, Note } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
    borderWidth: 1,
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
  },
  heading: {
    
    borderBottom: 1,
    marginBottom: 8
  },
  content: {
    marginLeft: '10%',
    marginTop: '5%',
    fontSize: 10,
    
  },
  end: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: '10%'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
});


type Props = {
  id: string;
  result:{
    id: string;
    coo: string;
    fiber: string;
    component: string;
    caretext: string;
    washsimbol: string;
    sizeration: string;
    state: string;
    userid: string | null;
    createdAt: Date;
    updatedAt: Date;
    ordervalue: number | null;
    } | null
}

const Pdfv = (props: Props) => {
  
  const [client, setClient] = useState(false);
  const d = new Date();

  useEffect(() => {
    setClient(true)
  },[])


  return (
    (props.result == null) ? (
        <div className='flex justify-center items-center'>No Records</div>
    ) : (
      <PDFViewer className='w-full h-screen'>
          <Document title={props.id}>
          <Page size="A4" style={styles.page} >
            <View style={styles.section}>
              <Text style={styles.heading}>Order Details</Text>
              <Text style={styles.content}>ID: {props.result.id}</Text>
              <Text style={styles.content}>Created Date: {props.result.createdAt.toUTCString()}</Text>
              <Text style={styles.content}>Created User: {props.result.userid}</Text>
              <Text style={styles.content}>COO: {props.result.coo}</Text>
              <Text style={styles.content}>Fiber: {props.result.fiber}</Text>
              <Text style={styles.content}>CareText:  {props.result.caretext}</Text>
              <Text style={styles.content}>Washsimbole: {props.result.washsimbol}</Text>
              <Text style={styles.content}>Size: {props.result.sizeration}</Text>
              <Text style={styles.content}>State: {props.result.state}</Text>
              
            </View>
            <View style={styles.footer}>
            <Text style={styles.end}>{`System generated on:${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`}</Text>
            </View>
          </Page>
          </Document>
        </PDFViewer>
    )
  )
}

export default Pdfv