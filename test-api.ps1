# Start the backend server in the background
Start-Process powershell -ArgumentList "-Command", "cd '$PSScriptRoot'; ./run-backend.ps1" -WindowStyle Normal

# Wait a moment for the server to start
Start-Sleep -Seconds 2

# Open the API tester in the default browser
Start-Process "http://localhost:3001"
Invoke-Item "$PSScriptRoot\api-tester.html"

Write-Host "API Server and Tester are started."
Write-Host "Press Ctrl+C to exit the script."

# Keep the script running
while ($true) {
    Start-Sleep -Seconds 1
} 