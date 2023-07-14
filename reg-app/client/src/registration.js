import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const generateDayOptions = () => {
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push(<option key={day} value={day}>{day}</option>);
    }
    return days;
  };

  const generateMonthOptions = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.map((month, index) => (
      <option key={index} value={month}>{month}</option>
    ));
  };

  const generateYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1960; year--) {
      years.push(<option key={year} value={year}>{year}</option>);
    }
    return years;
  };

  const CREATE_USER = gql`
    mutation CreateUser(
      $username: String!
      $password: String!
      $day: String!
      $month: String!
      $year: String!
      $gender: String!
    ) {
      createUser(
        username: $username
        password: $password
        day: $day
        month: $month
        year: $year
        gender: $gender
      ) {
        username
        password
        day
        month
        year
        gender
      }
    }
  `;

  const [createUser] = useMutation(CREATE_USER);

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await createUser({
        variables: {
          username: username,
          password: password,
          day: day,
          month: month,
          year: year,
          gender: gender,
        },
      });

      console.log('User created:', response.data);
      console.log('Registration submitted');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className='round'>
      <h1>Registration</h1>
      <form onSubmit={handleRegistration}>
        
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <br />
        <label>Birthday</label><br />
        <select value={day} onChange={handleDayChange}>
          {generateDayOptions()}
        </select>
        <select value={month} onChange={handleMonthChange}>
          {generateMonthOptions()}
        </select>
        <select value={year} onChange={handleYearChange}>
          {generateYearOptions()}
        </select>
        <br />
        <br />
        <p>Gender</p>
        <input type="text" value={gender} placeholder="Gender" onChange={handleGenderChange} />
        <br />
        <br />
        <button type="submit">Register</button>
        
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Registration;
