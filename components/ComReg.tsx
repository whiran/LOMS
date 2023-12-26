'use client'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useRef, useState } from 'react';
import { companysignup } from '@/app/actions/users/companysignup';
import { useRouter } from 'next/navigation';
import Signin from '@/app/auth/signin/page';

type Props = {}

const ComReg = (props: Props) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bame, setBname] = useState('');
  const [pnum, setPnum] = useState('');
  const [sa, setSa] = useState('');
  const [sl, setSl] = useState('');
  const [city, setCity] = useState('');
  const [post, setPost] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = async () => {
    if(pnum !== '' && country!== '' && region !=='' && firstName !=='' && lastName !=='' && bame !=='' && sa  !=='' && sl  !=='' && city  !=='' && post !== '' && email !=='' && password !== ''){
      const output = await companysignup(firstName,lastName,bame,pnum,sa,sl,city,post,country,region,email,password);
      if(output == 'successfully created new user!'){
        router.refresh();
        router.push('/auth/signin')
      }
    }
    else{
      alert('fill all')
    }
  }

  return (
    <div className='flex flex-col gap-4 border rounded-md p-6 bg-slate-400 mt-24 lg:gap-2 normal bignormal '>
    <div className='text-xl font-bold'>Sign up</div>
          <input required type='text'placeholder='first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <input required type='text'placeholder='second name' value={lastName} onChange={(e) => setLastName(e.target.value)} className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <input required type='text' placeholder='business name' value={bame} onChange={(e) => setBname(e.target.value)} className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <PhoneInput country={'us'} value={pnum} onChange={(e) => setPnum(e)} inputStyle={{}}/>
          <input  required type='text' placeholder='Street address' value={sa} onChange={(e) => setSa(e.target.value)} className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <input  required type='text' placeholder='Street address line two' value={sl} onChange={(e) => setSl(e.target.value)} className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <input type='text' placeholder='city' value={city} onChange={(e) => setCity(e.target.value)} className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <input  required type='text' placeholder='Postal/ Zip code' value={post} onChange={(e) => setPost(e.target.value)} className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <input type="email" required  onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <input type="password" required onChange={(e) => { setPassword(e.target.value)}} placeholder='Password' className='lg:p-2 text-base lg:text-lg xl:text-xl rounded-sm'/>
          <CountryDropdown value={country}  onChange={(e) => setCountry(e)} classes='lg:p-2 text-sm rounded-sm'/>
          <RegionDropdown country={country} value={region} onChange={(e) => setRegion(e)} classes='lg:p-2 text-sm rounded-sm'/>
         <button onClick={handleSubmit} className='border rounded-sm  w-full bg-lime-400 hover:bg-orange-300 text-base lg:text-lg xl:text-xl'>Submit</button>
  </div>
  )
}

export default ComReg