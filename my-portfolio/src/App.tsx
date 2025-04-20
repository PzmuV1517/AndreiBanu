import React, { useState, useEffect, useRef } from 'react';
import BootSequence from './BootSequence';
import './App.css';
import { commands, unknownCommand, CommandOutput } from './commands.tsx';

// Helper function to create prompt JSX remains the same
const renderPrompt = () => (
    <><span className="prompt-user">guest</span><span className="prompt-host">@PortfolioOS</span><span className="prompt-symbol">:~$</span></>
);

function App() {
    const [bootCompleted, setBootCompleted] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]); // State for command history
    const [historyIndex, setHistoryIndex] = useState<number>(-1); // -1 means current input, 0 is latest history item, etc.
    const endOfOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- MODIFIED: handleCommand now uses the imported commands object ---
    const handleCommand = (fullCommand: string): CommandOutput => {
        const parts = fullCommand.trim().split(' ');
        const commandName = parts[0].toLowerCase();
        const args = parts.slice(1); // Get arguments

        if (commandName in commands) {
            // Execute the command function from the commands object
            return commands[commandName](args);
        } else {
            // Handle unknown command
            return unknownCommand(commandName);
        }
    };

    // --- handleBootComplete remains the same (it calls the modified handleCommand) ---
     const handleBootComplete = () => {
        setBootCompleted(true);
        const startupCommand = 'neofetch'; // Command to run on startup
        // Simulate running the command
        const commandOutput = handleCommand(startupCommand);
        setTerminalOutput([
             <div key="startup-prompt">{renderPrompt()} {startupCommand}</div>,
             ...commandOutput
        ]);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    // --- useEffect for scrolling remains the same ---
    useEffect(() => {
        endOfOutputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [terminalOutput, currentInput]);

    // --- handleInputChange remains the same ---
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(event.target.value);
    };

    // --- MODIFIED: handleInputSubmit to add to history and handle arrow keys ---
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        let newHistoryIndex = historyIndex;

        if (key === 'Enter') {
            const command = currentInput.trim();
            const commandToDisplay = currentInput;
            setCurrentInput(''); // Clear input field immediately
            setHistoryIndex(-1); // Reset history navigation index

            if (command.toLowerCase() === 'clear') {
                setTerminalOutput([]);
                // Add 'clear' to history if desired, or skip
                // if (command !== '') setCommandHistory(prev => [command, ...prev]);
                setTimeout(() => inputRef.current?.focus(), 0);
                return;
            }

            let historyToAdd: React.ReactNode[] = [];

            // Add the completed command line to history display
            if (command !== '' || commandToDisplay !== '') {
                 historyToAdd.push(
                    <div key={`prompt-${Date.now()}`}>
                        {renderPrompt()} {commandToDisplay}
                    </div>
                );
            }

            // If the command wasn't just spaces, get output and add to history state
            if (command !== '') {
                 // Add unique commands to the beginning of the history state
                 setCommandHistory(prev => {
                     // Avoid adding duplicates consecutively
                     if (prev[0] === command) return prev;
                     return [command, ...prev];
                 });
                 const commandOutput = handleCommand(command);
                 historyToAdd = [...historyToAdd, ...commandOutput];
            }

            setTerminalOutput(prevOutput => [...prevOutput, ...historyToAdd]);

        } else if (key === 'ArrowUp') {
            event.preventDefault(); // Prevent cursor jump
            if (commandHistory.length > 0) {
                newHistoryIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(newHistoryIndex);
                setCurrentInput(commandHistory[newHistoryIndex]);
                // Move cursor to end after setting input value
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
                    }
                }, 0);
            }
        } else if (key === 'ArrowDown') {
            event.preventDefault(); // Prevent cursor jump
            if (historyIndex >= 0) {
                newHistoryIndex = Math.max(historyIndex - 1, -1);
                setHistoryIndex(newHistoryIndex);
                setCurrentInput(newHistoryIndex === -1 ? '' : commandHistory[newHistoryIndex]);
                 // Move cursor to end after setting input value
                 setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
                    }
                }, 0);
            }
        }
    };

    // --- Render part remains the same ---
    return (
        <div className="App">
            {!bootCompleted ? (
                <BootSequence onComplete={handleBootComplete} />
            ) : (
                <div className="terminal" onClick={() => inputRef.current?.focus()}>
                    <div className="terminal-output">
                        {terminalOutput.map((line, index) => (
                            typeof line === 'string'
                               ? <div key={`line-${index}`}>{line}</div>
                               : React.cloneElement(line as React.ReactElement, { key: `line-${index}` })
                        ))}
                    </div>
                    <div className="terminal-input-line">
                        {renderPrompt()}
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input"
                            value={currentInput}
                            onChange={handleInputChange}
                            // Use onKeyDown instead of onKeyDown for arrow key handling
                            onKeyDown={handleKeyDown}
                            spellCheck="false"
                            autoFocus
                        />
                    </div>
                    <div ref={endOfOutputRef} />
                </div>
            )}
        </div>
    );
}

export default App;
