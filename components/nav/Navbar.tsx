import React from 'react'
import { Button } from '@mui/material'
import Home from '../../pages/index';

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='w-full bg-white border-2 border-rose-600 flex justify-center items-center space-x-5'>
    <Button variant='outlined'href={'/'}>Home</Button>
    <Button variant='outlined' href='/counter'>Counter</Button>
    <Button variant='outlined' href={'/page1'}>Page1</Button>
    <Button variant='outlined'href={'/page2'}>Page2</Button>
    </div>
    
  )
}

export default Navbar