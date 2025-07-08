# Operation B.A.N.U. - Complete Step-by-Step Walkthrough

## 🎯 **Prerequisites**
- Access to the portfolio terminal interface
- Basic familiarity with command-line operations
- Patience and problem-solving mindset

---

## 📋 **Step-by-Step Command Guide**

### **PHASE 1: Discovery & Entry**

#### Step 1: Discover the ARG Exists
```bash
> echo hello
```
**Expected Output:** 
```
echo: command failed
Try "man echo" for help with this command.
```

#### Step 2: Read the Manual
```bash
> man echo
```
**Expected Output:**
```
ECHO(1)                    User Commands                   ECHO(1)

NAME
       echo - display a line of text

SYNOPSIS
       echo [STRING]...

DESCRIPTION
       Echo the STRING(s) to standard output.

       NOTE: This implementation contains experimental B.A.N.U. protocol handlers.
       If standard echo fails, the system may be running in restricted mode.

       SPECIAL SEQUENCES:
           open.banu    - Activate Operation B.A.N.U. protocol
           override     - Emergency access (limited clearance)
           [passphrase] - Full system access

EXAMPLES
       echo Hello World
       echo open.banu
       echo override

ECHO(1)                    User Commands                   ECHO(1)
```

#### Step 3: Activate the ARG
```bash
> echo open.banu
```
**Expected Output:**
```
:: Operation B.A.N.U. Protocol Activated ::

┌─────────────────────────────────────────────────────┐
│              CLASSIFIED ACCESS SYSTEM              │
│                                                     │
│  ██████╗  █████╗ ███╗   ██╗██╗   ██╗               │
│  ██╔══██╗██╔══██╗████╗  ██║██║   ██║               │
│  ██████╔╝███████║██╔██╗ ██║██║   ██║               │
│  ██╔══██╗██╔══██║██║╚██╗██║██║   ██║               │
│  ██████╔╝██║  ██║██║ ╚████║╚██████╔╝               │
│  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝                │
│                                                     │
│         Blockchain Archive Network Unit             │
└─────────────────────────────────────────────────────┘

⚠️  UNAUTHORIZED ACCESS DETECTED ⚠️

This system contains classified materials related to
Operation B.A.N.U. - a digital archaeological expedition
to recover lost blockchain archives.

Authentication required to proceed.
Enter passphrase or type "override" for emergency access.

💡 New to the system? Try "man echo" for guidance.
```

---

### **PHASE 2: Authentication**

#### Step 4A: Emergency Access (Quick Path)
```bash
> echo override
```
**Expected Output:**
```
Override accepted. Welcome to Operation B.A.N.U.

System access granted. Network status: CONNECTED
Current clearance level: 1

Available ARG commands: scan, decrypt, man [command]
Type "help" to see all available commands.
```

#### Step 4B: Full Access (Discovery Path)
First, you need to discover the passphrase. It's hidden in the files, so let's get basic access first with override, then work to find it.

```bash
> echo shadow_protocol
```
**Expected Output:**
```
Passphrase accepted. Full access granted.

System access granted. Network status: CONNECTED
Current clearance level: 2

Full ARG command suite unlocked.
Type "help" to see all available commands.
```

#### Step 5: Check Available Commands
```bash
> help
```
**Expected Output:** (Will show expanded command list including ARG commands)

#### Step 6: Check Your Status
```bash
> status
```
**Expected Output:**
```
=== Operation B.A.N.U. Status ===

Active: true
Authenticated: true
Clearance Level: 1 (or 2)
Network: connected

Completed Puzzles: 0
Discoveries: 0
Decrypted Files: 0

Recent Activity:
```

---

### **PHASE 3: File Discovery & Basic Reconnaissance**

#### Step 7: Basic System Scan
```bash
> scan
```
**Expected Output:**
```
Scanning local system...

Available files:
  system.log
  encrypted_data.txt

Available tools:
  decrypt, gunzip, base64decode, combine

Run "scan --network" or "scan --deep" for more information.
```

#### Step 8: Deep System Scan
```bash
> scan --deep
```
**Expected Output:**
```
Performing deep system scan...

Hidden files discovered:
  /system/encrypted_data.txt
  /tmp/fragment1.gz
  /cache/fragment2.b64
  /keys/banu_key.pem
  /images/steganography.jpg
  /blockchain/blockchain.json

Use appropriate tools to access these files.
```

#### Step 9: Network Scan
```bash
> scan --network
```
**Expected Output:**
```
Scanning network topology...

Discovered systems:
  192.168.1.100   - SSH (port 22) [ENCRYPTED]
  192.168.1.127   - Telnet (port 23) [LEGACY]
  10.0.0.50       - HTTP (port 80) [WEB SERVICE]

Use "ssh" or "telnet" commands to connect.
```

#### Step 10: List Discovered Files
```bash
> ls
```
**Expected Output:** (After basic scan)
```
Available files:
  system.log
  encrypted_data.txt
```

**Expected Output:** (After deep scan)
```
Available files:
  system.log
  encrypted_data.txt
  fragment1.gz
  fragment2.b64
  banu_key.pem
  steganography.jpg
  blockchain.json
```

#### Step 11: Examine Available Files
```bash
> cat system.log
```
**Expected Output:**
```
=== system.log ===

System initialization complete. Operation B.A.N.U. protocol active.
Warning: Unauthorized access detected. Implementing countermeasures.
Trace: Connection from 192.168.1.127
Status: CLASSIFIED

=== End of system.log ===
```

#### Step 12: Check File Types
```bash
> file encrypted_data.txt
```
**Expected Output:**
```
encrypted_data.txt: data (encrypted)
```

---

### **PHASE 4: Decryption & Data Processing**

#### Step 13: Decrypt the First File
```bash
> decrypt encrypted_data.txt
```
**Expected Output:**
```
Decrypting using ROT13 algorithm...

Decrypted content: The secret is hidden in the code. Look for the key in the logins.
```

#### Step 14: Process Compressed Fragment
```bash
> gunzip fragment1.gz
```
**Expected Output:**
```
Decompressing fragment1.gz...
Extracted: fragment1.txt
Content: Fragment 1: The secret lies in combining all pieces.
```

#### Step 15: Decode Base64 Fragment
```bash
> base64decode fragment2.b64
```
**Expected Output:**
```
Decoding base64 data...
Decoded content: The first fragment contains: "The operation".
```

#### Step 16: Combine Discovered Fragments
```bash
> combine
```
**Expected Output:**
```
Combining fragments...

Combined message:
The operation requires three fragments to reveal the location of the digital vault.

Next step: Use advanced tools to locate the digital vault.
```

#### Step 17: Check Progress
```bash
> status
```
**Expected Output:**
```
=== Operation B.A.N.U. Status ===

Active: true
Authenticated: true
Clearance Level: 1
Network: connected

Completed Puzzles: 4
Discoveries: 2
Decrypted Files: 3

Recent Activity:
  - rot13
  - gunzip
  - base64
```

---

### **PHASE 5: Network Exploration**

#### Step 18: Connect via SSH
```bash
> ssh admin@192.168.1.100
```
**Expected Output:**
```
Connecting to 192.168.1.100...
Warning: Remote host identification has changed!
Connection established.

Welcome to BANU Secure Server
Last login: Mon Dec 25 09:15:23 2024

Available commands: ls, cat, exit
Type "exit" to disconnect.
```

#### Step 19: Connect via Telnet
```bash
> telnet 192.168.1.127 23
```
**Expected Output:**
```
Trying 192.168.1.127...
Connected to 192.168.1.127.
Escape character is '^]'.

LEGACY SYSTEM ACCESS
Enter access code: [Type any string to continue]

Access granted. Type "exit" to disconnect.
```

#### Step 20: Web Service Discovery
```bash
> curl http://10.0.0.50/api/vault
```
**Expected Output:**
```
Connecting to http://10.0.0.50/api/vault...

HTTP/1.1 200 OK
Content-Type: application/json

{"status":"vault_located","coordinates":"37.7749,-122.4194","key_required":"BANU_MASTER_KEY_2024"}
```

---

### **PHASE 6: Digital Forensics**

#### Step 21: Extract Steganographic Data
```bash
> steghide extract -sf steganography.jpg
```
**Expected Output:**
```
extracting data from "steganography.jpg"...
Enter passphrase: [auto-detected]
wrote extracted data to "hidden_message.txt".

Hidden message: The final coordinates are 37.7749 -122.4194
```

#### Step 22: Verify File Integrity
```bash
> sha256sum banu_key.pem
```
**Expected Output:**
```
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  banu_key.pem
```

#### Step 23: Access Blockchain Ledger
```bash
> ledger
```
**Expected Output:**
```
Blockchain Ledger - Operation B.A.N.U.

Block | Timestamp          | Entry                      | Hash
------|--------------------|-----------------------------|-------------
1     | 2024-01-01T00:00:00Z | Operation B.A.N.U. Genesis Block | a1b2c3d4e5f6
2     | 2024-01-15T12:30:00Z | Vault coordinates encrypted | b2c3d4e5f6a1
3     | 2024-02-01T09:15:00Z | Master key generated        | c3d4e5f6a1b2

Total blocks: 3
```

---

### **PHASE 7: Master Recovery**

#### Step 24: Attempt Final Recovery
```bash
> recover
```
**If all puzzles completed, Expected Output:**
```
Initiating master data recovery...

🎯 OPERATION B.A.N.U. COMPLETE 🎯

All fragments recovered and combined.
Digital vault located at coordinates: 37.7749,-122.4194
Master key: BANU_MASTER_KEY_2024

🎉 Congratulations! You have successfully completed Operation B.A.N.U.!

Thank you for exploring this Alternate Reality Game embedded in my portfolio.
Your persistence and problem-solving skills are exactly what I bring to
cybersecurity challenges in the real world.

Feel free to explore the rest of my portfolio or connect with me!
```

**If puzzles incomplete, Expected Output:**
```
recover: Insufficient data recovered.
Completed: X/5
Missing: [list of missing puzzle types]
```

---

### **PHASE 8: Additional Exploration**

#### Step 25: Review Complete Status
```bash
> status
```
**Expected Output:**
```
=== Operation B.A.N.U. Status ===

Active: true
Authenticated: true
Clearance Level: 2
Network: connected

Completed Puzzles: 12
Discoveries: 3
Decrypted Files: 5

Recent Activity:
  - steganography
  - blockchain
  - master_recovery
```

#### Step 26: Explore Additional Commands
Try various combinations and explore:
- Different `scan` options
- `file` command on different files
- `man` pages for all commands
- Alternative connection targets

---

## 🎯 **Success Indicators**

You've successfully completed Operation B.A.N.U. when:

1. ✅ **ARG Activated**: `echo open.banu` works
2. ✅ **Authenticated**: Either override or passphrase accepted
3. ✅ **Files Discovered**: All hidden files found via scanning
4. ✅ **Fragments Decoded**: ROT13, gzip, and base64 all processed
5. ✅ **Network Explored**: SSH, Telnet, and HTTP connections made
6. ✅ **Forensics Complete**: Steganography and hash verification done
7. ✅ **Blockchain Accessed**: Ledger entries reviewed
8. ✅ **Master Recovery**: Final `recover` command succeeds

---

## 💡 **Tips & Troubleshooting**

- **Stuck?** Use `help` and `man [command]` frequently
- **Can't authenticate?** Try the passphrase: `shadow_protocol`
- **Missing files?** Run `scan --deep` and `scan --network`
- **Commands not working?** Check if you're authenticated with `status`
- **Want to restart?** Refresh the page to reset ARG state

---

## 🏆 **Achievement Unlocked**

Completing this ARG demonstrates:
- **Problem-solving skills**
- **Attention to detail**
- **Persistence and methodology**
- **Basic cybersecurity knowledge**
- **Command-line proficiency**

These are exactly the skills that make for effective cybersecurity professionals!
