# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a Windows CMD bootstrap script (`install.cmd`) for installing Claude Code in environments where PowerShell is not available.

## Usage

```cmd
install.cmd [stable|latest|VERSION]
```

Examples:
- `install.cmd` - Install stable version
- `install.cmd latest` - Install latest version
- `install.cmd 1.0.58` - Install specific version

## Architecture

The `install.cmd` script performs the following:
1. Validates architecture (requires 64-bit Windows)
2. Downloads the stable version manifest from Google Cloud Storage
3. Parses the JSON manifest to extract the platform-specific checksum
4. Downloads the binary for `win32-x64` platform
5. Verifies the SHA256 checksum using `certutil`
6. Runs `claude install` to set up the launcher and shell integration

Key constants:
- GCS bucket: `https://storage.googleapis.com/claude-code-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/claude-code-releases`
- Download directory: `%USERPROFILE%\.claude\downloads`
- Platform: `win32-x64`

Dependencies: `curl` (for downloads), `certutil` (for checksum verification)

## Development Rules

- TypeScriptファイルに新しい関数を追加したら、必ずVitestでテストコードを書くこと
