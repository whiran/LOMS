'use client'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/actions/users/signUp';


type Props = {}

const Signupform = (props: Props) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
    if(pnum !== '' && country!== '' && region !=='' && firstName !=='' && lastName !=='' &&  sa  !=='' && sl  !=='' && city  !=='' && post !== '' && email !=='' && password !== ''){
      const output = await signup(firstName,lastName,pnum,sa,sl,city,post,country,region,email,password);
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
    <div className='flex flex-col gap-4 border rounded-md p-6 bg-slate-400 mt-4'>
      <div className='text-xl font-bold'>Sign up</div>
            <input required type='text'placeholder='first name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <input required type='text'placeholder='second name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <PhoneInput country={'us'} value={pnum} onChange={(e) => setPnum(e)}/>
            <input  required type='text' placeholder='Street address' value={sa} onChange={(e) => setSa(e.target.value)}/>
            <input  required type='text' placeholder='Street address line two' value={sl} onChange={(e) => setSl(e.target.value)} />
            <input type='text' placeholder='city' value={city} onChange={(e) => setCity(e.target.value)}/>
            <input  required type='text' placeholder='Postal/ Zip code' value={post} onChange={(e) => setPost(e.target.value)}/>
            <input type="email" required  onChange={(e) => {setEmail(e.target.value)}} placeholder='Email'/>
            <input type="password" required onChange={(e) => { setPassword(e.target.value)}} placeholder='Password'/>
            <CountryDropdown value={country}  onChange={(e) => setCountry(e)} />
            <RegionDropdown country={country} value={region} onChange={(e) => setRegion(e)} />
           <button onClick={handleSubmit} className='border rounded-sm font-medium w-full bg-lime-400 hover:bg-orange-300'>Submit</button>
    </div>
  )
}

export default Signupform