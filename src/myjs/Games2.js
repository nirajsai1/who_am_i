import React, { useEffect, useState } from 'react';
import pname from '../myjson/mynames.json';
import pdetails from '../myjson/my.json';
import '../mycss/Games2.css';
import tn from '../myjson/totalnames.json';

const Games2 = () => {  
    const [name, setName] = useState('');
    const [nationality, setNationality] = useState('');
    const [records, setRecords] = useState('');
    const [mris, setMris] = useState(0);
    const [mwis, setMwis] = useState(0);
    const [teams, setTeams] = useState([]);
    const [role, setRole] = useState('');
    const [p, setP] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null); 
    const colors = [
        '#F9CD05', '#491F86', '#005FA2', '#EF8905', '#2561AE', 
        '#0057E2', '#B58E29', '#7851A9', '#DD1F2D', '#FF3700', 
        '#D94B47', '#1FB0C6'
      ];
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
    const getName = (index) => pname[index]?.name;

    const getDetails = (nameofplayer) => {
        const temp = pdetails.find(player => player.name === nameofplayer);
        if (temp) {
            setName(temp.name);
            setNationality(temp.nationality);
            setRole(temp.role_in_team);
            setMwis(temp.most_wickets_in_season > 0 ? temp.most_wickets_in_season : 0);
            setMris(temp.most_runs_in_season > 0 ? temp.most_runs_in_season : 0);
            setTeams(temp.teams_played); 
            setRecords(temp.best_record);
        }
    };

    useEffect(() => {
        const ind = Math.floor(Math.random() * pname.length); 
        const nameofplayer = getName(ind);
        if (nameofplayer) {
            getDetails(nameofplayer);
        }
    }, []);

    const iname = (event) => {
        const value = event.target.value;
        setP(value);
        if (value) {
            const filteredSuggestions = tn.filter(item =>
                item.player.toLowerCase().startsWith(value.toLowerCase())
            ).slice(0, 10);
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const validate = (suggestion) => {
        setName(suggestion.player);
        setP(suggestion.player); 
        setSuggestions([]);
        getDetails(suggestion.player); 
    };

    const result = () => {
        if (p.toLowerCase() === name.toLowerCase()) {
            setIsCorrect(true); 
        } else {
            setIsCorrect(false); 
        }
    };

    return (
        <div>
            <p className='c0'>
                WHO <span>&nbsp;AM&nbsp;</span> I
            </p>
            <div className='r1'>
                <input 
                    placeholder='Enter Name' 
                    value={p} 
                    onChange={iname} 
                    onBlur={() => setTimeout(() => setSuggestions([]), 200)} 
                    onFocus={() => iname({ target: { value: p } })} 
                />

                {suggestions.length > 0 && (
                    <ul className="u1">
                        {suggestions.map((suggestion) => (
                            <li
                                className="li"
                                key={suggestion.id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => validate(suggestion)}
                            >
                                {suggestion.player}
                            </li>
                        ))}
                    </ul>
                )}

                <button onClick={result}>Tryy!</button>
            </div>

            {isCorrect !== null && (
                <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? "Correct!" : "Try Again!"}
                </div>
            )}

            <div className='c1'>
                <p>Nationality: {nationality}</p>
                <p>Role: {role}</p>
                <p>Most Runs In a Season: {mris}</p>
                <p>Most Wickets In a Season: {mwis}</p>
            </div>
            <div className='c2'>
                <p>Teams Played:</p>
                <ul>
                    {teams.map((item, ind) => (
                        <li key={ind} style={{color:getColor(item)}}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='c3'> 
                <p>Best Record: {records}</p>
            </div>
        </div>
    );
};

export default Games2;

