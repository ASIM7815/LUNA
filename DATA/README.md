# DATA Folder - PDF Files Setup

This folder contains all the PDF files referenced by the website's navigation buttons (NAAC, AQAR, etc.).

## Folder Structure

The folder structure has been automatically created based on the React app's code references:

```
DATA/
├── AQAR/          # AQAR documents (48 files)
├── NAAC/          # NAAC documents (60 files)
├── CO/            # Course Outcomes (7 files)
├── HNS/           # HNS documents (4 files)
├── Publications/  # Publications (1 file)
├── Research/      # Research documents (3 files)
├── Syllabus/      # Syllabus documents (1 file)
└── Other files    # Various policy and program documents
```

## How to Populate This Folder

### Step 1: Download PDFs from Google Drive

1. Open the Google Drive folder: https://drive.google.com/drive/folders/1tFfFui9M_xjxow3mJwsPUoiJpLcg7daW
2. Download all PDF files from the Drive folder
3. The filenames in Drive should match the filenames needed by the website

### Step 2: Place Files in Correct Folders

Match the downloaded files to their correct locations. For example:

- `1.1.2.pdf` from Drive → `DATA/AQAR/1/1.1.2.pdf`
- `1.1.1AdditionalInformation.pdf` from Drive → `DATA/NAAC/1/1.1.1/1.1.1AdditionalInformation.pdf`
- `cse.pdf` from Drive → `DATA/CO/cse.pdf`

### Step 3: Verify Files

Run the verification script to check if all files are in place:

```bash
python3 download_pdfs_from_drive.py
```

## Total Files Needed

- **126 PDF files** total
- All folder structures are already created
- Just need to place the PDF files in the correct locations

## Important Notes

1. **File names must match exactly** - The React app looks for specific filenames
2. **Folder structure is case-sensitive** - Keep the exact folder names (NAAC, AQAR, etc.)
3. **PDFs are viewable only** - The website displays PDFs in iframes, not downloadable
4. **GitHub hosting** - Make sure to commit and push the DATA folder to GitHub

## After Setup

Once all files are in place:

1. Commit the DATA folder to git:
   ```bash
   git add DATA/
   git commit -m "Add DATA folder with PDF files"
   git push
   ```

2. The navigation buttons (NAAC, AQAR, DVV, IQAC, etc.) will automatically work
3. Users can view PDFs directly in the browser

## Troubleshooting

If a button doesn't work:
1. Check if the PDF file exists in the correct location
2. Verify the filename matches exactly (case-sensitive)
3. Check browser console for 404 errors
4. Run the verification script to see missing files
