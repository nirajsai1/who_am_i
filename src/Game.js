import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import names from './my.json';
import ndata from './mynames.json';
import tn from './totalnames.json';
import './Game.css';

const Game = () => {
  const [chances, setChances] = useState(5);
  const [warn, setWarn] = useState('');
  const [name, setName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [player, setPlayer] = useState('');
  const [nationality, setNationality] = useState('');
  const [role, setRole] = useState('');
  const [myruns, setMyruns] = useState('');
  const [wickets, setWickets] = useState('');
  const [bestRecord, setBestRecord] = useState('');
  const [teams, setTeams] = useState([]);
  const [out, setOut] = useState('');
  const colors = [
    '#F9CD05', '#491F86', '#005FA2', '#EF8905', '#2561AE', 
    '#0057E2', '#B58E29', '#7851A9', '#DD1F2D', '#FF3700', 
    '#D94B47', '#1FB0C6'
  ];

  const getData = (playerName) => {
    const item = names.find(huii => huii.name === playerName);
    if (item) {
      setNationality(item.nationality);
      setRole(item.role_in_team);
      setMyruns(item.most_runs_in_season);
      setWickets(item.most_wickets_in_season);
      setTeams(item.teams_played || []);
      setBestRecord(item.best_record);
    }
  };

  const getName = (id) => {
    const item = ndata.find(huii => huii.id === id);
    return item ? item.name : '';
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    if (value) {
      const filteredSuggestions = tn.filter(item =>
        item.player.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 10);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 145);
    const randomPlayer = getName(randomId);
    setPlayer(randomPlayer);
    getData(randomPlayer);
  }, []);

  const validate = () => {
    const lcn = name.toLowerCase();
    const lcp = player.toLowerCase();
    if (lcn === lcp) {
      setOut('Congratulations! You guessed correctly!');
    } else {
      setChances(prev => {
        if (prev - 1 <= 0) {
          setOut(`Game Over! The correct name was ${player}.`);
          return 0;
        } else {
          setOut(`Incorrect! You have ${prev - 1} chances left.`);
          return prev - 1;
        }
      });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion.player);
    setSuggestions([]);
    validate();
  };

  const getColor = (teamName) => {
    const teamColors = {
      'Royal Challengers Bangalore': colors[9],
      'Sunrisers Hyderabad': colors[3],
      'Chennai Super Kings': colors[0],
      'Delhi Daredevils': colors[4],
      'Delhi Capitals': colors[4],
      'Rajasthan Royals': colors[7],
      'Kings XI Punjab': colors[8],
      'Punjab Kings': colors[8],
      'Lucknow Super Giants': colors[5],
      'Mumbai Indians': colors[2],
      'Gujarat Titans': colors[6],
      'Kolkata Knight Riders': colors[1],
      'Pune Warriors': colors[11],
      'Gujarat Lions': colors[10],
    };
    return teamColors[teamName] || '#000';
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="d0">
          <p className="p0">WHO <span className="p00">AM</span> I</p>
        </div>
        <div className="d1">
          <p className="p1">I am an {nationality}</p>
        </div>
        <div className="d2">
          <p className="p2">{role}</p>
        </div>
        <div className="d5">
          <p className="p5">{bestRecord}</p>
        </div>
        <div className="d3">
          <p className="p3">Teams Played:</p>
          <div className="d4">
            {teams.map((team, index) => (
              <p key={index} className="p4" style={{ color: getColor(team) }}>{team}</p>
            ))}
          </div>
        </div>
        <nav>
          <Link to="/">Back</Link>
        </nav>
      </div>

      <div className="right-section">
        <div className="mys">
          <input
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={handleNameChange}
            className="i1"
            disabled={chances === 0}
          />
          <button onClick={validate} className="i2" disabled={chances === 0}>Enter</button>
          {suggestions.length > 0 && (
            <ul className="u1">
              {suggestions.map((suggestion) => (
                <li
                  className="li"
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.player}
                </li>
              ))}
            </ul>
          )}
          <p>{warn}</p>
        </div>
        <div>
          <p>{out}</p>
        </div>
      </div>
    </div>
  );
}

export default Game;



