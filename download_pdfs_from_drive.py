#!/usr/bin/env python3
"""
Script to download PDFs from Google Drive and place them in the correct DATA folder structure.
The folder structure has already been created.

Instructions:
1. Install required package: pip install gdown
2. Make sure you have the Google Drive folder link with edit/view permissions
3. Run this script: python3 download_pdfs_from_drive.py

Note: You'll need to manually download files from Google Drive and place them in the correct folders
since the Drive API requires authentication. This script provides the mapping.
"""

import os

# List of all PDF files needed (extracted from the React app code)
PDF_FILES = [
    "DATA/AQAR/1/1.1.2.pdf",
    "DATA/AQAR/1/1.4.1.pdf",
    "DATA/AQAR/1/1.4.2.pdf",
    "DATA/AQAR/2/2.2.1.pdf",
    "DATA/AQAR/2/2.2.2.pdf",
    "DATA/AQAR/2/2.3.1.pdf",
    "DATA/AQAR/2/2.3.2.pdf",
    "DATA/AQAR/2/2.3.3.pdf",
    "DATA/AQAR/2/2.5.1.pdf",
    "DATA/AQAR/2/2.5.2.pdf",
    "DATA/AQAR/2/2.6.1.pdf",
    "DATA/AQAR/2/2.6.2.pdf",
    "DATA/AQAR/2/2.6.3.pdf",
    "DATA/AQAR/3/3.1.1.pdf",
    "DATA/AQAR/3/3.1.2.pdf",
    "DATA/AQAR/3/3.1.3.pdf",
    "DATA/AQAR/3/3.2.1.pdf",
    "DATA/AQAR/3/3.2.2.pdf",
    "DATA/AQAR/3/3.3.2.pdf",
    "DATA/AQAR/3/3.3.3.pdf",
    "DATA/AQAR/3/3.3.4.pdf",
    "DATA/AQAR/3/3.4.1.pdf",
    "DATA/AQAR/3/3.4.2.pdf",
    "DATA/AQAR/4/4.1.1.pdf",
    "DATA/AQAR/4/4.1.2.pdf",
    "DATA/AQAR/4/4.1.3.pdf",
    "DATA/AQAR/4/4.2.1.pdf",
    "DATA/AQAR/5/5.1.1.pdf",
    "DATA/AQAR/5/5.1.2.pdf",
    "DATA/AQAR/5/5.1.3.pdf",
    "DATA/AQAR/5/5.1.4.pdf",
    "DATA/AQAR/5/5.1.5.pdf",
    "DATA/AQAR/5/5.2.1.pdf",
    "DATA/AQAR/5/5.2.2.pdf",
    "DATA/AQAR/5/5.3.2.pdf",
    "DATA/AQAR/5/5.3.3.pdf",
    "DATA/AQAR/5/5.4.1.pdf",
    "DATA/AQAR/5/5.4.2.pdf",
    "DATA/AQAR/6/6.1.1.pdf",
    "DATA/AQAR/6/6.1.2.pdf",
    "DATA/AQAR/6/6.2.1.pdf",
    "DATA/AQAR/6/6.2.2.pdf",
    "DATA/AQAR/6/6.3.1.pdf",
    "DATA/AQAR/6/6.3.5.pdf",
    "DATA/AQAR/6/6.4.1.pdf",
    "DATA/AQAR/6/6.5.1.pdf",
    "DATA/AQAR/6/6.5.2.pdf",
    "DATA/AQAR/6/6.5.3.pdf",
    "DATA/awarenessProgram.pdf",
    "DATA/CO/ce.pdf",
    "DATA/CO/cse.pdf",
    "DATA/CO/ece.pdf",
    "DATA/CO/eee.pdf",
    "DATA/CO/hns.pdf",
    "DATA/CO/it.pdf",
    "DATA/CO/me.pdf",
    "DATA/Course/ece.pdf",
    "DATA/CSE.pdf",
    "DATA/events/ece.pdf",
    "DATA/G.R.pdf",
    "DATA/HNS/1.pdf",
    "DATA/HNS/2.pdf",
    "DATA/HNS/3.pdf",
    "DATA/HNS/4.pdf",
    "DATA/hrpolicy.pdf",
    "DATA/IT.pdf",
    "DATA/minutesofMeeting.pdf",
    "DATA/NAAC/1/1.1.1/1.1.1AdditionalInformation.pdf",
    "DATA/NAAC/1/1.2.1/1.2.1AdditionalInformation.pdf",
    "DATA/NAAC/1/1.2.2/1.2.2SupportingDoc.pdf",
    "DATA/NAAC/1/1.3.1/1.3.1AdditionalInformation.pdf",
    "DATA/NAAC/1/1.3.2/1.3.2SupportingDoc.pdf",
    "DATA/NAAC/1/1.4.1/1.4.1SupportingDoc.pdf",
    "DATA/NAAC/2/2.1.1/2.1.1SupportingDoc.pdf",
    "DATA/NAAC/2/2.1.2/2.1.2SupportingDoc.pdf",
    "DATA/NAAC/2/2.3.1/2.3.1AdditionalDoc.pdf",
    "DATA/NAAC/2/2.4.1/2.4.1SupportingDoc.pdf",
    "DATA/NAAC/2/2.4.2/2.4.2SupportingDoc.pdf",
    "DATA/NAAC/2/2.5.1/2.5.1AdditionalInformation.pdf",
    "DATA/NAAC/2/2.6.1/2.6.1AdditionalInformationDoc.pdf",
    "DATA/NAAC/2/2.6.2/2.6.2SupportingDoc.pdf",
    "DATA/NAAC/3/3.1.1/3.1.1SupportingDoc.pdf",
    "DATA/NAAC/3/3.2.1/3.2.1AdditionalDoc.pdf",
    "DATA/NAAC/3/3.2.2/3.2.2SupportingDoc.pdf",
    "DATA/NAAC/3/3.3.1/3.3.1SupportingDoc.pdf",
    "DATA/NAAC/3/3.3.2/3.3.2SupportingDoc.pdf",
    "DATA/NAAC/3/3.4.1/3.4.1AdditionalInformation.pdf",
    "DATA/NAAC/3/3.4.2/3.4.2AdditionalInformation.pdf",
    "DATA/NAAC/3/3.4.3/3.4.3SupportingDoc.pdf",
    "DATA/NAAC/3/3.5.1/3.5.1SupportingDoc.pdf",
    "DATA/NAAC/4/4.1.1/4.1.1AdditionalInformation.pdf",
    "DATA/NAAC/4/4.1.2/4.1.2SupportingDoc.pdf",
    "DATA/NAAC/4/4.2.1/4.2.1AdditionalDoc.pdf",
    "DATA/NAAC/4/4.3.1/4.3.1AdditionalInformation.pdf",
    "DATA/NAAC/4/4.3.2/4.3.2SupportingDoc.pdf",
    "DATA/NAAC/4/4.4.1/4.4.1.SupportingDoc.pdf",
    "DATA/NAAC/5/5.1.1/5.1.1SupportingDoc.pdf",
    "DATA/NAAC/5/5.1.2/5.1.2SupportingDoc.pdf",
    "DATA/NAAC/5/5.1.3/5.1.3SupportingDoc.pdf",
    "DATA/NAAC/5/5.1.4/5.1.4SupportingDoc.pdf",
    "DATA/NAAC/5/5.2.1/5.2.1SupportingDoc.pdf",
    "DATA/NAAC/5/5.2.2/5.2.2SupportingDoc.pdf",
    "DATA/NAAC/5/5.3.1/5.3.1SupportingDoc.pdf",
    "DATA/NAAC/5/5.3.2/5.3.2SupportingDoc.pdf",
    "DATA/NAAC/5/5.4.1/5.4.1AdditionalInformation.pdf",
    "DATA/NAAC/6/6.1.1/6.1.1AdditionalInformationDoc.pdf",
    "DATA/NAAC/6/6.2.1/6.2.1AdditionalInformationDoc.pdf",
    "DATA/NAAC/6/6.2.2/6.2.2SuppportingDoc.pdf",
    "DATA/NAAC/6/6.3.1/6.3.1AdditionalInformation.pdf",
    "DATA/NAAC/6/6.3.2/6.3.2SupportingDoc.pdf",
    "DATA/NAAC/6/6.3.3/6.3.3SupportingDoc.pdf",
    "DATA/NAAC/6/6.4.1/6.4.1AdditionalInformation.pdf",
    "DATA/NAAC/6/6.5.1/6.5.1AdditionalInformation.pdf",
    "DATA/NAAC/6/6.5.2/6.5.2SupportingDoc.pdf",
    "DATA/NAAC/7/7.1.1/7.1.1AdditionalDoc.pdf",
    "DATA/NAAC/7/7.1.2/7.1.2SupportingDoc.pdf",
    "DATA/NAAC/7/7.1.3/7.1.3SupportingDoc.pdf",
    "DATA/NAAC/7/7.1.4/7.1.4AdditionalInformationDoc.pdf",
    "DATA/NAAC/7/7.2.1/7.2.1.Best_Practices.pdf",
    "DATA/NAAC/7/7.3.1/7.3.1Distinctiveness.pdf",
    "DATA/NISP_Policy.pdf",
    "DATA/Publications/ECE_PUBLICATIONS.pdf",
    "DATA/Research/Kapila.pdf",
    "DATA/Research/RnD-External_Sponsorship.pdf",
    "DATA/Research/RnD-Policy.pdf",
    "DATA/Syllabus/MTECH/Syllabus.pdf"
]

def check_missing_files():
    """Check which files are missing from the DATA folder"""
    missing = []
    existing = []
    
    for pdf_path in PDF_FILES:
        if os.path.exists(pdf_path):
            existing.append(pdf_path)
        else:
            missing.append(pdf_path)
    
    print(f"\n{'='*60}")
    print(f"PDF FILES STATUS")
    print(f"{'='*60}")
    print(f"Total files needed: {len(PDF_FILES)}")
    print(f"Existing files: {len(existing)}")
    print(f"Missing files: {len(missing)}")
    print(f"{'='*60}\n")
    
    if missing:
        print("MISSING FILES:")
        print("-" * 60)
        for file in missing:
            filename = os.path.basename(file)
            print(f"  {file}")
            print(f"    → Look for: {filename} in Google Drive")
        print()
    
    if existing:
        print("\nEXISTING FILES:")
        print("-" * 60)
        for file in existing[:10]:  # Show first 10
            print(f"  ✓ {file}")
        if len(existing) > 10:
            print(f"  ... and {len(existing) - 10} more")
    
    return missing, existing

def generate_download_instructions():
    """Generate instructions for manual download"""
    print("\n" + "="*60)
    print("MANUAL DOWNLOAD INSTRUCTIONS")
    print("="*60)
    print("""
1. Open your Google Drive folder:
   https://drive.google.com/drive/folders/1tFfFui9M_xjxow3mJwsPUoiJpLcg7daW

2. Download all PDFs from the Drive folder

3. Match the filenames from Drive to the paths below and place them accordingly

4. The folder structure is already created in the DATA directory

5. After placing files, run this script again to verify
""")

if __name__ == "__main__":
    print("\n🔍 Checking PDF files in DATA folder...")
    missing, existing = check_missing_files()
    
    if missing:
        generate_download_instructions()
        print("\n⚠️  Please download the missing files from Google Drive")
        print("    and place them in the correct DATA folders.\n")
    else:
        print("\n✅ All PDF files are in place!")
        print("    Your website navigation buttons should now work correctly.\n")
