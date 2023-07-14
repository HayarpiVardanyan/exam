import React, { useState } from 'react';

const UserList = ({ userData, handleUserSelect }) => {
  return (
    <ul>
      {userData.map((user, index) => (
        <li key={index} onClick={() => handleUserSelect(index)}>
          {user.name} {user.sName}
        </li>
      ))}
    </ul>
  );
};

const Form = () => {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState('');
  const [sName, setSName] = useState('');
  const [age, setAge] = useState('');
  const [mail, setMail] = useState('');
  const [picture, setPicture] = useState('');
  const [prof, setProf] = useState('');
  const [education, setEducation] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const user = {
      name,
      sName,
      age,
      mail,
      picture,
      prof,
      education,
    };

    setUserData([...userData, user]);

    setName('');
    setSName('');
    setAge('');
    setMail('');
    setPicture('');
    setProf('');
    setEducation('');
  };

  const handleUserSelect = (index) => {
    const user = userData[index];
    setSelectedUser(user);
  };

  return (
    <div className="form">
      <h2>Form</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required/><br /><br />

        <label htmlFor="s_name">Surname:</label>
        <input type="text" id="s_name" name="s_name" value={sName} onChange={(event) => setSName(event.target.value)} required/><br /><br />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={age} onChange={(event) => setAge(event.target.value)} required/><br /><br />

        <label htmlFor="mail">Email:</label>
        <input type="email" id="mail" name="mail" value={mail} onChange={(event) => setMail(event.target.value)} required/><br /><br />

        <label htmlFor="picture">Picture:</label>
        <input type="file" id="picture" name="picture" value={picture} onChange={(event) => setPicture(event.target.value)}/><br /><br />

        <label htmlFor="prof">Profession:</label>
        <input type="text" id="prof" name="prof" value={prof} onChange={(event) => setProf(event.target.value)} required/><br /><br />

        <label htmlFor="education">Education:</label>
        <textarea id="education" name="education" value={education} onChange={(event) => setEducation(event.target.value)} required></textarea><br /><br />

        <input type="submit" value="Submit" />
      </form>
      <UserList userData={userData} handleUserSelect={handleUserSelect} />
      {selectedUser && (
        <div className="cv">
          <h2>User CV</h2>
          <p>
            <strong>Name: </strong>
            {selectedUser.name} {selectedUser.sName}
          </p>
          <p>
            <strong>Age: </strong>
            {selectedUser.age}
          </p>
          <p>
            <strong>Email: </strong>
            {selectedUser.mail}
          </p>
        </div>
      )}
    </div>
  );
};

export default Form;