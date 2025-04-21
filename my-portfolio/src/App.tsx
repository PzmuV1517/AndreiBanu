import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BootSequence from './BootSequence';
import './App.css';
import { commands, unknownCommand, CommandOutput } from './commands.tsx';

// Keys for sessionStorage
const BOOT_COMPLETED_KEY = 'portfolioBootCompleted';

// Helper function to create prompt JSX remains the same
const renderPrompt = () => (
    <><span className="prompt-user">guest</span><span className="prompt-host">@PortfolioOS</span><span className="prompt-symbol">:~$</span></>
);

function App() {
    // Initialize bootCompleted based on sessionStorage
    const [bootCompleted, setBootCompleted] = useState<boolean>(() => {
        return sessionStorage.getItem(BOOT_COMPLETED_KEY) === 'true';
    });
    const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const endOfOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    // Ref to track if initial neofetch has run on direct load
    const initialNeofetchRan = useRef<boolean>(false);

    const handleCommand = (
        fullCommand: string,
        executeCommand: (cmd: string) => Promise<void>
    ): CommandOutput => {
        const parts = fullCommand.trim().split(' ');
        const commandName = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (commandName in commands) {
            return commands[commandName](args, executeCommand, navigate);
        } else if (commandName === '') {
             return [];
        }
        else {
            return unknownCommand(commandName);
        }
    };

    const typeLines = async (lines: React.ReactNode[], delay = 20): Promise<void> => {
        for (const line of lines) {
            setTerminalOutput(prev => [...prev, line]);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    };

    const processCommand = async (commandToProcess: string): Promise<void> => {
        const command = commandToProcess.trim();
        const commandToDisplay = commandToProcess;

        if (isTyping) return;
        setIsTyping(true);

        if (command.toLowerCase() === 'clear') {
            setTerminalOutput([]);
            setIsTyping(false);
            setTimeout(() => inputRef.current?.focus(), 0);
            return;
        }

        const commandLineNode = (command !== '' || commandToDisplay !== '')
            ? <div key={`prompt-${Date.now()}`}>{renderPrompt()} {commandToDisplay}</div>
            : null;

        if (commandLineNode) {
            await typeLines([commandLineNode], 10);
        }

        if (command !== '') {
             setCommandHistory(prev => {
                 if (prev[0] === command) return prev;
                 return [command, ...prev];
             });

             const commandOutput = handleCommand(command, simulateCommandExecution);
             await typeLines(commandOutput, 15);
        }

        setIsTyping(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const simulateCommandExecution = async (commandToRun: string): Promise<void> => {
        if (isTyping) return;
        setCurrentInput('');
        setHistoryIndex(-1);
        await processCommand(commandToRun);
    };

    // --- MODIFIED: handleBootComplete dispatches event ---
    const handleBootComplete = async () => {
        // Set boot completed flag *before* dispatching event
        sessionStorage.setItem(BOOT_COMPLETED_KEY, 'true');
        // Dispatch custom event for Layout component
        window.dispatchEvent(new Event('portfolioBootFinished'));
        setBootCompleted(true);
        await processCommand('neofetch');
    };

    useEffect(() => {
        // Check if boot is completed (likely from sessionStorage) AND
        // if the initial neofetch for this mount hasn't run yet.
        if (bootCompleted && !initialNeofetchRan.current) {
            // Set the flag to true immediately to prevent re-running
            initialNeofetchRan.current = true;
            // Run neofetch because we skipped the boot sequence
            processCommand('neofetch');
        }
        // This effect should run when bootCompleted state is initially set or changes.
        // The ref prevents the command from running multiple times on subsequent re-renders.
    }, [bootCompleted]);

    useEffect(() => {
        endOfOutputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [terminalOutput, currentInput]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(event.target.value);
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;

        if (isTyping && key !== 'Enter' && key !== 'ArrowUp' && key !== 'ArrowDown') {
             event.preventDefault(); return;
        }

        if (key === 'Enter') {
            event.preventDefault();
            const commandToRun = currentInput;
            setCurrentInput('');
            setHistoryIndex(-1);
            await processCommand(commandToRun);

        } else if (key === 'ArrowUp') {
            if (isTyping) return;
            event.preventDefault();
            if (commandHistory.length > 0) {
                const newHistoryIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(newHistoryIndex);
                setCurrentInput(commandHistory[newHistoryIndex]);
                setTimeout(() => { if (inputRef.current) { inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length; } }, 0);
            }
        } else if (key === 'ArrowDown') {
            if (isTyping) return;
            event.preventDefault();
             if (historyIndex >= 0) {
                const newHistoryIndex = Math.max(historyIndex - 1, -1);
                setHistoryIndex(newHistoryIndex);
                setCurrentInput(newHistoryIndex === -1 ? '' : commandHistory[newHistoryIndex]);
                 setTimeout(() => { if (inputRef.current) { inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length; } }, 0);
            }
        }
    };

    return (
        <div className="App">
            {!bootCompleted ? (
                <BootSequence onComplete={handleBootComplete} />
            ) : (
                <div className="terminal" onClick={() => !isTyping && inputRef.current?.focus()}>
                    <div className="terminal-output">
                        {terminalOutput.map((line, index) => (
                            React.isValidElement(line)
                                ? React.cloneElement(line, { key: `line-${index}-${line.key || index}` })
                                : <div key={`line-${index}`}>{line}</div>
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
                            onKeyDown={handleKeyDown}
                            spellCheck="false"
                            autoFocus
                            readOnly={isTyping}
                        />
                    </div>
                    <div ref={endOfOutputRef} />
                </div>
            )}
        </div>
    );
}

export default App;
