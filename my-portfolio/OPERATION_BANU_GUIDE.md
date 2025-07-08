# Operation B.A.N.U. - Terminal ARG Documentation

## Overview

Operation B.A.N.U. (Blockchain Archive Network Unit) is a hidden Alternate Reality Game (ARG) embedded within the portfolio's terminal interface. This multi-layered puzzle system tests problem-solving skills, pattern recognition, and cybersecurity knowledge.

## Entry Point

The ARG is discoverable only through terminal exploration:

1. **Misleading Echo**: Try `echo hello` - it will fail
2. **Discovery**: Run `man echo` for hints
3. **Activation**: Execute `echo open.banu` to begin
4. **Authentication**: Use `override` for limited access or discover the passphrase

## ARG Structure

### Level 1: Basic Authentication
- **Entry**: `echo open.banu`
- **Access**: `override` (emergency access) or passphrase discovery
- **Unlocks**: Basic scanning and file discovery tools

### Level 2: File Discovery & Decryption
**Available Commands:**
- `scan` - Discover hidden files and systems
- `decrypt [filename]` - Decrypt encrypted files
- `cat [filename]` - View file contents
- `file [filename]` - Determine file types

**Objectives:**
- Discover encrypted files using `scan`
- Decrypt ROT13-encoded data
- Find hidden message fragments

### Level 3: Data Processing
**Available Commands:**
- `gunzip [filename]` - Decompress gzip files
- `base64decode [filename]` - Decode base64 data
- `combine` - Merge recovered fragments

**Objectives:**
- Process different encoding formats
- Combine fragments into meaningful data
- Discover network targets

### Level 4: Network Exploration
**Available Commands:**
- `ssh [user@host]` - Connect to remote systems
- `telnet [host] [port]` - Legacy network connections
- `curl [url]` - Web requests and API calls

**Objectives:**
- Connect to discovered systems
- Navigate simulated network environments
- Gather intelligence from remote sources

### Level 5: Digital Forensics
**Available Commands:**
- `steghide extract -sf [file]` - Extract hidden data from images
- `sha256sum [filename]` - Verify file integrity
- `ledger` - View blockchain transaction history

**Objectives:**
- Extract steganographic data
- Verify cryptographic hashes
- Analyze blockchain records

### Level 6: Master Recovery
**Available Commands:**
- `recover` - Initiate final data recovery sequence

**Objectives:**
- Complete all prerequisite puzzles
- Recover the master archive
- Unveil the complete Operation B.A.N.U. narrative

## Command Reference

### Basic Commands
- `help` - Show all available commands (changes based on ARG status)
- `man [command]` - Detailed manual pages for each command
- `status` - View current ARG progress and authentication status
- `ls` - List available files (shows portfolio pages normally, ARG files when authenticated)

### ARG-Specific Commands
All ARG commands require authentication and become available progressively:

| Command | Purpose | Example |
|---------|---------|---------|
| `scan` | System discovery | `scan --network`, `scan --deep` |
| `decrypt` | File decryption | `decrypt encrypted_data.txt` |
| `gunzip` | Decompression | `gunzip fragment1.gz` |
| `base64decode` | Base64 decoding | `base64decode fragment2.b64` |
| `combine` | Fragment assembly | `combine` |
| `ssh` | Secure connections | `ssh admin@192.168.1.100` |
| `telnet` | Legacy connections | `telnet 192.168.1.127 23` |
| `steghide` | Steganography | `steghide extract -sf image.jpg` |
| `curl` | HTTP requests | `curl http://10.0.0.50/api/vault` |
| `ledger` | Blockchain data | `ledger` |
| `sha256sum` | Hash verification | `sha256sum filename` |
| `recover` | Final sequence | `recover` |

## Puzzle Solutions Guide

### Entry Puzzle
- **Problem**: `echo` command fails
- **Solution**: Use `man echo` to discover `echo open.banu`

### Authentication
- **Emergency Access**: `echo override`
- **Full Access**: Discover the passphrase through exploration

### File System Navigation
- Use `scan` to discover files
- Use `ls` to list discovered files (shows different files based on scan level)
- Use `cat` to view readable files
- Use `file` to determine file types
- Use appropriate tools for each file format

### Decryption Sequence
1. **ROT13**: Use `decrypt` on text files
2. **Gzip**: Use `gunzip` on .gz files
3. **Base64**: Use `base64decode` on .b64 files
4. **Combine**: Use `combine` to merge fragments

### Network Exploration
1. Use `scan --network` to discover systems
2. Connect using `ssh` or `telnet` as appropriate
3. Follow leads to web services with `curl`

### Final Recovery
1. Complete all prerequisite puzzles
2. Gather all fragments and data
3. Use `recover` to complete the ARG

## Technical Implementation

- **Fully Browser-Based**: No external tools or downloads required
- **In-Memory File System**: Simulated files and directories
- **Progressive Disclosure**: Commands unlock based on story progression
- **Contextual Help**: Every command includes detailed man pages
- **State Persistence**: Progress maintained during session

## Easter Eggs & Advanced Features

- Multiple authentication paths
- Hidden commands and flags
- ASCII art and terminal animations
- Realistic system responses and error messages
- Blockchain and cryptographic themes

## Completion Rewards

Successfully completing Operation B.A.N.U. reveals:
- The complete narrative arc
- Behind-the-scenes ARG development insights
- A demonstration of problem-solving methodology
- Portfolio creator's approach to complex challenges

---

**Note**: This ARG is designed to showcase cybersecurity skills, creative problem-solving, and technical implementation abilities. All puzzles are solvable with patience and logical thinking.
