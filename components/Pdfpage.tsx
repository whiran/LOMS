'use client'
import React, { useEffect, useState } from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer'

type Props = {}
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "AntonFamily",

  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
});

const PDF = () => {
  return(
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header}>MIS report</Text>
        <Text style={styles.text}>content</Text>
      </Page>
    </Document>
  )
}

const Pdfpage = (props: Props) => {
 const [client, setClient] = useState(false);

 useEffect(() => {
  setClient(true)
 },[])


  return (
    <PDFViewer>
      <PDF />
    </PDFViewer>
  )
}

export default Pdfpage