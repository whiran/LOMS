import { newstream } from '@/app/actions/api/newstream';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';


export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), 'public', file.name)
 await writeFile(path, buffer);
 console.log(file.name);

 try{
  await newstream(file.name);

 }catch{
   console.log('found some errors when executing the xml file');
 }
  
  return NextResponse.json({ success: true });


}