#!/bin/bash

echo "=================================="
echo "URL VERIFICATION REPORT"
echo "=================================="
echo ""

FILE="/home/newuser/LUNA/static/js/main.64d07445.js"

echo "📁 File: $FILE"
echo "📅 Last Modified: $(stat -c %y "$FILE" | cut -d'.' -f1)"
echo "📊 File Size: $(du -h "$FILE" | cut -f1)"
echo ""

echo "-----------------------------------"
echo "✅ CORRECT URLs (with 'the.')"
echo "-----------------------------------"
COUNT_THE=$(grep -o 'https://the\.islec\.edu\.in/' "$FILE" | wc -l)
echo "Total: $COUNT_THE URLs"
echo ""
echo "Sample URLs:"
grep -o 'https://the\.islec\.edu\.in/[^"]*' "$FILE" | head -10
echo ""

echo "-----------------------------------"
echo "❌ BROKEN URLs (missing 'the.')"
echo "-----------------------------------"
COUNT_BROKEN=$(grep -o 'https://islec\.edu\.in/' "$FILE" 2>/dev/null | wc -l || echo "0")
echo "Total: $COUNT_BROKEN URLs"
if [ "$COUNT_BROKEN" -gt 0 ]; then
    echo "Sample broken URLs:"
    grep -o 'https://islec\.edu\.in/[^"]*' "$FILE" | head -5
else
    echo "✅ No broken URLs found!"
fi
echo ""

echo "-----------------------------------"
echo "🔍 SPECIFIC IMAGE CHECKS"
echo "-----------------------------------"
echo "CSE HOD Image:"
grep -o 'src: "[^"]*csehod[^"]*"' "$FILE" | head -1
echo ""
echo "Infrastructure Images:"
grep -o 'src: "[^"]*Infrastructure/[a-z0-9]*\.jpg"' "$FILE" | head -3
echo ""

echo "=================================="
echo "CONCLUSION"
echo "=================================="
if [ "$COUNT_BROKEN" -eq 0 ]; then
    echo "✅ All URLs are correctly formatted!"
    echo "✅ File was updated successfully!"
    echo ""
    echo "If images still don't show in browser:"
    echo "  1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)"
    echo "  2. Clear browser cache completely"
    echo "  3. Try in incognito/private window"
else
    echo "⚠️  Found $COUNT_BROKEN broken URLs that need fixing"
fi
echo "=================================="
