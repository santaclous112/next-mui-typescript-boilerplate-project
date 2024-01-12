import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Generate Order Data
interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const [userData, setUserData] = useState<object[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/users/getAll")
      .then(res => setUserData(res.data))
  },[]);
  return (
    <React.Fragment>
      <Title>All Clients</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell align="right">Subscriptions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(userData as IUser[]).map((user: IUser, index:number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell align="right">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more details
      </Link>
    </React.Fragment>
  );
}