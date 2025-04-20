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
    const [isTyping, setIsTyping] = useState<boolean>(false); // State to track typing animation
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
        } else if (commandName === '') { // Handle empty command explicitly if needed
            return []; // Return empty array for no output
        } else {
            // Handle unknown command
            return unknownCommand(commandName);
        }
    };

    // --- NEW: Helper function to type lines sequentially ---
    const typeLines = async (lines: React.ReactNode[], delay = 20): Promise<void> => {
        for (const line of lines) {
            setTerminalOutput(prev => [...prev, line]);
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay
        }
    };

    // --- MODIFIED: handleBootComplete to use typeLines ---
    const handleBootComplete = async () => { // Make async
        setBootCompleted(true);
        setIsTyping(true); // Start typing state

        const startupCommand = 'neofetch';
        const commandLineNode = <div key="startup-prompt">{renderPrompt()} {startupCommand}</div>;
        const commandOutput = handleCommand(startupCommand);

        await typeLines([commandLineNode], 10); // Type command fast
        await typeLines(commandOutput, 15); // Type output slightly slower

        setIsTyping(false); // Finish typing state
        setTimeout(() => inputRef.current?.focus(), 0); // Focus after typing
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
    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => { // Make async
        const { key } = event;
        let newHistoryIndex = historyIndex;

        // Ignore input if already typing output
        if (isTyping && key !== 'Enter' && key !== 'ArrowUp' && key !== 'ArrowDown') {
            event.preventDefault();
            return;
        }

        if (key === 'Enter') {
            // Prevent multiple rapid enters while typing
            if (isTyping) {
                event.preventDefault();
                return;
            }

            const command = currentInput.trim();
            const commandToDisplay = currentInput; // Keep original spacing
            setCurrentInput('');
            setHistoryIndex(-1);
            setIsTyping(true); // Start typing

            // Handle clear separately (no typing animation needed)
            if (command.toLowerCase() === 'clear') {
                setTerminalOutput([]);
                // Optionally add 'clear' to history
                // if (command !== '') setCommandHistory(prev => [command, ...prev]);
                setIsTyping(false); // Reset typing state immediately for clear
                setTimeout(() => inputRef.current?.focus(), 0);
                return;
            }

            // Prepare the command line node
            const commandLineNode = (command !== '' || commandToDisplay !== '')
                ? <div key={`prompt-${Date.now()}`}>{renderPrompt()} {commandToDisplay}</div>
                : null; // Don't display prompt line for empty input

            // Type the command line itself (if it exists)
            if (commandLineNode) {
                await typeLines([commandLineNode], 10); // Type command fast
            }

            // Process the command and type its output
            if (command !== '') {
                // Add unique commands to history
                setCommandHistory(prev => {
                    if (prev[0] === command) return prev;
                    return [command, ...prev];
                });

                const commandOutput = handleCommand(command);
                await typeLines(commandOutput, 15); // Type output lines
            }

            setIsTyping(false); // Finish typing
            // Refocus might not be needed if input never lost focus, but doesn't hurt
            setTimeout(() => inputRef.current?.focus(), 0);

        } else if (key === 'ArrowUp') {
            if (isTyping) return; // Don't allow history navigation while typing
            event.preventDefault();
            // ... (ArrowUp history logic remains the same) ...
            if (commandHistory.length > 0) {
                newHistoryIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(newHistoryIndex);
                setCurrentInput(commandHistory[newHistoryIndex]);
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
                    }
                }, 0);
            }
        } else if (key === 'ArrowDown') {
            if (isTyping) return; // Don't allow history navigation while typing
            event.preventDefault();
            // ... (ArrowDown history logic remains the same) ...
            if (historyIndex >= 0) {
                newHistoryIndex = Math.max(historyIndex - 1, -1);
                setHistoryIndex(newHistoryIndex);
                setCurrentInput(newHistoryIndex === -1 ? '' : commandHistory[newHistoryIndex]);
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
                    }
                }, 0);
            }
        }
        // Allow other keys if not typing
    };

    // --- Render part remains the same ---
    return (
        <div className="App">
            {!bootCompleted ? (
                <BootSequence onComplete={handleBootComplete} />
            ) : (
                <div className="terminal" onClick={() => !isTyping && inputRef.current?.focus()}> {/* Prevent focus stealing while typing */}
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
                            onKeyDown={handleKeyDown} // Use the modified async handler
                            spellCheck="false"
                            autoFocus
                            readOnly={isTyping} // Make input read-only while typing output
                        />
                    </div>
                    <div ref={endOfOutputRef} />
                </div>
            )}
        </div>
    );
}

export default App;
