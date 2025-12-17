# Script to generate 200 fake commits with minor changes
# These changes are cosmetic and don't affect functionality

$commitMessages = @(
    "Update spacing",
    "Adjust formatting",
    "Refine comments",
    "Minor text update",
    "Code cleanup",
    "Improve readability",
    "Update documentation",
    "Adjust indentation",
    "Polish UI text",
    "Refine labels",
    "Update placeholder text",
    "Improve comments",
    "Adjust whitespace",
    "Minor refinement",
    "Code style update",
    "Text adjustment",
    "Update wording",
    "Formatting update",
    "Clean up spacing",
    "Refine text"
)

$readmeChanges = @(
    "# CustomerHub",
    "# CustomerHub - CRM",
    "# CustomerHub",
    "# CustomerHub - Customer Management",
    "# CustomerHub"
)

$comments = @(
    "// Minor update",
    "// Small change",
    "// Refinement",
    "// Update",
    "// Adjustment"
)

Write-Host "Starting to generate 200 commits..." -ForegroundColor Green
Write-Host ""

for ($i = 1; $i -le 200; $i++) {
    $messageIndex = $i % $commitMessages.Count
    $message = $commitMessages[$messageIndex] + " #$i"
    
    # Make different types of small changes
    $changeType = $i % 5
    
    switch ($changeType) {
        0 {
            # Update README.md header
            $readmeIndex = $i % $readmeChanges.Count
            $newContent = $readmeChanges[$readmeIndex]
            Set-Content -Path "README.md" -Value $newContent
        }
        1 {
            # Add/remove a comment in a temp file
            $commentIndex = $i % $comments.Count
            $tempContent = $comments[$commentIndex]
            Set-Content -Path ".commit-temp" -Value $tempContent
        }
        2 {
            # Update README with extra newlines
            $content = Get-Content -Path "README.md" -Raw
            if ($i % 2 -eq 0) {
                Set-Content -Path "README.md" -Value ($content + "`n")
            } else {
                Set-Content -Path "README.md" -Value $content.TrimEnd()
            }
        }
        3 {
            # Add timestamp to temp file
            Set-Content -Path ".commit-temp" -Value "Updated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        }
        4 {
            # Alternate README content
            if ($i % 2 -eq 0) {
                Set-Content -Path "README.md" -Value "# CustomerHub`n`nCustomer Management System"
            } else {
                Set-Content -Path "README.md" -Value "# CustomerHub`n`nCustomer Management System`n"
            }
        }
    }
    
    # Stage and commit
    git add -A | Out-Null
    git commit -m $message | Out-Null
    
    # Progress indicator
    if ($i % 10 -eq 0) {
        Write-Host "Progress: $i/200 commits created" -ForegroundColor Cyan
    }
}

# Clean up temp file
if (Test-Path ".commit-temp") {
    Remove-Item ".commit-temp" -Force
    git add -A | Out-Null
    git commit -m "Clean up temporary files" | Out-Null
}

# Reset README to a clean state
Set-Content -Path "README.md" -Value "# CustomerHub`n`nCustomer Management System built with Next.js, TypeScript, and Drizzle ORM."
git add README.md | Out-Null
git commit -m "Finalize documentation" | Out-Null

Write-Host ""
Write-Host "Successfully created 201 commits!" -ForegroundColor Green
Write-Host ""
Write-Host "Run 'git log --oneline -20' to see recent commits" -ForegroundColor Yellow
