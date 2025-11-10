# Multiple GitHub Accounts Setup Guide

This guide explains how to set up a repository to work with a different GitHub account than your global Git configuration.

## 1. Configure Local Git User
Set the local Git configuration for this repository (different from global):
```powershell
git config --local user.name "your-second-github-username"
git config --local user.email "your-second-email@example.com"
```

## 2. Create SSH Key for Second Account
Generate a new SSH key specifically for the second GitHub account:
```powershell
ssh-keygen -t ed25519 -C "your-second-email@example.com" -f ~/.ssh/id_ed25519_object_undefined
```

## 3. Set Up SSH Config
Create or edit `~/.ssh/config` file with multiple GitHub profiles:
```
# Default GitHub account
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa

# Second GitHub account
Host github-object-undefined
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_object_undefined
```

## 4. Add SSH Key to GitHub
1. Copy the public key content:
```powershell
Get-Content ~/.ssh/id_ed25519_object_undefined.pub
```
2. Add this key to your second GitHub account:
   - Go to GitHub.com (logged in as second account)
   - Navigate to Settings > SSH and GPG keys
   - Click "New SSH key"
   - Paste the public key content

## 5. Update Repository Remote URL
Change the repository's remote URL to use the second account's SSH configuration:
```powershell
git remote set-url origin git@github-object-undefined:object-undefined-repo/nestjs-idempotency.git
```

## 6. Verify Configuration
Check that everything is set up correctly:
```powershell
# Verify local Git config
git config --local --list | Select-String "user.name|user.email"

# Verify remote URL
git remote -v
```

## Testing
Try pushing to verify the setup:
```powershell
git push -u origin main
```

## Notes
- This configuration only affects this repository
- Other repositories will continue using the global Git configuration
- The SSH config allows both GitHub accounts to coexist
- Each push from this repository will use the second account's credentials

## Troubleshooting
If you get a "permission denied" error:
1. Ensure the SSH key is added to the correct GitHub account
2. Check the SSH config file syntax
3. Verify the remote URL uses the correct Host from SSH config
4. Test SSH connection: `ssh -T git@github-object-undefined`