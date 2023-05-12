import React, { useState, useEffect, useCallback } from "react";
import { InfinitySpin } from "react-loader-spinner";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const user = data.results[0];
    const { phone, email } = user;
    const { large: image } = user.picture;
    const {
      login: { password },
    } = user;
    const { title, first, last } = user.name;
    const name = `${title} ${first} ${last}`;
    const age = user.dob.age;
    const location = user.location.country;

    const newPerson = {
      name,
      image,
      email,
      age,
      location,
      phone,
      password,
    };

    setLoading(false);
    setTitle("name");
    setPerson(newPerson);
    setValue(name);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleValue = (e) => {
    let newValue;
    if (e.target.classList.contains("icon")) {
      newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  if (loading) {
    return (
      <div class="loader-container">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">my {title} is </p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="location"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchUser}>
            Get random user
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
