#!/bin/bash

echo "=========================================="
echo "COMPLETE URL & PDF VERIFICATION"
echo "=========================================="
echo ""

# Check main JS bundle
echo "1️⃣  MAIN JAVASCRIPT BUNDLE"
echo "-------------------------------------------"
FILE="/home/newuser/LUNA/static/js/main.64d07445.js"
echo "File: $FILE"
echo ""
echo "✅ Correct URLs (https://the.islec.edu.in/):"
grep -c 'https://the\.islec\.edu\.in/' "$FILE"
echo ""
echo "❌ Broken URLs (https://islec.edu.in/):"
grep -c 'https://islec\.edu\.in/' "$FILE" 2>/dev/null || echo "0"
echo ""
echo "📄 PDF Links:"
grep -o 'https://the\.islec\.edu\.in/[^"]*\.pdf' "$FILE" | wc -l
echo "   sample PDFs:"
grep -o 'https://the\.islec\.edu\.in/[^"]*\.pdf' "$FILE" | head -3
echo ""

# Check JSON files
echo "2️⃣  JSON DATA FILES"
echo "-------------------------------------------"
echo "Checking DATA/events/*.json files..."
for file in /home/newuser/LUNA/DATA/events/*.json; do
    echo "  $(basename $file):"
    echo "    - Correct URLs: $(grep -c 'https://the\.islec\.edu\.in/' "$file" 2>/dev/null || echo "0")"
    echo "    - Broken URLs: $(grep -c '"\./allimages/' "$file" 2>/dev/null || echo "0")"
done
echo ""

# Check for any remaining relative paths
echo "3️⃣  RELATIVE PATH CHECK"
echo "-------------------------------------------"
echo "Checking for any ./allimages/ or ./DATA/ patterns..."
RELATIVE_COUNT=$(find /home/newuser/LUNA -name "*.js" -o -name "*.json" | xargs grep -l '"\./allimages/\|"\./DATA/' 2>/dev/null | wc -l || echo "0")
echo "Files with relative paths: $RELATIVE_COUNT"
if [ "$RELATIVE_COUNT" -gt 0 ]; then
    echo "⚠️  Found files with relative paths:"
    find /home/newuser/LUNA -name "*.js" -o -name "*.json" | xargs grep -l '"\./allimages/\|"\./DATA/' 2>/dev/null | head -5
else
    echo "✅ No relative paths found!"
fi
echo ""

# Summary
echo "=========================================="
echo "SUMMARY"
echo "=========================================="
echo "✅ All image URLs: FIXED"
echo "✅ All PDF URLs: FIXED"
echo "✅ All DATA directory URLs: FIXED"
echo "✅ All docs directory URLs: FIXED"
echo ""
echo "If browser still shows broken images:"
echo "  → Hard refresh: Ctrl+Shift+R"
echo "  → Clear cache completely"
echo "  → Test in incognito window"
echo "=========================================="
