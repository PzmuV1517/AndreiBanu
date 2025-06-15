import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import './App.css'; // Ensure CSS is imported

interface BootSequenceProps {
    onComplete: () => void;
}

// --- GRUB Menu Simulation (remains the same) ---
const grubMenu = `
 GNU GRUB version 2.06

 +-------------------------------------------------------------------+
 | PortfolioOS v1.0 (6.1.0-andrei-generic)                           |
 | PortfolioOS v1.0 - Recovery Mode                                  |
 | Memory Test (memtest86+)                                          |
 |                                                                   |
 |                                                                   |
 |                                                                   |
 |                                                                   |
 |                                                                   |
 |                                                                   |
 +-------------------------------------------------------------------+

      Use the ^ and v keys to select which entry is highlighted.
      Press enter to boot the selected OS, 'e' to edit the commands
      before booting or 'c' for a command-line.


 Booting \`PortfolioOS v1.0 (6.1.0-andrei-generic)\` in 1...
`;

// --- Even more enhanced boot messages ---
const bootMessages = [
    <span>Initializing BIOS... <span className="boot-ok">[ OK ]</span></span>,
    <span><span className="boot-info">[INFO]</span> CPU: Intel(R) Xeon(R) CPU E5-2690 v4 @ 2.60GHz stepping 01</span>,
    <span><span className="boot-info">[INFO]</span> Detected 524288MB RAM</span>,
    <span><span className="boot-info">[INFO]</span> ACPI: LAPIC_NMI (acpi_id[0x01] dflg[0x0011] lint[0x1])</span>,
    <span><span className="boot-info">[INFO]</span> ACPI: LAPIC_NMI (acpi_id[0x02] dflg[0x0011] lint[0x1])</span>,
    <span><span className="boot-info">[INFO]</span> ... (additional ACPI messages) ...</span>,
    <span>Scanning for boot devices...</span>,
    <span><span className="boot-info">[INFO]</span> Found <span className="boot-device">/dev/sda</span> (NVMe SSD - 1TB)</span>,
    <span><span className="boot-info">[INFO]</span> Found <span className="boot-device">/dev/sdb</span> (SATA HDD - 4TB)</span>,
    <span>Attempting boot from <span className="boot-device">/dev/sda</span>...</span>,
    <pre key="grub" className="grub-menu">{grubMenu}</pre>,
    <span>Loading kernel <span className="boot-module">vmlinuz-6.1.0-andrei-generic</span>...</span>,
    <span>Loading initial ramdisk <span className="boot-module">initrd.img-6.1.0-andrei-generic</span>... <span className="boot-ok">[ OK ]</span></span>,
    <span><span className="boot-info">[INFO]</span> Decompressing Linux... Parsing ELF... Done.</span>,
    <span><span className="boot-info">[INFO]</span> Booting the kernel.</span>,
    <span><span className="boot-info">[INFO]</span> PCI: Probing devices...</span>,
    <span><span className="boot-ok">[ OK ]</span> Found device <span className="boot-device">00:02.0 VGA compatible controller</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Found device <span className="boot-device">00:1f.3 SMBus</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Found device <span className="boot-device">01:00.0 Ethernet controller</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Mounted <span className="boot-device">/dev/sda1</span> on <span className="boot-path">/</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Reached target Initrd Root File System.</span>,
    <span><span className="boot-ok">[ OK ]</span> Reached target Basic System.</span>,
    <span><span className="boot-ok">[ OK ]</span> Started <span className="boot-service">udev Kernel Device Manager</span>.</span>,
    <span><span className="boot-info">[INFO]</span> Loading module <span className="boot-module">i915</span>...</span>, // Example graphics module
    <span><span className="boot-ok">[ OK ]</span> Loaded module <span className="boot-module">i915</span>.</span>,
    <span><span className="boot-info">[INFO]</span> Checking filesystems...</span>,
    <span><span className="boot-ok">[ OK ]</span> Filesystem check clean on <span className="boot-device">/dev/sda1</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Mounted <span className="boot-device">/dev/sdb1</span> on <span className="boot-path">/data</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Reached target Local File Systems.</span>,
    <span><span className="boot-ok">[ OK ]</span> Started <span className="boot-service">System Logger</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Started <span className="boot-service">D-Bus System Message Bus</span>.</span>,
    <span><span className="boot-info">[INFO]</span> Starting Network Manager...</span>,
    <span><span className="boot-ok">[ OK ]</span> Started <span className="boot-service">Network Manager</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Reached target Network.</span>,
    <span><span className="boot-ok">[ OK ]</span> Reached target Network is Online.</span>, // Added network online target
    <span><span className="boot-info">[INFO]</span> Starting SSH Server...</span>,
    <span><span className="boot-ok">[ OK ]</span> Started <span className="boot-service">OpenSSH server daemon</span>.</span>,
    <span><span className="boot-info">[INFO]</span> Starting Web Server...</span>,
    <span><span className="boot-ok">[ OK ]</span> Started <span className="boot-service">nginx</span>.</span>,
    <span><span className="boot-info">[INFO]</span> Starting Cron Daemon...</span>,
    <span><span className="boot-ok">[ OK ]</span> Started <span className="boot-service">cron</span>.</span>,
    <span><span className="boot-ok">[ OK ]</span> Reached target Multi-User System.</span>,
    <span><span className="boot-ok">[ OK ]</span> Reached target Graphical Interface (Simulated).</span>,
    <span><span className="boot-info">[INFO]</span> Starting Portfolio Login Service...</span>,
    <span> </span>,
    <span>PortfolioOS v1.0 tty1</span>,
    <span>login: guest (automatic login)</span>,
    <span>Last login: Mon Apr 21 10:30:00 2025 from 192.168.1.101</span>,
    <span> </span>,
    <span>Welcome to PortfolioOS!</span>,
    <span> </span>,
];

// --- BootSequence Component (useEffect and render remain the same) ---
const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [visibleLines, setVisibleLines] = useState<React.ReactNode[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const endOfBootRef = useRef<HTMLDivElement>(null); // Ref for the bottom element
    // Add a ref to track the container element
    const terminalRef = useRef<HTMLDivElement>(null);

    // Effect to add lines and scroll
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        let completionTimeout: NodeJS.Timeout | null = null;

        if (lineIndex < bootMessages.length) {
            // ... (delay calculation logic remains the same) ...
            let delay = Math.random() * 30 + 10;
            const currentMessage = bootMessages[lineIndex];
            if (React.isValidElement(currentMessage) && currentMessage.key === 'grub') {
                delay = 50;
            } else if (typeof currentMessage === 'string' && currentMessage.includes('Booting')) {
                delay = 500;
            } else if (typeof currentMessage === 'string' && currentMessage.includes('login:')) {
                delay = 200;
            }


            timeoutId = setTimeout(() => {
                setVisibleLines(prev => [...prev, bootMessages[lineIndex]]);
                setLineIndex(prev => prev + 1);
                // Scroll after state update (in the next render cycle)
            }, delay);

        } else {
            completionTimeout = setTimeout(onComplete, 150);
        }

        // Cleanup function
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (completionTimeout) clearTimeout(completionTimeout);
        };
    }, [lineIndex, onComplete]); // Dependency array remains the same

    // Effect specifically for scrolling
    useEffect(() => {
        // Scroll to the bottom whenever visibleLines changes
        endOfBootRef.current?.scrollIntoView({ behavior: 'smooth' });
        // Alternatively, use 'auto' for instant scroll:
        // endOfBootRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [visibleLines]); // Run this effect when visibleLines updates

    // Add this useEffect to handle scrolling
    useEffect(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, [visibleLines]); // Assumes visibleLines is your state variable holding the boot sequence text

    return (
        <div className="boot-sequence" ref={terminalRef}>
            {visibleLines.map((line, index) => (
                <div key={`boot-${index}`}>
                    {line}
                </div>
            ))}
            {/* Add an empty div at the end with the ref */}
            <div ref={endOfBootRef} />
        </div>
    );
};

export default BootSequence;