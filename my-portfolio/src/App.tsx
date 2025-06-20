import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BootSequence from './BootSequence';
import './App.css';
import { commands, unknownCommand, CommandOutput } from './commands.tsx';

// Key for sessionStorage
const BOOT_COMPLETED_KEY = 'portfolioBootCompleted';

const renderPrompt = () => (
    <><span className="prompt-user">guest</span><span className="prompt-host">@PortfolioOS</span><span className="prompt-symbol">:~$</span></>
);

function App() {
    const [bootCompleted, setBootCompleted] = useState<boolean>(() => {
        return sessionStorage.getItem(BOOT_COMPLETED_KEY) === 'true';
    });
    // New state to track if the user has clicked the initial button
    const [hasInitiatedBoot, setHasInitiatedBoot] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const endOfOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const initialNeofetchRan = useRef<boolean>(false);

    // Function to start audio and visual boot sequence
    const handleBootInitiation = () => {
        if (hasInitiatedBoot) return; // Prevent multiple clicks

        // --- Start Audio ---
        const audio = new Audio('/startup.mp3');
        audioRef.current = audio;
        audio.volume = 1.0;

        const handleTimeUpdate = () => {
            if (audio.currentTime > 4) {
                const fadeDuration = audio.duration - 4;
                if (fadeDuration > 0) {
                    const progress = (audio.currentTime - 4) / fadeDuration;
                    const newVolume = Math.max(0.05, 1.0 - (0.95 * progress));
                    audio.volume = newVolume;
                }
            }
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.play(); // This will work because it's triggered by a user click

        // --- Start Visuals ---
        setHasInitiatedBoot(true);
        // --- Signal that boot has started ---
        window.dispatchEvent(new Event('bootInitiated'));
    };

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

    const handleBootComplete = () => {
        sessionStorage.setItem(BOOT_COMPLETED_KEY, 'true');
        window.dispatchEvent(new Event('portfolioBootFinished'));
        setBootCompleted(true);
    };

    useEffect(() => {
        if (bootCompleted && !initialNeofetchRan.current) {
            initialNeofetchRan.current = true;
            setTimeout(() => {
                processCommand('neofetch');
            }, 100);
        }
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
            {bootCompleted ? (
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
            ) : !hasInitiatedBoot ? (
                <div className="boot-container">
                    <button className="boot-button" onClick={handleBootInitiation}>
                        Boot-up
                    </button>
                </div>
            ) : (
                <BootSequence onComplete={handleBootComplete} />
            )}
        </div>
    );
}

export default App;
