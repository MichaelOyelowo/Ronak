# Simple PowerShell JSON-LD validator for common schema checks
Get-ChildItem -Path . -Filter *.html | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content -Raw -Path $file -ErrorAction SilentlyContinue
    if (-not $content) { return }
    $pattern = @'
<script[^>]+type=["']application/ld\+json["'][^>]*>(.*?)</script>
'@
    $opts = [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    $matches = [regex]::Matches($content, $pattern, $opts)
    if ($matches.Count -eq 0) { return }
    for ($i=0; $i -lt $matches.Count; $i++) {
        $blk = $matches[$i].Groups[1].Value.Trim()
        try {
            $json = $blk | ConvertFrom-Json -ErrorAction Stop
        } catch {
            Write-Output "ERROR: $file | Block $($i+1) | JSON parse error: $($_.Exception.Message)"
            continue
        }
        $nodes = @()
        if ($json -is [System.Array]) { $nodes = $json } else { $nodes = ,$json }
        foreach ($n in $nodes) {
            $type = $n.'@type'
            if (-not $type) { Write-Output "WARN: $file | Block $($i+1) | missing @type"; continue }
            switch ($type) {
                'Product' {
                    if (-not $n.name) { Write-Output "WARN: $file | Block $($i+1) | Product missing name" }
                    if (-not $n.image) { Write-Output "WARN: $file | Block $($i+1) | Product missing image" }
                    if (-not $n.offers) { Write-Output "WARN: $file | Block $($i+1) | Product missing offers" }
                    else {
                        if (-not $n.offers.price -or -not $n.offers.priceCurrency) { Write-Output "WARN: $file | Block $($i+1) | Product.offers missing price or priceCurrency" }
                    }
                }
                'FAQPage' {
                    if (-not $n.mainEntity) { Write-Output "WARN: $file | Block $($i+1) | FAQPage missing mainEntity" }
                }
                'LocalBusiness' { if (-not $n.address.streetAddress) { Write-Output "WARN: $file | Block $($i+1) | LocalBusiness missing address.streetAddress" } }
                'WebSite' { if (-not $n.potentialAction) { Write-Output "WARN: $file | Block $($i+1) | WebSite missing potentialAction" } }
                'BreadcrumbList' { if (-not $n.itemListElement) { Write-Output "WARN: $file | Block $($i+1) | BreadcrumbList missing itemListElement" } }
                'CollectionPage' { if (-not $n.mainEntity) { Write-Output "WARN: $file | Block $($i+1) | CollectionPage missing mainEntity" } }
                default { Write-Output "OK: $file | Block $($i+1) | Type: $type" }
            }
        }
    }
}
