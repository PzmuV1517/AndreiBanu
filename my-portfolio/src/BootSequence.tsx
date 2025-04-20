import React, { useState, useEffect } from 'react';

const bootMessages = [
  '[0.000000] Initializing cgroup subsys cpu',
  '[0.000001] Linux version 5.15.0-58-generic (buildd@lgw01-amd64-054) (gcc (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #64-Ubuntu SMP Fri Jan 6 11:40:47 UTC 2023 (Ubuntu 5.15.0-58.64-generic 5.15.76)',
  '[0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-58-generic root=UUID=... ro quiet splash $vt_handoff',
  '[0.000000] KERNEL supported cpus: 0-7',
  '[0.000000] x86/fpu: xstate_offset[2]:  576, xstate_sizes[2]:  256',
  '... (more kernel messages) ...',
  '[OK] Reached target Graphical Interface.',
];

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootMessages.length) {
        setMessages((prev) => [...prev, bootMessages[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Delay before transitioning to the main app
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="boot-sequence">
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default BootSequence;