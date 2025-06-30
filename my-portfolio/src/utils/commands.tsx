import React from 'react';
import logoAscii from './logoAscii';
import { useNavigate } from 'react-router-dom';

// Type definitions for terminal command system
export type CommandOutput = React.ReactNode[];

type CommandFunction = (
    args: string[],
    executeCommand: (cmd: string) => Promise<void>,
    navigate: ReturnType<typeof useNavigate>
) => CommandOutput;

// Reusable clickable component for interactive terminal elements
const Clickable: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className }) => (
    <span className={`clickable ${className || ''}`} onClick={onClick}>
        {children}
    </span>
);

// System information command similar to Unix neofetch
const neofetch: CommandFunction = (_args, _executeCommand, navigate): CommandOutput => {
    const pages = [
        { name: '//AboutMe', key: 'nf-about', path: '/about-me' },
        { name: '//MyAchievements', key: 'nf-achieve', path: '/my-achievements' },
        { name: '//MyProjects', key: 'nf-projects', path: '/my-projects' },
        { name: '//MySkills', key: 'nf-skills', path: '/my-skills' },
        { name: '//Contact', key: 'nf-contact', path: '/contact' },
    ];
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
        ...pages.map(page => (
            <Clickable
                key={page.key}
                className="page-name"
                onClick={() => navigate(page.path)}
            >
                {'  '}{page.name}
            </Clickable>
        )),
        '\u00A0',
        "Type 'help' for a list of available commands. Commands are also clickable in the terminal CLI.",
        '\u00A0',
        '\u00A0',
    ];
};

// Help command showing available commands and their descriptions
const help: CommandFunction = (_args, executeCommand, _navigate): CommandOutput => {
    const commandDetails = [
        { cmd: 'help', desc: 'Show this help message', action: () => executeCommand('help') },
        { cmd: 'clear', desc: 'Clear the terminal screen', action: () => executeCommand('clear') },
        { cmd: 'ls', desc: 'List available pages (AboutMe, MyAchievements, MyProjects, MySkills, Contact)', action: () => executeCommand('ls') },
        { cmd: 'goto [page]', desc: 'Navigate to a page (e.g., goto //AboutMe)', clickable: false },
        { cmd: 'neofetch', desc: 'Display system information', action: () => executeCommand('neofetch') },
    ];
    const commandColWidth = 15;
    let output: CommandOutput = ['Available commands:'];

    commandDetails.forEach((item, index) => {
        const padding = '\u00A0'.repeat(Math.max(1, commandColWidth - item.cmd.length));
        output.push(
            <div key={`help-${item.cmd}-${index}`}>
                {item.clickable !== false && item.action ? (
                    <Clickable
                        className="command-name"
                        onClick={item.action}
                    >
                        {'  '}{item.cmd}
                    </Clickable>
                ) : (
                    <span className="command-name">{'  '}{item.cmd}</span>
                )}
                {padding}
                <span>- {item.desc}</span>
            </div>
        );
    });
    return output;
};

// List directory contents (available pages)
const ls: CommandFunction = (_args, _executeCommand, navigate): CommandOutput => {
    const pages = [
        { name: '//AboutMe', key: 'ls-about', path: '/about-me' },
        { name: '//MyAchievements', key: 'ls-achieve', path: '/my-achievements' },
        { name: '//MyProjects', key: 'ls-projects', path: '/my-projects' },
        { name: '//MySkills', key: 'ls-skills', path: '/my-skills' },
        { name: '//Contact', key: 'ls-contact', path: '/contact' },
    ];
    return [
        <div key="ls-pages-title"><span className="neofetch-label">Available Pages:</span></div>,
        // Make page names clickable and use navigate
        ...pages.map(page => (
            <Clickable
                key={page.key}
                className="page-name"
                onClick={() => navigate(page.path)}
            >
                {'  '}{page.name}
            </Clickable>
        )),
    ];
};

// Map page names (lowercase) to their paths
const pagePaths: Record<string, string> = {
    '//aboutme': '/about-me',
    '//myachievements': '/my-achievements',
    '//myprojects': '/my-projects',
    '//myskills': '/my-skills',
    '//contact': '/contact',
};

// Navigation command to switch between pages
const goto: CommandFunction = (args, _executeCommand, navigate): CommandOutput => {
    if (args.length === 1 && args[0].startsWith('//')) {
        const requestedPage = args[0].toLowerCase();
        const pageName = args[0];

        if (requestedPage in pagePaths) {
            const path = pagePaths[requestedPage];
            navigate(path);
            return [`Navigating to ${pageName}...`];
        } else {
            return [ <span key="goto-err-invalid" className="error-message">Error: Page "{pageName}" not found. Use 'ls' to see available pages.</span> ];
        }
    } else {
        return [ <span key="goto-err-usage" className="error-message">Usage: goto //PageName (e.g., goto //AboutMe)</span> ];
    }
};

export const commands: Record<string, CommandFunction> = {
    neofetch,
    help,
    ls,
    goto,
};

// Handles unrecognized commands with helpful error message
export const unknownCommand = (command: string): CommandOutput => {
    return [
        <span key={`err-${command}`} className="error-message">Command not found: {command}</span>,
        "Type 'help' for available commands."
    ];
};