'use server'
import * as fs from 'fs';
import * as sax from 'sax';
import { createlabel } from './createlabel';
import prisma from '@/lib/prisma';


export const newstream = async (fielname: string)=>{

  interface Label {
    date: string;
    time: string;
    'record-count': string;
    'run-number': string;
    stroke: Stroke[];
    
  }

  let label: Label = {
    date: '',
    time: '',
    'record-count': '',
    "run-number": '',
    stroke: []
  }

  interface Stroke {
    'date-last-modified': string;
    'stroke-number': string;
    'stroke-description': string;
    'contract-number': string;
    'contract-status': string;
    'department-number': string;
    season: string;
    'supplier-series': string;
    'country-code': string;
    'Factory-code': string;
    productdesc: string;
    'stroke-label': StrokeLabel[];
    colour: Colour[];
  }

  let stroke: Stroke = {
    'date-last-modified': '',
    'stroke-number': '',
    'stroke-description': '',
    'contract-number': '',
    'contract-status': '',
    'department-number': '',
    season: '',
    'supplier-series': '',
    'country-code': '',
    'Factory-code': '',
    productdesc: '',
    'stroke-label': [],
    colour: []
  }

  interface StrokeLabel {
    'label-ref': string;
    'label-category': string;
    'label-type': string;
    'label-order': string;
    'set-name': string;
  }

  let strokelabel: StrokeLabel = {
    'label-ref': '',
    'label-category': '',
    'label-type': '',
    'label-order': '',
    'set-name': ''
  }

  interface Colour {
    'colour-name': string;
    'colour-description': string;
    'story-description': string;
    size: Size[];
  }

  let colour: Colour = {
    'colour-name': '',
    'colour-description': '',
    'story-description': '',
    size: []
  }

  interface Size {
    'primary-size': string;
    upc: Upc[];
  }

  let size: Size = {
    'primary-size': '',
    upc:[]
  }

  interface Upc {
    'upc-number': string;
    'secondary-size': string;
    'selling-price': string;
  }

  let upc: Upc = {
    'upc-number': '',
    'secondary-size': '',
    'selling-price': ''
  }

  //streaming starts here
  let currentElement: string | null = null;
  let closeElement: string | null = null;
  let textcontent: string | null = null;
  let count: number = 0;
  let strokecount: number = 0;

  const xmlFilePath = `./public/${fielname}`;

  // Create a new SAX parser
  const parser = sax.createStream(true);

  // Register event handlers
  parser.on('error', (err) => {
    console.error(`Error parsing XML: ${err.message}`);
  });

  parser.on('opentag', (node) => {
    currentElement = node.name;
  
    switch(node.name){
      case 'label-information':
        label.date = node.attributes.date as string;
        label.time = node.attributes.time as string;
        label['record-count'] = node.attributes['record-count'] as string;
        label['run-number'] = node.attributes['run-number'] as string;
        break;
      case 'stroke':
        stroke['date-last-modified'] = node.attributes['date-last-modified'] as string;
        break;
      default:
        break;
    }
    if(currentElement == 'stroke'){
      strokecount++;
    }
    count = count + 1;
  });

  parser.on('closetag', (tagName) => {
    switch(tagName){
      case 'stroke-label':
        stroke['stroke-label'].push(strokelabel);
        strokelabel = {
          'label-ref': '',
          'label-category': '',
          'label-type': '',
          'label-order': '',
          'set-name': ''
        }; 
        break;
      case 'colour':
        stroke['colour'].push(colour);
        colour = {
          'colour-name': '',
          'colour-description': '',
          'story-description': '',
          size: []
        }
        break;
      case 'size':
        colour['size'].push(size);
        size = {
          'primary-size': '',
          upc:[]
        }
        break;
      case 'upc':
        size['upc'].push(upc);
        upc = {
          'upc-number': '',
          'secondary-size': '',
          'selling-price': ''
        }
        break;
      case 'stroke':
        label.stroke.push(stroke);
        stroke = {
          'date-last-modified': '',
          'stroke-number': '',
          'stroke-description': '',
          'contract-number': '',
          'contract-status': '',
          'department-number': '',
          season: '',
          'supplier-series': '',
          'country-code': '',
          'Factory-code': '',
          productdesc: '',
          'stroke-label': [],
          colour: []
        }
        break;
      default:
        break;
    }
    
  });

  parser.on('text', (text) => {
    if(text){
    switch(currentElement){
      case 'stroke-number':
        stroke['stroke-number'] = text.trim(); 
        break;
      case 'stroke-description':
        stroke['stroke-description'] = text.trim(); 
        break;
      case 'contract-number':
        stroke['contract-number'] = text.trim(); 
        break;
      case 'contract-status':
        stroke['contract-status'] = text.trim(); 
        break;
      case 'department-number':
        stroke['department-number'] = text.trim(); 
        break;
      case 'season':
        stroke.season = text.trim(); 
        break;
      case 'supplier-series':
        stroke['supplier-series'] = text.trim(); 
        break;
      case 'country-code':
        stroke['country-code'] = text.trim(); 
        break;
      case 'Factory-code':
        stroke['Factory-code'] = text.trim(); 
        break;
      case 'productdesc':
        stroke['productdesc'] = text.trim(); 
        break;
      case 'label-ref':
        strokelabel['label-ref'] = text.trim(); 
        break;
      case 'label-category':
        strokelabel['label-category'] = text.trim(); 
        break;
      case 'label-type':
        strokelabel['label-type'] = text.trim(); 
        break;
      case 'label-order':
        strokelabel['label-order'] = text.trim(); 
        break;
      case 'set-name':
        strokelabel['set-name'] = text.trim(); 
        break;
      case 'colour-name':
        colour['colour-name'] = text.trim(); 
        break;
      case 'colour-description':
        colour['colour-description'] = text.trim(); 
        break;
      case 'story-description':
        colour['story-description'] = text.trim(); 
        break;
      case 'primary-size':
        size['primary-size'] = text.trim(); 
        break;
      case 'upc-number':
        upc['upc-number'] = text.trim(); 
        break;
      case 'secondary-size':
        upc['secondary-size'] = text.trim(); 
        break;
      case 'selling-price':
        upc['selling-price'] = text.trim(); 
        break;
      default:
        break;
    }
  }
    currentElement = null;
  });

  parser.on('end',async () => {
   
    
    // $env:NODE_OPTIONS="--max_old_space_size=8096"
    const labelnumber = await createlabel(label.date,label.time,label['record-count'],label['run-number']);

    async function looptheobject() {
      for(const items of label.stroke){
        let strokeid =  await prisma.strokexml.create({
          data: {
              datelastmodified: items['date-last-modified'],
              strokenumber: items['stroke-number'], 
              strokedescription: items['stroke-description'],
              contractnumber: items['contract-number'],
              constractstatus : items['contract-number'],
              departmentnumber:items['department-number'],
              season:items.season,
              supplierseries: items['supplier-series'],
              countrycode: items['country-code'],
              factorycode: items['Factory-code'],
              productdesc: items.productdesc,
              labelid: labelnumber ?? ''
          }
        })

        for(const labels of items['stroke-label']){
          let strokelabelid = await prisma.strokelabel.create({
            data:{
              labelref: labels['label-ref'],
              labelcategory: labels['label-category'],
              labeltype: labels['label-type'],
              labelorder: labels['label-order'],
              setname: labels['set-name'],
              strokeid: strokeid.id
            }
          })
        }

        for(const clours of items.colour){
          let strokecolourdi = await prisma.colour.create({
            data:{
              colourname: clours['colour-name'],
              colourdescription: clours['colour-description'],
              storydescription: clours['story-description'],
              strokeid: strokeid.id
            }
          })

          for(const sizes of clours.size){
            let sizeid = await prisma.size.create({
              data:{
                primarysize: sizes['primary-size'],
                colourid: strokecolourdi.id
              }
            })

            for(const upcs of sizes.upc){
              let upcid = await prisma.upc.create({
                data:{
                  upcnumber: upcs['upc-number'],
                  secondarysize: upcs['secondary-size'],
                  sellingprice: upcs['selling-price'],
                  sizeid: sizeid.id
                }
              })
            }
          }
        }

      }
      
     
    }
    await looptheobject();
    console.log('end');
    fs.unlink(xmlFilePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
      console.log('File deleted successfully.');
    });

  });
   
  // Read the XML file and pipe it to the parser
  fs.createReadStream(xmlFilePath)
    .pipe(parser);

  }