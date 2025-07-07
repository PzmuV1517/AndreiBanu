import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BootSequence, MobileTerminalEnhancements } from './components';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import './styles/App.css';
import { commands, unknownCommand, CommandOutput } from './utils/commands';

// Session storage keys for persistence across browser sessions
const BOOT_COMPLETED_KEY = 'portfolioBootCompleted';
const HINT_BOX_SHOWN_KEY = 'portfolioHintBoxShown';

// Terminal prompt component
const renderPrompt = () => (
    <><span className="prompt-user">guest</span><span className="prompt-host">@PortfolioOS</span><span className="prompt-symbol">:~$</span></>
);

function App() {
    // Device detection
    const { isMobile } = useDeviceDetection();
    
    // Boot sequence state - persisted to skip on refresh
    const [bootCompleted, setBootCompleted] = useState<boolean>(() => {
        return sessionStorage.getItem(BOOT_COMPLETED_KEY) === 'true';
    });
    const [hasInitiatedBoot, setHasInitiatedBoot] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    // Terminal state management
    const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    
    // Hint box state for user guidance
    const [isHintVisible, setIsHintVisible] = useState<boolean>(false);
    const [isHintPulsing, setIsHintPulsing] = useState<boolean>(false);
    
    // Refs for DOM manipulation
    const endOfOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const initialNeofetchRan = useRef<boolean>(false);

    // Handles the boot sequence initiation with audio and visual effects
    const handleBootInitiation = () => {
        if (hasInitiatedBoot) return;

        // Setup startup audio with fade effect
        const audio = new Audio('/startup.mp3');
        audioRef.current = audio;
        audio.volume = 1.0;

        // Fade out audio after 4 seconds
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
        audio.play();

        setHasInitiatedBoot(true);
        // Notify BootSequence component to start
        window.dispatchEvent(new Event('bootInitiated'));
    };

    // Processes terminal commands and returns appropriate output
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

        // Handle clear command immediately without processing
        if (command.toLowerCase() === 'clear') {
            setTerminalOutput([]);
            setIsTyping(false);
            setTimeout(() => inputRef.current?.focus(), 0);
            return;
        }

        // Display the command that was entered
        const commandLineNode = (command !== '' || commandToDisplay !== '')
            ? <div key={`prompt-${Date.now()}`}>{renderPrompt()} {commandToDisplay}</div>
            : null;

        if (commandLineNode) {
            await typeLines([commandLineNode], 10);
        }

        if (command !== '') {
             const commandName = command.split(' ')[0].toLowerCase();
             // Hide hint box when user successfully runs a command (only on desktop)
             if (!isMobile && commandName in commands && isHintVisible) {
                 setIsHintVisible(false);
             }

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

    // Handles boot sequence completion
    const handleBootComplete = () => {
        sessionStorage.setItem(BOOT_COMPLETED_KEY, 'true');
        window.dispatchEvent(new Event('portfolioBootFinished'));
        setBootCompleted(true);
    };

    // Auto-run neofetch after boot completion and show help hint
    useEffect(() => {
        if (bootCompleted && !initialNeofetchRan.current) {
            initialNeofetchRan.current = true;
            setTimeout(async () => {
                await processCommand('neofetch');

                // Show hint box for first-time users (only on desktop)
                if (!isMobile && sessionStorage.getItem(HINT_BOX_SHOWN_KEY) === null) {
                    setIsHintVisible(true);
                    setIsHintPulsing(true);
                    sessionStorage.setItem(HINT_BOX_SHOWN_KEY, 'true');

                    setTimeout(() => {
                        setIsHintPulsing(false);
                    }, 4000);
                }
            }, 100);
        }
    }, [bootCompleted, isMobile]);

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
                <MobileTerminalEnhancements>
                    {/* --- Render Hint Box as an Overlay --- */}
                    {isHintVisible && (
                        <div className={`hint-box-overlay ${isHintPulsing ? 'pulse' : ''}`}>
                            <span className="hint-box-title">[ HINT ]</span>
                            <p>Use the 'Menu' button in the top right for easy navigation, or continue using the command shell.</p>
                        </div>
                    )}
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
                </MobileTerminalEnhancements>
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
