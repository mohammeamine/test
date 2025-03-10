# PowerShell script to run the backend server
Write-Host "Starting backend server..." -ForegroundColor Green

# Change to the backend directory
Set-Location -Path .\backend

# Run the development server
npm run dev

# Return to the original directory when done
Set-Location -Path .. 