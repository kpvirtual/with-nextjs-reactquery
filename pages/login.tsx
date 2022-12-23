import * as React from 'react';
import { LoginComponent } from '../components/LoginComponent';
import { Navbar } from '../components/Navbar';

export interface ILoginProps {

}

export default function Login (props: ILoginProps) {
  return (
    <div>
        <Navbar/>
      <LoginComponent/>
    </div>
  );
}
