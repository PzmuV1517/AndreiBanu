import React, { useState, useEffect, useRef } from 'react';
import BootSequence from './BootSequence';
import './App.css';
import logoAscii from './logoAscii';

// Helper function to create prompt JSX remains the same
const renderPrompt = () => (
    <>
        <span className="prompt-user">guest</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">PortfolioOS</span>
        <span className="prompt-colon">:</span>
        <span className="prompt-symbol">~$</span>
    </>
);

function App() {
    const [bootCompleted, setBootCompleted] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const endOfOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- NEW: Function to handle command logic and return output ---
    const handleCommand = (command: string): React.ReactNode[] => {
        const lowerCaseCommand = command.toLowerCase();
        let output: React.ReactNode[] = [];

        switch (lowerCaseCommand) {
            case 'neofetch':
                // Add spans with classes for coloring
                output = [
                    <pre key="logo" className="ascii-logo">{logoAscii}</pre>,
                    <div key="nf-title"><span className="neofetch-label">Title:</span> Cybersecurity Enthusiast</div>,
                    '\u00A0',
                    '\u00A0',
                    '-----------------------',
                    <div key="nf-os"><span className="neofetch-label">OS:</span> PortfolioOS v1.0 x86_64</div>,
                    <div key="nf-host"><span className="neofetch-label">Host:</span> Personal Portfolio Server</div>,
                    <div key="nf-kernel"><span className="neofetch-label">Kernel:</span> 6.1.0-andrei-generic</div>,
                    <div key="nf-uptime"><span className="neofetch-label">Uptime:</span> 1 day, 4 hours, 20 mins</div>,
                    <div key="nf-shell"><span className="neofetch-label">Shell:</span> bash 5.1.16</div>,
                    <div key="nf-res"><span className="neofetch-label">Resolution:</span> Headless</div>,
                    <div key="nf-de"><span className="neofetch-label">DE:</span> None</div>,
                    <div key="nf-theme"><span className="neofetch-label">Theme:</span> N/A</div>,
                    <div key="nf-icons"><span className="neofetch-label">Icons:</span> N/A</div>,
                    <div key="nf-term"><span className="neofetch-label">Terminal:</span> react-terminal</div>,
                    <div key="nf-cpu"><span className="neofetch-label">CPU:</span> Intel Xeon E5-2690 v4 (28) @ 3.5GHz</div>,
                    <div key="nf-gpu"><span className="neofetch-label">GPU:</span> ASPEED Graphics Family</div>,
                    <div key="nf-mem"><span className="neofetch-label">Memory:</span> 256GiB / 512GiB</div>,
                    '\u00A0',
                    <div key="nf-user"><span className="neofetch-label">User:</span> Andrei Banu</div>,
                    '\u00A0',
                    <div key="nf-pages-title"><span className="neofetch-label">Available Pages:</span></div>, // Label for pages
                    <span key="page-home" className="page-name">  //Home</span>,
                    <span key="page-about" className="page-name">  //AboutMe</span>,
                    <span key="page-achieve" className="page-name">  //MyAchievements</span>,
                    <span key="page-contact" className="page-name">  //Contact</span>,
                    '\u00A0',
                    "Type 'help' for a list of available commands.",
                    '\u00A0',
                    '\u00A0',
                ];
                break; // Added missing break statement

            case 'help':
                const commands = [
                    { cmd: 'help', desc: 'Show this help message' },
                    { cmd: 'clear', desc: 'Clear the terminal screen' },
                    { cmd: 'ls', desc: 'List available pages' },
                    { cmd: 'goto [page]', desc: 'Navigate to a page (e.g., goto //AboutMe)' },
                    { cmd: 'neofetch', desc: 'Display system information' }, // Added neofetch to help
                    // Add future commands here
                ];
                const commandColWidth = 15; // Adjust as needed

                output.push('Available commands:');
                commands.forEach((item, index) => {
                    const padding = '\u00A0'.repeat(Math.max(1, commandColWidth - item.cmd.length));
                    output.push(
                        <div key={`help-${index}`}>
                            <span className="command-name">  {item.cmd}</span>
                            {padding}
                            <span>- {item.desc}</span>
                        </div>
                    );
                });
                break;

            case 'ls':
                 output.push('Available Pages:');
                 output.push(<span key="ls-home" className="page-name">  //Home</span>);
                 output.push(<span key="ls-about" className="page-name">  //AboutMe</span>);
                 output.push(<span key="ls-achieve" className="page-name">  //MyAchievements</span>);
                 output.push(<span key="ls-contact" className="page-name">  //Contact</span>);
                 break;

            // Note: 'clear' is handled directly in handleInputSubmit

            default:
                if (lowerCaseCommand.startsWith('goto //')) {
                    const page = command.substring(7);
                    output.push(`Navigating to ${page}... (Navigation logic not yet implemented)`);
                } else if (command !== '') { // Only show error if command is not empty
                    output.push(<span key={`err-${Date.now()}`} className="error-message">Command not found: {command}</span>);
                    output.push("Type 'help' for available commands.");
                }
                break;
        }
        return output;
    };


    // --- MODIFIED: handleBootComplete to run 'neofetch' ---
    const handleBootComplete = () => {
        setBootCompleted(true);
        // Simulate running the 'neofetch' command on startup
        const startupCommand = 'neofetch';
        const commandOutput = handleCommand(startupCommand);

        // Set initial output including the simulated command and its result
        setTerminalOutput([
             <div key="startup-prompt">{renderPrompt()} {startupCommand}</div>, // Show the command being run
             ...commandOutput // Spread the output from handleCommand
        ]);

        // Focus input after a short delay to ensure DOM is updated
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    // useEffect for focusing input on boot is no longer needed here, handled in handleBootComplete

    useEffect(() => {
        endOfOutputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [terminalOutput]); // Scroll whenever output changes

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(event.target.value);
    };

    // --- MODIFIED: handleInputSubmit uses handleCommand ---
    const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const command = currentInput.trim();
            setCurrentInput(''); // Clear input immediately

            // Handle 'clear' command separately as it modifies the whole state
            if (command.toLowerCase() === 'clear') {
                setTerminalOutput([]);
                setTimeout(() => inputRef.current?.focus(), 0);
                return;
            }

            // Prepare new output array
            let newOutputLines: React.ReactNode[] = [];

            // Add separator line if needed
            if (terminalOutput.length > 0) {
                newOutputLines.push('\u00A0');
            }

            // Add the prompt and the entered command
            if (command !== '') { // Don't add prompt line for empty input
                 newOutputLines.push(
                    <div key={`prompt-${Date.now()}`}>
                        {renderPrompt()} {command}
                    </div>
                );
                 // Get the output from the command handler
                 const commandOutput = handleCommand(command);
                 newOutputLines = [...newOutputLines, ...commandOutput]; // Append command output
            }


            // Update the terminal output state by appending new lines
            setTerminalOutput(prevOutput => [...prevOutput, ...newOutputLines]);

            // Refocus input
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    };


    return (
        <div className="App">
            {!bootCompleted ? (
                <BootSequence onComplete={handleBootComplete} />
            ) : (
                <div className="terminal" onClick={() => inputRef.current?.focus()}>
                    <div className="terminal-output">
                        {terminalOutput.map((line, index) => (
                            typeof line === 'string' ? <div key={index}>{line}</div> : line
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
                            onKeyDown={handleInputSubmit}
                            spellCheck="false"
                        />
                    </div>
                    <div ref={endOfOutputRef} />
                </div>
            )}
        </div>
    );
}

export default App;
