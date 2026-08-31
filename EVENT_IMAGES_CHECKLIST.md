# Event Images Checklist

## ✅ Status: JSON Configuration Complete
All event JSON files are properly configured with correct image URLs pointing to `https://the.islec.edu.in/`

## 📋 Required Images on CDN Server

The following images need to be available on the server at `https://the.islec.edu.in/` for all events to display properly:

### Main Slider Images (2025 Events)

| Event Title | Image URL | File Name |
|-------------|-----------|-----------|
| 2025 Recognition Ceremony | https://the.islec.edu.in/allimages/mainSlider/Recognition25.jpg | Recognition25.jpg |
| 2025 Campus Event - 15 Nov | https://the.islec.edu.in/allimages/mainSlider/15112025.jpg | 15112025.jpg |
| 2025 Campus Event - 23 Oct | https://the.islec.edu.in/allimages/mainSlider/23102025.jpg | 23102025.jpg |
| 2025 Campus Event - 10 Oct | https://the.islec.edu.in/allimages/mainSlider/10102025.jpg | 10102025.jpg |
| 2025 Campus Event - 11 Sep | https://the.islec.edu.in/allimages/mainSlider/11092025.jpg | 11092025.jpg |
| 2025 Campus Event - 19 Aug | https://the.islec.edu.in/allimages/mainSlider/19082025.jpg | 19082025.jpg |
| 2025 Campus Event - 28 Jul | https://the.islec.edu.in/allimages/mainSlider/28072025.jpg | 28072025.jpg |
| 2025 Campus Event - 15 Jul | https://the.islec.edu.in/allimages/mainSlider/15072025.jpg | 15072025.jpg |

### Main Slider Images (2024 Events)

| Event Title | Image URL | File Name |
|-------------|-----------|-----------|
| 2024 Orientation Day | https://the.islec.edu.in/allimages/mainSlider/orientation24.jpeg | orientation24.jpeg |
| 2024 Anti-Ragging Drive | https://the.islec.edu.in/allimages/mainSlider/antiriba2024.jpg | antiriba2024.jpg |
| 2024 Anti-Drug Drive | https://the.islec.edu.in/allimages/mainSlider/antidrug2024.jpg | antidrug2024.jpg |
| 2024 Judo Tournament | https://the.islec.edu.in/allimages/mainSlider/judo2024.jpg | judo2024.jpg |

### Main Slider Images (2023 Events)

| Event Title | Image URL | File Name |
|-------------|-----------|-----------|
| 2023 Hackathon | https://the.islec.edu.in/allimages/mainSlider/hack23.jpg | hack23.jpg |

### Other Event Images

| Event Title | Image URL | File Name |
|-------------|-----------|-----------|
| 2025 Workshop Highlights | https://the.islec.edu.in/allimages/IMG-20250419-WA0006.jpg | IMG-20250419-WA0006.jpg |
| 2025 Outbound Visit | https://the.islec.edu.in/allimages/OUTBI.webp | OUTBI.webp |
| 2024 Industrial Visit | https://the.islec.edu.in/allimages/OUTBI.jpg | OUTBI.jpg |
| 2024 Sports Participation | https://the.islec.edu.in/allimages/sp1.jpg | sp1.jpg |
| 2023 Orientation | https://the.islec.edu.in/allimages/orientation23.jpg | orientation23.jpg |
| 2023 Research Presentation | https://the.islec.edu.in/allimages/rp1.jpg | rp1.jpg |
| 2023 NPTEL Recognition | https://the.islec.edu.in/allimages/nptel1.jpg | nptel1.jpg |
| 2023 Book Publication | https://the.islec.edu.in/allimages/bookpublished.jpg | bookpublished.jpg |
| 2023 T-Hub Visit | https://the.islec.edu.in/allimages/thub.jpg | thub.jpg |
| 2023 E-Cell Visit | https://the.islec.edu.in/allimages/ecell.jpeg | ecell.jpeg |
| 2023 Champions | https://the.islec.edu.in/allimages/Champions.webp | Champions.webp |
| 2023 Sports Awards | https://the.islec.edu.in/allimages/awards23.jpg | awards23.jpg |
| 2022 Enthusiac Event | https://the.islec.edu.in/allimages/enthusiac2022.jpeg | enthusiac2022.jpeg |
| 2022 Eloquence Event | https://the.islec.edu.in/allimages/eloquence2022.jpg | eloquence2022.jpg |
| 2022 Eid Celebration | https://the.islec.edu.in/allimages/eiduladha2022.png | eiduladha2022.png |
| 2022 Certification Workshop | https://the.islec.edu.in/allimages/certi.jpeg | certi.jpeg |
| 2022 FDP | https://the.islec.edu.in/allimages/fdp/fdp1.jpg | fdp/fdp1.jpg |
| 2022 BYJU'S Session | https://the.islec.edu.in/allimages/byjus10.jpeg | byjus10.jpeg |
| 2022 Infosys Connect | https://the.islec.edu.in/allimages/infosys2022.webp | infosys2022.webp |
| 2022 Football Activity | https://the.islec.edu.in/allimages/footc.jpeg | footc.jpeg |
| 2021 Induction Program | https://the.islec.edu.in/allimages/orien2021.jpeg | orien2021.jpeg |
| 2021 Ignite Workshop | https://the.islec.edu.in/allimages/ignite2021.jpeg | ignite2021.jpeg |

### Infrastructure Images

| Event Title | Image URL | File Name |
|-------------|-----------|-----------|
| Classrooms and Labs | https://the.islec.edu.in/allimages/Infrastructure/ca1.jpg | Infrastructure/ca1.jpg |
| Computing Facilities | https://the.islec.edu.in/allimages/Infrastructure/c6.jpg | Infrastructure/c6.jpg |

## 📂 Server Directory Structure Required

```
https://the.islec.edu.in/
└── allimages/
    ├── mainSlider/
    │   ├── Recognition25.jpg
    │   ├── 15112025.jpg
    │   ├── 23102025.jpg
    │   ├── 10102025.jpg
    │   ├── 11092025.jpg
    │   ├── 19082025.jpg
    │   ├── 28072025.jpg
    │   ├── 15072025.jpg
    │   ├── orientation24.jpeg
    │   ├── antiriba2024.jpg
    │   ├── antidrug2024.jpg
    │   ├── judo2024.jpg
    │   └── hack23.jpg
    ├── fdp/
    │   └── fdp1.jpg
    ├── Infrastructure/
    │   ├── ca1.jpg
    │   └── c6.jpg
    └── [other image files listed above]
```

## ✅ JSON Files Status

All event JSON files are correctly configured:

- ✅ **DATA/events/all.json** - 38 events configured
- ✅ **DATA/events/inbounds.json** - 17 events configured
- ✅ **DATA/events/outbounds.json** - 6 events configured
- ✅ **DATA/events/sports.json** - 6 events configured
- ✅ **DATA/events/seminars.json** - 7 events configured

**Total Events:** 38 unique events across all categories

## 🔍 How to Verify Images

### Method 1: Direct URL Test
Open each URL in a browser to verify the image exists:
```
https://the.islec.edu.in/allimages/mainSlider/Recognition25.jpg
https://the.islec.edu.in/allimages/mainSlider/15112025.jpg
... etc
```

### Method 2: Check Browser Console
1. Visit: https://islec.edu.in/#/events
2. Open DevTools (F12)
3. Go to Console tab
4. Look for "Hiding broken image" messages
5. Check Network tab for 404 errors on image requests

### Method 3: Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Img"
4. Refresh the events page
5. Check for any red (failed) image requests

## 🐛 Troubleshooting

### If images don't show:

1. **Verify images exist on CDN server**
   - Check that files are uploaded to `https://the.islec.edu.in/allimages/`
   - Verify exact filenames (case-sensitive)

2. **Check CORS headers**
   - Server must allow cross-origin requests
   - Add CORS headers if needed:
   ```apache
   Header set Access-Control-Allow-Origin "*"
   ```

3. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

4. **Check console for errors**
   - The `hide-broken-images.js` script will hide images that fail to load
   - Console will show: "Hiding broken image: [URL]"

5. **Verify image paths**
   - Ensure no typos in filenames
   - Check that subdirectories exist (mainSlider/, fdp/, Infrastructure/)

## 📝 Notes

- **Current Status:** JSON configuration is 100% complete ✅
- **Action Required:** Upload image files to `https://the.islec.edu.in/` server
- **Image Hiding Script:** `hide-broken-images.js` will hide images that fail to load (404 errors)
- **Once images are uploaded:** Events page will automatically display all images correctly

## 🎯 Quick Action Items

1. ✅ JSON files configured correctly (NO CHANGES NEEDED)
2. ⚠️ Upload 38 image files to CDN server at paths listed above
3. ⚠️ Verify CORS headers on CDN server
4. ⚠️ Test each image URL directly in browser
5. ⚠️ Clear cache and verify events page

---

**Last Updated:** August 30, 2026  
**Status:** JSON Configuration Complete - Awaiting Image Upload to CDN

