#!/bin/bash

# Script to help organize PDFs from a download folder into the DATA structure
# Usage: ./organize_pdfs.sh /path/to/downloaded/pdfs

if [ -z "$1" ]; then
    echo "Usage: ./organize_pdfs.sh /path/to/downloaded/pdfs"
    echo "Example: ./organize_pdfs.sh ~/Downloads/DATA_PDFs"
    exit 1
fi

SOURCE_DIR="$1"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Directory $SOURCE_DIR does not exist"
    exit 1
fi

echo "=========================================="
echo "PDF Organization Script"
echo "=========================================="
echo "Source directory: $SOURCE_DIR"
echo "Target directory: $(pwd)/DATA"
echo ""

# Function to find and copy a file
copy_if_exists() {
    local filename="$1"
    local target_path="$2"
    
    # Search for the file in source directory (case-insensitive)
    local found_file=$(find "$SOURCE_DIR" -iname "$filename" -type f | head -n 1)
    
    if [ -n "$found_file" ]; then
        cp "$found_file" "$target_path"
        echo "✓ Copied: $filename → $target_path"
        return 0
    else
        echo "✗ Missing: $filename"
        return 1
    fi
}

# Counter for statistics
total=0
copied=0
missing=0

# Read the PDF list and copy files
while IFS= read -r pdf_path; do
    total=$((total + 1))
    filename=$(basename "$pdf_path")
    
    if copy_if_exists "$filename" "$pdf_path"; then
        copied=$((copied + 1))
    else
        missing=$((missing + 1))
    fi
done < <(python3 -c "
import sys
PDF_FILES = [
    'DATA/AQAR/1/1.1.2.pdf',
    'DATA/AQAR/1/1.4.1.pdf',
    'DATA/AQAR/1/1.4.2.pdf',
    'DATA/AQAR/2/2.2.1.pdf',
    'DATA/AQAR/2/2.2.2.pdf',
    'DATA/AQAR/2/2.3.1.pdf',
    'DATA/AQAR/2/2.3.2.pdf',
    'DATA/AQAR/2/2.3.3.pdf',
    'DATA/AQAR/2/2.5.1.pdf',
    'DATA/AQAR/2/2.5.2.pdf',
    'DATA/AQAR/2/2.6.1.pdf',
    'DATA/AQAR/2/2.6.2.pdf',
    'DATA/AQAR/2/2.6.3.pdf',
    'DATA/AQAR/3/3.1.1.pdf',
    'DATA/AQAR/3/3.1.2.pdf',
    'DATA/AQAR/3/3.1.3.pdf',
    'DATA/AQAR/3/3.2.1.pdf',
    'DATA/AQAR/3/3.2.2.pdf',
    'DATA/AQAR/3/3.3.2.pdf',
    'DATA/AQAR/3/3.3.3.pdf',
    'DATA/AQAR/3/3.3.4.pdf',
    'DATA/AQAR/3/3.4.1.pdf',
    'DATA/AQAR/3/3.4.2.pdf',
    'DATA/AQAR/4/4.1.1.pdf',
    'DATA/AQAR/4/4.1.2.pdf',
    'DATA/AQAR/4/4.1.3.pdf',
    'DATA/AQAR/4/4.2.1.pdf',
    'DATA/AQAR/5/5.1.1.pdf',
    'DATA/AQAR/5/5.1.2.pdf',
    'DATA/AQAR/5/5.1.3.pdf',
    'DATA/AQAR/5/5.1.4.pdf',
    'DATA/AQAR/5/5.1.5.pdf',
    'DATA/AQAR/5/5.2.1.pdf',
    'DATA/AQAR/5/5.2.2.pdf',
    'DATA/AQAR/5/5.3.2.pdf',
    'DATA/AQAR/5/5.3.3.pdf',
    'DATA/AQAR/5/5.4.1.pdf',
    'DATA/AQAR/5/5.4.2.pdf',
    'DATA/AQAR/6/6.1.1.pdf',
    'DATA/AQAR/6/6.1.2.pdf',
    'DATA/AQAR/6/6.2.1.pdf',
    'DATA/AQAR/6/6.2.2.pdf',
    'DATA/AQAR/6/6.3.1.pdf',
    'DATA/AQAR/6/6.3.5.pdf',
    'DATA/AQAR/6/6.4.1.pdf',
    'DATA/AQAR/6/6.5.1.pdf',
    'DATA/AQAR/6/6.5.2.pdf',
    'DATA/AQAR/6/6.5.3.pdf',
    'DATA/awarenessProgram.pdf',
    'DATA/CO/ce.pdf',
    'DATA/CO/cse.pdf',
    'DATA/CO/ece.pdf',
    'DATA/CO/eee.pdf',
    'DATA/CO/hns.pdf',
    'DATA/CO/it.pdf',
    'DATA/CO/me.pdf',
    'DATA/Course/ece.pdf',
    'DATA/CSE.pdf',
    'DATA/events/ece.pdf',
    'DATA/G.R.pdf',
    'DATA/HNS/1.pdf',
    'DATA/HNS/2.pdf',
    'DATA/HNS/3.pdf',
    'DATA/HNS/4.pdf',
    'DATA/hrpolicy.pdf',
    'DATA/IT.pdf',
    'DATA/minutesofMeeting.pdf',
    'DATA/NAAC/1/1.1.1/1.1.1AdditionalInformation.pdf',
    'DATA/NAAC/1/1.2.1/1.2.1AdditionalInformation.pdf',
    'DATA/NAAC/1/1.2.2/1.2.2SupportingDoc.pdf',
    'DATA/NAAC/1/1.3.1/1.3.1AdditionalInformation.pdf',
    'DATA/NAAC/1/1.3.2/1.3.2SupportingDoc.pdf',
    'DATA/NAAC/1/1.4.1/1.4.1SupportingDoc.pdf',
    'DATA/NAAC/2/2.1.1/2.1.1SupportingDoc.pdf',
    'DATA/NAAC/2/2.1.2/2.1.2SupportingDoc.pdf',
    'DATA/NAAC/2/2.3.1/2.3.1AdditionalDoc.pdf',
    'DATA/NAAC/2/2.4.1/2.4.1SupportingDoc.pdf',
    'DATA/NAAC/2/2.4.2/2.4.2SupportingDoc.pdf',
    'DATA/NAAC/2/2.5.1/2.5.1AdditionalInformation.pdf',
    'DATA/NAAC/2/2.6.1/2.6.1AdditionalInformationDoc.pdf',
    'DATA/NAAC/2/2.6.2/2.6.2SupportingDoc.pdf',
    'DATA/NAAC/3/3.1.1/3.1.1SupportingDoc.pdf',
    'DATA/NAAC/3/3.2.1/3.2.1AdditionalDoc.pdf',
    'DATA/NAAC/3/3.2.2/3.2.2SupportingDoc.pdf',
    'DATA/NAAC/3/3.3.1/3.3.1SupportingDoc.pdf',
    'DATA/NAAC/3/3.3.2/3.3.2SupportingDoc.pdf',
    'DATA/NAAC/3/3.4.1/3.4.1AdditionalInformation.pdf',
    'DATA/NAAC/3/3.4.2/3.4.2AdditionalInformation.pdf',
    'DATA/NAAC/3/3.4.3/3.4.3SupportingDoc.pdf',
    'DATA/NAAC/3/3.5.1/3.5.1SupportingDoc.pdf',
    'DATA/NAAC/4/4.1.1/4.1.1AdditionalInformation.pdf',
    'DATA/NAAC/4/4.1.2/4.1.2SupportingDoc.pdf',
    'DATA/NAAC/4/4.2.1/4.2.1AdditionalDoc.pdf',
    'DATA/NAAC/4/4.3.1/4.3.1AdditionalInformation.pdf',
    'DATA/NAAC/4/4.3.2/4.3.2SupportingDoc.pdf',
    'DATA/NAAC/4/4.4.1/4.4.1.SupportingDoc.pdf',
    'DATA/NAAC/5/5.1.1/5.1.1SupportingDoc.pdf',
    'DATA/NAAC/5/5.1.2/5.1.2SupportingDoc.pdf',
    'DATA/NAAC/5/5.1.3/5.1.3SupportingDoc.pdf',
    'DATA/NAAC/5/5.1.4/5.1.4SupportingDoc.pdf',
    'DATA/NAAC/5/5.2.1/5.2.1SupportingDoc.pdf',
    'DATA/NAAC/5/5.2.2/5.2.2SupportingDoc.pdf',
    'DATA/NAAC/5/5.3.1/5.3.1SupportingDoc.pdf',
    'DATA/NAAC/5/5.3.2/5.3.2SupportingDoc.pdf',
    'DATA/NAAC/5/5.4.1/5.4.1AdditionalInformation.pdf',
    'DATA/NAAC/6/6.1.1/6.1.1AdditionalInformationDoc.pdf',
    'DATA/NAAC/6/6.2.1/6.2.1AdditionalInformationDoc.pdf',
    'DATA/NAAC/6/6.2.2/6.2.2SuppportingDoc.pdf',
    'DATA/NAAC/6/6.3.1/6.3.1AdditionalInformation.pdf',
    'DATA/NAAC/6/6.3.2/6.3.2SupportingDoc.pdf',
    'DATA/NAAC/6/6.3.3/6.3.3SupportingDoc.pdf',
    'DATA/NAAC/6/6.4.1/6.4.1AdditionalInformation.pdf',
    'DATA/NAAC/6/6.5.1/6.5.1AdditionalInformation.pdf',
    'DATA/NAAC/6/6.5.2/6.5.2SupportingDoc.pdf',
    'DATA/NAAC/7/7.1.1/7.1.1AdditionalDoc.pdf',
    'DATA/NAAC/7/7.1.2/7.1.2SupportingDoc.pdf',
    'DATA/NAAC/7/7.1.3/7.1.3SupportingDoc.pdf',
    'DATA/NAAC/7/7.1.4/7.1.4AdditionalInformationDoc.pdf',
    'DATA/NAAC/7/7.2.1/7.2.1.Best_Practices.pdf',
    'DATA/NAAC/7/7.3.1/7.3.1Distinctiveness.pdf',
    'DATA/NISP_Policy.pdf',
    'DATA/Publications/ECE_PUBLICATIONS.pdf',
    'DATA/Research/Kapila.pdf',
    'DATA/Research/RnD-External_Sponsorship.pdf',
    'DATA/Research/RnD-Policy.pdf',
    'DATA/Syllabus/MTECH/Syllabus.pdf'
]
for pdf in PDF_FILES:
    print(pdf)
")

echo ""
echo "=========================================="
echo "Summary:"
echo "=========================================="
echo "Total files needed: $total"
echo "Successfully copied: $copied"
echo "Missing files: $missing"
echo ""

if [ $missing -eq 0 ]; then
    echo "✅ All files copied successfully!"
    echo "Run 'python3 download_pdfs_from_drive.py' to verify"
else
    echo "⚠️  Some files are still missing"
    echo "Check the output above for missing files"
fi
