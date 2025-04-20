import React from 'react';
import logoAscii from './logoAscii'; // Assuming logoAscii is in the same directory or adjust path

// Define the structure for command output
export type CommandOutput = React.ReactNode[];

// Define the type for a command function
// It receives arguments (if any) and returns the output
type CommandFunction = (args: string[]) => CommandOutput;

// --- Individual Command Implementations ---

const neofetch: CommandFunction = (args): CommandOutput => {
    // args are ignored for neofetch
    return [
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
        <div key="nf-pages-title"><span className="neofetch-label">Available Pages:</span></div>,
        <span key="page-home" className="page-name">  //Home</span>,
        <span key="page-about" className="page-name">  //AboutMe</span>,
        <span key="page-achieve" className="page-name">  //MyAchievements</span>,
        <span key="page-contact" className="page-name">  //Contact</span>,
        '\u00A0',
        "Type 'help' for a list of available commands.",
        '\u00A0',
        '\u00A0',
    ];
};

const help: CommandFunction = (args): CommandOutput => {
    // args ignored for help
    const commandList = Object.keys(commands); // Get available commands from the exported object
    const commandDetails = [ // Define descriptions here
        { cmd: 'help', desc: 'Show this help message' },
        { cmd: 'clear', desc: 'Clear the terminal screen' },
        { cmd: 'ls', desc: 'List available pages' },
        { cmd: 'goto [page]', desc: 'Navigate to a page (e.g., goto //AboutMe)' },
        { cmd: 'neofetch', desc: 'Display system information' },
        // Add descriptions for new commands here
    ];
    const commandColWidth = 15;
    let output: CommandOutput = ['Available commands:'];

    commandDetails.forEach((item, index) => {
        // Only show commands that actually exist in our commands object
        if (commandList.includes(item.cmd.split(' ')[0])) { // Check base command name
             const padding = '\u00A0'.repeat(Math.max(1, commandColWidth - item.cmd.length));
             output.push(
                 <div key={`help-${item.cmd}-${index}`}>
                     <span className="command-name">  {item.cmd}</span>
                     {padding}
                     <span>- {item.desc}</span>
                 </div>
             );
        }
    });
    return output;
};

const ls: CommandFunction = (args): CommandOutput => {
    // args ignored for ls
    return [
        'Available Pages:',
        <span key="ls-home" className="page-name">  //Home</span>,
        <span key="ls-about" className="page-name">  //AboutMe</span>,
        <span key="ls-achieve" className="page-name">  //MyAchievements</span>,
        <span key="ls-contact" className="page-name">  //Contact</span>,
    ];
};

const goto: CommandFunction = (args): CommandOutput => {
    if (args.length === 1 && args[0].startsWith('//')) {
        const page = args[0];
        // Future: Implement actual navigation, maybe return a special object
        return [`Navigating to ${page}... (Navigation logic not yet implemented)`];
    } else {
        return [
             <span key="goto-err" className="error-message">Usage: goto //PageName</span>
        ];
    }
};

// --- Commands Object ---
// Maps command strings to their functions
export const commands: Record<string, CommandFunction> = {
    neofetch,
    help,
    ls,
    goto,
    // Add new commands here:
    // 'echo': echoCommand,
};

// --- Function to handle unknown commands ---
export const unknownCommand = (command: string): CommandOutput => {
    return [
        <span key={`err-${command}`} className="error-message">Command not found: {command}</span>,
        "Type 'help' for available commands."
    ];
};