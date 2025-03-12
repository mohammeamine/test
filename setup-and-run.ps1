# Script to set up the database and run the backend

Write-Host "Setting up the School Management System..." -ForegroundColor Green

# Make sure we're in the right directory
Set-Location -Path $PSScriptRoot

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed or not in PATH. Please install Node.js and try again." -ForegroundColor Red
    exit 1
}

# Check for MySQL
try {
    # This might not work if MySQL isn't in PATH, which is common
    $mysqlVersion = mysql --version
    Write-Host "MySQL version: $mysqlVersion" -ForegroundColor Green
} catch {
    Write-Host "Warning: Could not verify MySQL installation. Make sure MySQL is running." -ForegroundColor Yellow
}

# Install dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Green
Set-Location -Path "$PSScriptRoot\backend"
npm install

# Create and set up the database
Write-Host "Creating database schema..." -ForegroundColor Green
node db/setup.js

Write-Host "Seeding the database with sample data..." -ForegroundColor Green
node db/seed.js

# Start the backend server
Write-Host "Starting the backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-Command", "cd '$PSScriptRoot\backend'; npm run dev" -WindowStyle Normal

# Give the server time to start
Start-Sleep -Seconds 3

# Open the API tester
Write-Host "Opening API tester in browser..." -ForegroundColor Green
Invoke-Item "$PSScriptRoot\api-tester.html"

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Backend server is running at http://localhost:3001" -ForegroundColor Green
Write-Host "API tester is now open in your browser" -ForegroundColor Green
Write-Host "Default login: student@example.com / password123" -ForegroundColor Cyan

# Keep the script running
Write-Host "Press Ctrl+C to exit..." -ForegroundColor Yellow
while ($true) { Start-Sleep -Seconds 1 } 