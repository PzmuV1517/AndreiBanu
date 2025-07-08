import React from 'react';
import logoAscii from './logoAscii';
import { useNavigate } from 'react-router-dom';

// ARG (Operation B.A.N.U.) State Management
interface ARGState {
    isActive: boolean;
    isAuthenticated: boolean;
    currentLevel: number;
    completedPuzzles: Set<string>;
    inventory: Set<string>;
    networkStatus: 'connected' | 'disconnected';
    currentUser: string;
    currentHost: string;
    discoveries: Set<string>;
    decryptedFiles: Map<string, string>;
    combinedFragments: string[];
    sshSessions: Map<string, { user: string; host: string; connected: boolean }>;
    ledgerEntries: Array<{ timestamp: string; entry: string; hash: string }>;
    recoveredData: Map<string, string>;
}

// Global ARG state - in a real app this would be in a context/store
let argState: ARGState = {
    isActive: false,
    isAuthenticated: false,
    currentLevel: 0,
    completedPuzzles: new Set(),
    inventory: new Set(),
    networkStatus: 'disconnected',
    currentUser: 'user',
    currentHost: 'localhost',
    discoveries: new Set(),
    decryptedFiles: new Map(),
    combinedFragments: [],
    sshSessions: new Map(),
    ledgerEntries: [],
    recoveredData: new Map(),
};

// In-memory file system for ARG
const argFileSystem = new Map<string, { content: string; type: 'text' | 'binary' | 'encrypted' | 'compressed' }>([
    ['system.log', { content: 'System initialization complete. Operation B.A.N.U. protocol active.\nWarning: Unauthorized access detected. Implementing countermeasures.\nTrace: Connection from 192.168.1.127\nStatus: CLASSIFIED', type: 'text' }],
    ['encrypted_data.txt', { content: 'Gur frperg vf uvqqra va gur pbqr. Ybbx sbe gur xrl va gur ybtvaf.', type: 'encrypted' }],
    ['fragment1.gz', { content: 'H4sIAAAAAAAAA0vOyS9NScwr0XNJzczJTFGyUsrIyU9VslKyMtAzMjS0UoIDAF5VQsJoAAAA', type: 'compressed' }],
    ['fragment2.b64', { content: 'VGhlIGZpcnN0IGZyYWdtZW50IGNvbnRhaW5zOiAiVGhlIG9wZXJhdGlvbiIu', type: 'text' }],
    ['banu_key.pem', { content: '-----BEGIN ENCRYPTED KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAo\n-----END ENCRYPTED KEY-----', type: 'text' }],
    ['steganography.jpg', { content: 'binary_image_data_with_hidden_message:The_final_coordinates_are_37.7749_-122.4194', type: 'binary' }],
    ['blockchain.json', { content: '{"block":1,"hash":"a1b2c3","prev":"000000","data":"Operation B.A.N.U. Genesis Block"}', type: 'text' }],
]);

// ARG Puzzle Solutions
const puzzleSolutions = {
    passphrase: 'shadow_protocol',
    caesarShift: 7,
    combinedMessage: 'The operation requires three fragments to reveal the location of the digital vault.',
    finalCoordinates: '37.7749,-122.4194',
    masterKey: 'BANU_MASTER_KEY_2024',
};

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
    const basicCommands = [
        { cmd: 'help', desc: 'Show this help message', action: () => executeCommand('help') },
        { cmd: 'clear', desc: 'Clear the terminal screen', action: () => executeCommand('clear') },
        { cmd: 'ls', desc: 'List available pages or files (context-dependent)', action: () => executeCommand('ls') },
        { cmd: 'goto [page]', desc: 'Navigate to a page (e.g., goto //AboutMe)', clickable: false },
        { cmd: 'neofetch', desc: 'Display system information', action: () => executeCommand('neofetch') },
        { cmd: 'echo [text]', desc: 'Display text (try: echo open.banu)', action: () => executeCommand('echo') },
        { cmd: 'man [command]', desc: 'Show manual page for command', action: () => executeCommand('man') },
    ];

    const argCommands = [
        { cmd: 'status', desc: 'Show Operation B.A.N.U. status', action: () => executeCommand('status') },
        { cmd: 'scan', desc: 'Scan for systems and files', action: () => executeCommand('scan') },
        { cmd: 'decrypt [file]', desc: 'Decrypt encrypted files', clickable: false },
        { cmd: 'gunzip [file]', desc: 'Decompress gzip files', clickable: false },
        { cmd: 'base64decode [file]', desc: 'Decode base64 data', clickable: false },
        { cmd: 'combine', desc: 'Combine fragments', action: () => executeCommand('combine') },
        { cmd: 'ssh [user@host]', desc: 'Connect via SSH', clickable: false },
        { cmd: 'telnet [host] [port]', desc: 'Connect via Telnet', clickable: false },
        { cmd: 'steghide extract -sf [file]', desc: 'Extract hidden data', clickable: false },
        { cmd: 'curl [url]', desc: 'Transfer data from server', clickable: false },
        { cmd: 'ledger', desc: 'View blockchain ledger', action: () => executeCommand('ledger') },
        { cmd: 'sha256sum [file]', desc: 'Calculate file hash', clickable: false },
        { cmd: 'recover', desc: 'Recover master data', action: () => executeCommand('recover') },
        { cmd: 'cat [file]', desc: 'View file contents', clickable: false },
        { cmd: 'file [file]', desc: 'Determine file type', clickable: false },
    ];

    const commandColWidth = 25;
    let output: CommandOutput = ['Available commands:'];

    // Basic commands
    basicCommands.forEach((item, index) => {
        const padding = '\u00A0'.repeat(Math.max(1, commandColWidth - item.cmd.length));
        output.push(
            <div key={`help-basic-${item.cmd}-${index}`}>
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

    // ARG commands (only show if ARG is active)
    if (argState.isActive) {
        output.push('');
        output.push('=== Operation B.A.N.U. Commands ===');
        
        argCommands.forEach((item, index) => {
            const padding = '\u00A0'.repeat(Math.max(1, commandColWidth - item.cmd.length));
            output.push(
                <div key={`help-arg-${item.cmd}-${index}`}>
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
        
        if (!argState.isAuthenticated) {
            output.push('');
            output.push(<span key="help-auth-note" className="warning-message">Note: Authentication required for ARG commands. Use "echo override" or provide passphrase.</span>);
        }
    } else {
        output.push('');
    }

    return output;
};

// List directory contents (available pages)
const ls: CommandFunction = (_args, _executeCommand, navigate): CommandOutput => {
    // If ARG is active, show ARG file system instead of pages
    if (argState.isActive) {
        if (!argState.isAuthenticated) {
            return [<span key="ls-auth" className="error-message">ls: Permission denied. Authentication required.</span>];
        }
        
        // Show discovered files based on scan progress
        if (!argState.discoveries.has('hidden_files') && !argState.discoveries.has('basic_scan')) {
            return [
                'ls: No files discovered yet.',
                'Try running "scan" first to discover available files.',
            ];
        }
        
        const basicFiles = ['system.log', 'encrypted_data.txt'];
        const hiddenFiles = ['fragment1.gz', 'fragment2.b64', 'banu_key.pem', 'steganography.jpg', 'blockchain.json'];
        
        let availableFiles = [];
        
        // Always show basic files after basic scan
        if (argState.discoveries.has('basic_scan')) {
            availableFiles.push(...basicFiles);
        }
        
        // Add hidden files after deep scan
        if (argState.discoveries.has('hidden_files')) {
            availableFiles.push(...hiddenFiles);
        }
        
        return [
            'Available files:',
            ...availableFiles.map(f => `  ${f}`)
        ];
    }
    
    // Default behavior: show portfolio pages
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



// Helper function to check if command should show ARG hint
// @ts-ignore
const shouldShowArgHint = (command: string): boolean => {
    return !argState.isActive && ['echo', 'cat', 'ls', 'pwd'].includes(command);
};

// Helper function to create man page content
const createManPage = (command: string, synopsis: string, description: string, examples: string[] = []): CommandOutput => {
    return [
        `${command.toUpperCase()}(1)                    User Commands                    ${command.toUpperCase()}(1)`,
        '',
        'NAME',
        `       ${command} - ${synopsis}`,
        '',
        'DESCRIPTION',
        `       ${description}`,
        '',
        ...(examples.length > 0 ? [
            'EXAMPLES',
            ...examples.map(ex => `       ${ex}`),
            ''
        ] : []),
        `${command.toUpperCase()}(1)                    User Commands                    ${command.toUpperCase()}(1)`,
    ];
};

// ARG Commands Implementation

// Echo command - Entry point for ARG
const echo: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (args.length === 0) {
        return [<span key="echo-usage" className="error-message">usage: echo [string ...]</span>];
    }
    
    const input = args.join(' ');
    
    // ARG Entry Point
    if (input === 'open.banu') {
        if (!argState.isActive) {
            argState.isActive = true;
            return [
                <span key="echo-banu-init" className="success-message">:: Operation B.A.N.U. Protocol Activated ::</span>,
                '',
                '┌─────────────────────────────────────────────────────┐',
                '│              CLASSIFIED ACCESS SYSTEM               │',
                '│                                                     │',
                '│  ██████╗  █████╗ ███╗   ██╗██╗   ██╗                │',
                '│  ██╔══██╗██╔══██╗████╗  ██║██║   ██║                │',
                '│  ██████╔╝███████║██╔██╗ ██║██║   ██║                │',
                '│  ██╔══██╗██╔══██║██║╚██╗██║██║   ██║                │',
                '│  ██████╔╝██║  ██║██║ ╚████║╚██████╔╝                │',
                '│  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝                 │',
                '│                                                     │',
                '│         Blockchain Archive Network Unit             │',
                '└─────────────────────────────────────────────────────┘',
                '',
                <span key="echo-warning" className="warning-message">⚠️  UNAUTHORIZED ACCESS DETECTED ⚠️</span>,
                '',
                'This system contains classified materials related to',
                'Operation B.A.N.U. - a digital archaeological expedition',
                'to recover lost blockchain archives.',
                '',
                'Authentication required to proceed.',
                'Enter passphrase or type "override" for emergency access.',
                '',
                <span key="echo-banu-hint" className="info-message">💡 New to the system? Try "man echo" for guidance.</span>,
            ];
        } else {
            return ['Operation B.A.N.U. already active. Status: ' + (argState.isAuthenticated ? 'AUTHENTICATED' : 'PENDING AUTHENTICATION')];
        }
    }
    
    // Regular echo functionality fails if ARG not active
    if (!argState.isActive) {
        return [
            <span key="echo-fail" className="error-message">echo: command failed</span>,
            <span key="echo-hint" className="info-message">Try "man echo" for help with this command.</span>
        ];
    }
    
    // ARG is active - check for authentication
    if (input === 'override' && argState.isActive && !argState.isAuthenticated) {
        argState.isAuthenticated = true;
        argState.currentLevel = 1;
        argState.networkStatus = 'connected';
        return [
            <span key="echo-override" className="success-message">Override accepted. Welcome to Operation B.A.N.U.</span>,
            '',
            'System access granted. Network status: CONNECTED',
            'Current clearance level: 1',
            '',
            'Available ARG commands: scan, decrypt, man [command]',
            'Type "help" to see all available commands.',
        ];
    }
    
    if (input === puzzleSolutions.passphrase && argState.isActive && !argState.isAuthenticated) {
        argState.isAuthenticated = true;
        argState.currentLevel = 2;
        argState.networkStatus = 'connected';
        return [
            <span key="echo-auth" className="success-message">Passphrase accepted. Full access granted.</span>,
            '',
            'System access granted. Network status: CONNECTED',
            'Current clearance level: 2',
            '',
            'Full ARG command suite unlocked.',
            'Type "help" to see all available commands.',
        ];
    }
    
    // Normal echo if authenticated
    if (argState.isAuthenticated) {
        return [input];
    }
    
    return [<span key="echo-auth-req" className="error-message">Authentication required. Provide passphrase or use "override".</span>];
};

// Man command - shows manual pages
const man: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (args.length === 0) {
        return ['What manual page do you want?'];
    }
    
    const command = args[0].toLowerCase();
    
    switch (command) {
        case 'echo':
            return createManPage(
                'echo',
                'display a line of text',
                'Echo the STRINGs to standard output.\n\n       NOTE: This implementation contains experimental B.A.N.U. protocol handlers.\n       If standard echo fails, the system may be running in restricted mode.\n\n       SPECIAL SEQUENCES:\n           open.banu    - Activate Operation B.A.N.U. protocol',
                [
                    'echo Hello World',
                    'echo open.banu # DO NOT RUN THIS FOR THE LOVE OF GOD'
                ]
            );
        case 'scan':
            if (!argState.isActive) return ['No manual entry for scan'];
            return createManPage(
                'scan',
                'network and system scanner',
                'Scan for available systems, open ports, and discoverable resources.\n\n       The scan command is part of the Operation B.A.N.U. toolkit and requires\n       active authentication. It can discover hidden files, network services,\n       and system vulnerabilities.',
                [
                    'scan',
                    'scan --network',
                    'scan --deep'
                ]
            );
        case 'decrypt':
            if (!argState.isActive) return ['No manual entry for decrypt'];
            return createManPage(
                'decrypt',
                'decrypt encrypted files and data',
                'Decrypt files using various algorithms including ROT13, Caesar cipher,\n       and other classical encryption methods.\n\n       This tool is part of the Operation B.A.N.U. cryptographic suite.',
                [
                    'decrypt [filename]',
                    'decrypt encrypted_data.txt'
                ]
            );
        case 'gunzip':
            if (!argState.isActive) return ['No manual entry for gunzip'];
            return createManPage(
                'gunzip',
                'decompress files',
                'Decompress files compressed with gzip compression.',
                ['gunzip [filename]']
            );
        case 'base64decode':
            if (!argState.isActive) return ['No manual entry for base64decode'];
            return createManPage(
                'base64decode',
                'decode base64 encoded data',
                'Decode data encoded with base64 encoding.',
                ['base64decode [filename]']
            );
        case 'combine':
            if (!argState.isActive) return ['No manual entry for combine'];
            return createManPage(
                'combine',
                'combine fragments into complete data',
                'Combine multiple data fragments into a complete message or file.',
                ['combine']
            );
        case 'ssh':
            if (!argState.isActive) return ['No manual entry for ssh'];
            return createManPage(
                'ssh',
                'secure shell remote login',
                'Connect to remote systems using secure shell protocol.',
                [
                    'ssh user@hostname',
                    'ssh admin@192.168.1.100'
                ]
            );
        case 'telnet':
            if (!argState.isActive) return ['No manual entry for telnet'];
            return createManPage(
                'telnet',
                'user interface to TELNET protocol',
                'Connect to remote systems using telnet protocol.',
                ['telnet hostname port']
            );
        case 'steghide':
            if (!argState.isActive) return ['No manual entry for steghide'];
            return createManPage(
                'steghide',
                'extract hidden data from images',
                'Extract embedded text or data from image files using steganographic methods.\n\n       This tool is part of the Operation B.A.N.U. digital forensics suite.',
                [
                    'steghide extract -sf [image_file]',
                    'steghide extract -sf steganography.jpg'
                ]
            );
        case 'curl':
            if (!argState.isActive) return ['No manual entry for curl'];
            return createManPage(
                'curl',
                'transfer data from server',
                'Transfer data from or to a server using HTTP, HTTPS, or other protocols.\n\n       Part of the Operation B.A.N.U. network toolkit.',
                [
                    'curl [URL]',
                    'curl http://10.0.0.50/api/vault'
                ]
            );
        case 'ledger':
            if (!argState.isActive) return ['No manual entry for ledger'];
            return createManPage(
                'ledger',
                'blockchain ledger viewer',
                'View Operation B.A.N.U. blockchain ledger entries and transaction history.',
                ['ledger']
            );
        case 'sha256sum':
            if (!argState.isActive) return ['No manual entry for sha256sum'];
            return createManPage(
                'sha256sum',
                'calculate SHA-256 hash',
                'Calculate and verify SHA-256 checksums of files.',
                [
                    'sha256sum [filename]',
                    'sha256sum banu_key.pem'
                ]
            );
        case 'recover':
            if (!argState.isActive) return ['No manual entry for recover'];
            return createManPage(
                'recover',
                'recover master data',
                'Initiate master data recovery sequence for Operation B.A.N.U.\n\n       Requires completion of all prerequisite puzzles.',
                ['recover']
            );
        case 'status':
            if (!argState.isActive) return ['No manual entry for status'];
            return createManPage(
                'status',
                'show Operation B.A.N.U. status',
                'Display current status of Operation B.A.N.U. including progress,\n       authentication status, and completed puzzles.',
                ['status']
            );
        case 'cat':
            if (!argState.isActive) return ['No manual entry for cat'];
            return createManPage(
                'cat',
                'display file contents',
                'Display the contents of files in the Operation B.A.N.U. file system.\n\n       Note: Encrypted and binary files require special handling.',
                [
                    'cat [filename]',
                    'cat system.log'
                ]
            );
        case 'file':
            if (!argState.isActive) return ['No manual entry for file'];
            return createManPage(
                'file',
                'determine file type',
                'Determine the type of files in the system.',
                [
                    'file [filename]',
                    'file encrypted_data.txt'
                ]
            );
        case 'ls':
            if (!argState.isActive) {
                return createManPage(
                    'ls',
                    'list directory contents',
                    'List available portfolio pages for navigation.',
                    ['ls']
                );
            }
            return createManPage(
                'ls',
                'list files in Operation B.A.N.U. file system',
                'List discovered files in the Operation B.A.N.U. file system.\n\n       Shows different files based on scan discoveries:\n       - Basic files after running "scan"\n       - Hidden files after running "scan --deep"\n\n       Requires authentication to access ARG file system.',
                [
                    'ls',
                    'ls -la'
                ]
            );
        default:
            return [`No manual entry for ${command}`];
    }
};

// Scan command - discovers ARG content
const scan: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) {
        return [<span key="scan-auth" className="error-message">scan: Permission denied. Authentication required.</span>];
    }
    
    const option = args[0] || '';
    
    if (option === '--network') {
        argState.discoveries.add('remote_systems');
        return [
            'Scanning network topology...',
            '',
            'Discovered systems:',
            '  192.168.1.100   - SSH (port 22) [ENCRYPTED]',
            '  192.168.1.127   - Telnet (port 23) [LEGACY]',
            '  10.0.0.50       - HTTP (port 80) [WEB SERVICE]',
            '',
            'Use "ssh" or "telnet" commands to connect.',
        ];
    }
    
    if (option === '--deep') {
        argState.discoveries.add('hidden_files');
        return [
            'Performing deep system scan...',
            '',
            'Hidden files discovered:',
            '  /system/encrypted_data.txt',
            '  /tmp/fragment1.gz',
            '  /cache/fragment2.b64',
            '  /keys/banu_key.pem',
            '  /images/steganography.jpg',
            '  /blockchain/blockchain.json',
            '',
            'Use appropriate tools to access these files.',
        ];
    }
    
    // Default scan
    argState.discoveries.add('basic_scan');
    return [
        'Scanning local system...',
        '',
        'Available files:',
        '  system.log',
        '  encrypted_data.txt',
        '',
        'Available tools:',
        '  decrypt, gunzip, base64decode, combine',
        '',
        'Run "scan --network" or "scan --deep" for more information.',
    ];
};

// Decrypt command
const decrypt: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) {
        return [<span key="decrypt-auth" className="error-message">decrypt: Permission denied.</span>];
    }
    
    if (args.length === 0) {
        return ['Usage: decrypt [filename]'];
    }
    
    const filename = args[0];
    const file = argFileSystem.get(filename);
    
    if (!file) {
        return [`decrypt: ${filename}: File not found`];
    }
    
    if (filename === 'encrypted_data.txt') {
        // ROT13 encrypted
        const decrypted = file.content.replace(/[A-Za-z]/g, (c) => {
            const code = c.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + 13) % 26) + base);
        });
        argState.decryptedFiles.set(filename, decrypted);
        argState.completedPuzzles.add('rot13');
        return [
            'Decrypting using ROT13 algorithm...',
            '',
            `Decrypted content: ${decrypted}`,
        ];
    }
    
    return [`decrypt: Unable to decrypt ${filename}. Try different decryption methods.`];
};

// Additional ARG commands
const gunzip: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="gunzip-auth" className="error-message">gunzip: Permission denied.</span>];
    
    if (args.length === 0) return ['Usage: gunzip [filename]'];
    
    const filename = args[0];
    if (filename === 'fragment1.gz') {
        // Simulated decompression
        const decompressed = 'Fragment 1: The secret lies in combining all pieces.';
        argState.decryptedFiles.set('fragment1.txt', decompressed);
        argState.completedPuzzles.add('gunzip');
        return [
            'Decompressing fragment1.gz...',
            `Extracted: fragment1.txt`,
            `Content: ${decompressed}`,
        ];
    }
    
    return [`gunzip: ${filename}: Not a valid gzip file.`];
};

const base64decode: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="b64-auth" className="error-message">base64decode: Permission denied.</span>];
    
    if (args.length === 0) return ['Usage: base64decode [filename]'];
    
    const filename = args[0];
    if (filename === 'fragment2.b64') {
        try {
            const file = argFileSystem.get(filename);
            if (file) {
                const decoded = atob(file.content);
                argState.decryptedFiles.set('fragment2.txt', decoded);
                argState.completedPuzzles.add('base64');
                return [
                    'Decoding base64 data...',
                    `Decoded content: ${decoded}`,
                ];
            }
        } catch (e) {
            return ['base64decode: Invalid base64 data'];
        }
    }
    
    return [`base64decode: ${filename}: File not found or invalid format.`];
};

const combine: CommandFunction = (_args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="combine-auth" className="error-message">combine: Permission denied.</span>];
    
    const fragments = Array.from(argState.decryptedFiles.keys()).filter(f => f.startsWith('fragment'));
    
    if (fragments.length < 2) {
        return [
            'combine: Insufficient fragments. Need at least 2 fragments.',
            'Available fragments: ' + fragments.join(', '),
        ];
    }
    
    const combinedMessage = puzzleSolutions.combinedMessage;
    argState.completedPuzzles.add('combine');
    argState.combinedFragments = fragments;
    
    return [
        'Combining fragments...',
        '',
        'Combined message:',
        combinedMessage,
        '',
        'Next step: Use advanced tools to locate the digital vault.',
    ];
};

const ssh: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="ssh-auth" className="error-message">ssh: Permission denied.</span>];
    
    if (args.length === 0) return ['Usage: ssh user@hostname'];
    
    const target = args[0];
    if (target === 'admin@192.168.1.100') {
        argState.sshSessions.set('192.168.1.100', { user: 'admin', host: '192.168.1.100', connected: true });
        argState.completedPuzzles.add('ssh');
        return [
            'Connecting to 192.168.1.100...',
            'Warning: Remote host identification has changed!',
            'Connection established.',
            '',
            'Welcome to BANU Secure Server',
            'Last login: Mon Dec 25 09:15:23 2024',
            '',
            'Available commands: ls, cat, exit',
            'Type "exit" to disconnect.',
        ];
    }
    
    return [`ssh: connect to host ${target.split('@')[1] || target} port 22: Connection refused`];
};

const telnet: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="telnet-auth" className="error-message">telnet: Permission denied.</span>];
    
    if (args.length < 2) return ['Usage: telnet hostname port'];
    
    const hostname = args[0];
    const port = args[1];
    
    if (hostname === '192.168.1.127' && port === '23') {
        argState.completedPuzzles.add('telnet');
        return [
            'Trying 192.168.1.127...',
            'Connected to 192.168.1.127.',
            'Escape character is \'^]\'.',
            '',
            'LEGACY SYSTEM ACCESS',
            'Enter access code: [Type any string to continue]',
            '',
            'Access granted. Type "exit" to disconnect.',
        ];
    }
    
    return [`telnet: Unable to connect to remote host: Connection refused`];
};

const steghide: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="steg-auth" className="error-message">steghide: Permission denied.</span>];
    
    if (args.length === 0) return ['Usage: steghide extract -sf [filename]'];
    
    if (args.includes('steganography.jpg')) {
        const hiddenData = 'The_final_coordinates_are_37.7749_-122.4194';
        argState.completedPuzzles.add('steganography');
        argState.recoveredData.set('coordinates', hiddenData);
        return [
            'extracting data from "steganography.jpg"...',
            'Enter passphrase: [auto-detected]',
            'wrote extracted data to "hidden_message.txt".',
            '',
            `Hidden message: ${hiddenData.replace(/_/g, ' ')}`,
        ];
    }
    
    return ['steghide: could not extract any data with that passphrase!'];
};

const curl: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="curl-auth" className="error-message">curl: Permission denied.</span>];
    
    if (args.length === 0) return ['Usage: curl [URL]'];
    
    const url = args[0];
    if (url.includes('10.0.0.50') || url.includes('api/vault')) {
        argState.completedPuzzles.add('api_access');
        return [
            `Connecting to ${url}...`,
            '',
            'HTTP/1.1 200 OK',
            'Content-Type: application/json',
            '',
            '{"status":"vault_located","coordinates":"37.7749,-122.4194","key_required":"BANU_MASTER_KEY_2024"}',
        ];
    }
    
    return [`curl: (7) Failed to connect to ${url}: Connection refused`];
};

const ledger: CommandFunction = (_args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="ledger-auth" className="error-message">ledger: Permission denied.</span>];
    
    // Add blockchain entries
    const entries = [
        { timestamp: '2024-01-01T00:00:00Z', entry: 'Operation B.A.N.U. Genesis Block', hash: 'a1b2c3d4e5f6' },
        { timestamp: '2024-01-15T12:30:00Z', entry: 'Vault coordinates encrypted', hash: 'b2c3d4e5f6a1' },
        { timestamp: '2024-02-01T09:15:00Z', entry: 'Master key generated', hash: 'c3d4e5f6a1b2' },
    ];
    
    argState.ledgerEntries = entries;
    argState.completedPuzzles.add('blockchain');
    
    return [
        'Blockchain Ledger - Operation B.A.N.U.',
        '',
        'Block | Timestamp          | Entry                      | Hash',
        '------|--------------------|-----------------------------|-------------',
        ...entries.map((entry, i) => 
            `${i + 1}     | ${entry.timestamp} | ${entry.entry.padEnd(27)} | ${entry.hash}`
        ),
        '',
        'Total blocks: ' + entries.length,
    ];
};

const sha256sum: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="sha-auth" className="error-message">sha256sum: Permission denied.</span>];
    
    if (args.length === 0) return ['Usage: sha256sum [filename]'];
    
    const filename = args[0];
    // Simulate hash verification
    const hashes: Record<string, string> = {
        'banu_key.pem': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        'system.log': 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
    };
    
    if (hashes[filename]) {
        argState.completedPuzzles.add('integrity_check');
        return [`${hashes[filename]}  ${filename}`];
    }
    
    return [`sha256sum: ${filename}: No such file or directory`];
};

const recover: CommandFunction = (_args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) return [<span key="recover-auth" className="error-message">recover: Permission denied.</span>];
    
    const requiredPuzzles = ['rot13', 'gunzip', 'base64', 'combine', 'steganography'];
    const completed = requiredPuzzles.filter(p => argState.completedPuzzles.has(p));
    
    if (completed.length < requiredPuzzles.length) {
        return [
            'recover: Insufficient data recovered.',
            `Completed: ${completed.length}/${requiredPuzzles.length}`,
            'Missing: ' + requiredPuzzles.filter(p => !argState.completedPuzzles.has(p)).join(', '),
        ];
    }
    
    argState.completedPuzzles.add('master_recovery');
    return [
        'Initiating master data recovery...',
        '',
        '🎯 OPERATION B.A.N.U. COMPLETE 🎯',
        '',
        'All fragments recovered and combined.',
        'Digital vault located at coordinates: 37.7749,-122.4194',
        'Master key: BANU_MASTER_KEY_2024',
        '',
        '🎉 Congratulations! You have successfully completed Operation B.A.N.U.!',
        '',
        'Thank you for exploring this Alternate Reality Game embedded in my portfolio.',
        'Your persistence and problem-solving skills are exactly what I bring to',
        'cybersecurity challenges in the real world.',
        '',
        'Feel free to explore the rest of my portfolio or connect with me!',
    ];
};

// Status command to show ARG progress
const status: CommandFunction = (_args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isActive) {
        return ['No active operations. Try "echo open.banu" to begin.'];
    }
    
    return [
        '=== Operation B.A.N.U. Status ===',
        '',
        `Active: ${argState.isActive}`,
        `Authenticated: ${argState.isAuthenticated}`,
        `Clearance Level: ${argState.currentLevel}`,
        `Network: ${argState.networkStatus}`,
        '',
        `Completed Puzzles: ${argState.completedPuzzles.size}`,
        `Discoveries: ${argState.discoveries.size}`,
        `Decrypted Files: ${argState.decryptedFiles.size}`,
        '',
        'Recent Activity:',
        ...(Array.from(argState.completedPuzzles).slice(-3).map(p => `  - ${p}`)),
    ];
};

// Additional ARG commands for file system interaction

// Cat command - view file contents
const cat: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) {
        return [<span key="cat-auth" className="error-message">cat: Permission denied. Authentication required.</span>];
    }
    
    if (args.length === 0) {
        return ['Usage: cat [filename]'];
    }
    
    const filename = args[0];
    const file = argFileSystem.get(filename);
    
    if (!file) {
        return [`cat: ${filename}: No such file or directory`];
    }
    
    if (file.type === 'encrypted') {
        return [
            `cat: ${filename}: File appears to be encrypted`,
            'Try using the "decrypt" command instead.',
        ];
    }
    
    if (file.type === 'binary') {
        return [
            `cat: ${filename}: Binary file (use appropriate tools)`,
            'For images, try "steghide extract -sf [filename]"',
        ];
    }
    
    return [
        `=== ${filename} ===`,
        '',
        file.content,
        '',
        `=== End of ${filename} ===`,
    ];
};

// Enhanced ls command for ARG file system
const argLs: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) {
        return [<span key="ls-auth" className="error-message">ls: Permission denied. Authentication required.</span>];
    }
    
    const option = args[0] || '';
    const longFormat = option === '-la' || option === '-l';
    
    if (!argState.discoveries.has('hidden_files') && !argState.discoveries.has('basic_scan')) {
        return [
            'ls: No files discovered yet.',
            'Try running "scan" first to discover available files.',
        ];
    }
    
    const availableFiles = Array.from(argFileSystem.keys());
    
    if (longFormat) {
        return [
            'total ' + availableFiles.length,
            ...availableFiles.map(filename => {
                const file = argFileSystem.get(filename)!;
                const size = file.content.length;
                const type = file.type === 'text' ? '-rw-r--r--' : 
                            file.type === 'binary' ? '-rwxr-xr-x' :
                            file.type === 'encrypted' ? '-rw-------' : '-rw-r--r--';
                const date = 'Dec 25 09:15';
                return `${type} 1 user user ${size.toString().padStart(8)} ${date} ${filename}`;
            })
        ];
    }
    
    return [
        'Available files:',
        ...availableFiles.map(f => `  ${f}`)
    ];
};

// File command - determine file type
const file: CommandFunction = (args, _executeCommand, _navigate): CommandOutput => {
    if (!argState.isAuthenticated) {
        return [<span key="file-auth" className="error-message">file: Permission denied.</span>];
    }
    
    if (args.length === 0) {
        return ['Usage: file [filename]'];
    }
    
    const filename = args[0];
    const fileData = argFileSystem.get(filename);
    
    if (!fileData) {
        return [`file: ${filename}: No such file or directory`];
    }
    
    const typeDescriptions = {
        'text': 'ASCII text',
        'binary': 'JPEG image data, JFIF standard',
        'encrypted': 'data (encrypted)',
        'compressed': 'gzip compressed data'
    };
    
    return [`${filename}: ${typeDescriptions[fileData.type] || 'unknown file type'}`];
};

// Export all commands
export const commands: Record<string, CommandFunction> = {
    // Basic commands
    neofetch,
    help,
    ls,
    goto,
    echo,
    man,
    status,
    
    // ARG File System Commands
    cat,
    file,
    
    // ARG Specialized Commands  
    scan,
    decrypt,
    gunzip,
    base64decode,
    combine,
    ssh,
    telnet,
    steghide,
    curl,
    ledger,
    sha256sum,
    recover,
    
    // ARG file system ls (alternative command)
    'ls-arg': argLs,
};

// Handles unrecognized commands with helpful error message
export const unknownCommand = (command: string): CommandOutput => {
    return [
        <span key={`err-${command}`} className="error-message">Command not found: {command}</span>,
        "Type 'help' for available commands."
    ];
};