import React, { useState, useEffect, useRef } from 'react';
import BootSequence from './BootSequence';
import './App.css';


function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBootComplete = () => {
    const logo = [
        "            .:+osssssssssssss+:.            ",
        "         -+ssssssssssssssssssssssyys+-         ",
        "      .+sssssssssssssssssssssssyyyhysss+.",
        "   /ssssssssssshdmNmmmNNyyyssssNMMMMMMhsss/",
        "  +ssssssssssshNdyMMMMMNdddyssssssssssss+ ",
        " +ssssssssssshNMMMMMMMMMMMMddyssssssss+  ",
        ".+sssssssssshNMMMMMMMMMMMMyyyyyyyyyyyyhsss/.",
        " oyyNMMNMMMMMNhssssssssssssshMMMMMMMMMMss ",
        " o+sssyyhhNMMMMMMMMMMMMMMMMsssshMMMMMMMMMy.o ",
        " +ssssssshNMMMMMMMMMMMMMMMMMMMMMMMMMMMy+ ",
        " .+ssssssssdMMMMMMMMMMMMMMMMMMMMy+  ",
        "     .sssssssssdMMMMMMMMMMMMMMy. ",
        "        /ssssssssshNNNMMNMMy.",
        "           .:+osssssssyyysss+:.      ",
        "           -+ossssssssssso+-      "
      ];
      const info = ["Andrei Banu", "Cybersecurity Enthusiast"];
      const links = [
        "//my-achievements",
        "//about-me",
        "//projects"
    ];
      const help = ["To view all commands type help"];
        setTerminalOutput([
            ...logo,
            "",
            ...info.map((line) => "     " + line),
            "",
            ...links.map((line) => "     " + line),
            "",
            ...help.map((line) => "     " + line),]);
      setIsBooted(true);
  };  

  useEffect(() => {
    if(isBooted && inputRef.current){
        inputRef.current.focus();
    }
  }, [isBooted])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTerminalOutput([...terminalOutput, `Visitor@ClassifiedPortfolio:~$ ${currentInput}`]);
      setCurrentInput('');
    }
  };


  return (
      <div className="terminal">
      {!isBooted ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <div className="terminal-body">
            <div className="terminal-output">
              {terminalOutput.map((line, index) => (
                    <div key={index} className='terminal-line'>
                        {line}
                    </div>
                ))}
            </div>
            <div className="terminal-input">
                <span className="prompt">Visitor@ClassifiedPortfolio:~$</span>
                <input type="text" value={currentInput} onChange={handleInputChange} onKeyDown={handleKeyDown} className="input-field" ref={inputRef}/>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
