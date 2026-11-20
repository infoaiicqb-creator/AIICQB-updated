Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("d:\Canary-All-Project\AICQB\client\public\certificate-stars.png")
$p = $bmp.GetPixel(5, 5)
Write-Host "Corner pixel: A=$($p.A), R=$($p.R), G=$($p.G), B=$($p.B)"

# Find bounds of the stars
$minX = 9999; $maxX = 0; $minY = 9999; $maxY = 0;
for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $px = $bmp.GetPixel($x, $y)
        # Check if non-transparent and not pure white (e.g. golden pixel R>150, B<150, A>50)
        if ($px.A -gt 20 -and ($px.R -lt 250 -or $px.G -lt 250 -or $px.B -lt 250)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Star bounds: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
Write-Host "Star content width: $($maxX - $minX), height: $($maxY - $minY)"
$bmp.Dispose()

