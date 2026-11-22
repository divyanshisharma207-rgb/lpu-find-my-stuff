# LPU Find My Stuff — Campus Lost & Found Web Portal

An official, privacy-first item recovery network designed for **Lovely Professional University (LPU)** campus students and staff.

## ✨ Core Features

1. **Post a Lost Item**: Report missing items with title, detailed description, exact date and time, college building/campus spot (Block 34, UniMall, Central Library, etc.), category, and photo upload.
2. **Post a Found Item**: Report found items with matching fields, plus an optional **Anti-Fraud Verification Question** (e.g. *"What sticker is on the back or phone wallpaper?"*).
3. **Live Search & Multi-Filters**: Instant keyword search combined with filtering by:
   - Item Type: *All*, *Lost Items*, *Found Items*
   - Category: *Electronics*, *Student IDs*, *Wallets & Keys*, *Books*, *Backpacks*, *Eyewear*, *Sports*, etc.
   - College Building / Location: *Block 34*, *Block 38*, *Central Library*, *UniMall*, *Hostels*, etc.
   - Date Range: *Today*, *Past 3 Days*, *Past 7 Days*, *Past 30 Days*, *All*
   - Status: *Lost*, *Found*, *Claim Pending*, *Returned*, *Expired*
4. **Secret Detail Ownership Verification**: Students claim an item by describing a unique secret detail that only the genuine owner would know (scratches, lock codes, engravings, contents of inner pockets).
5. **Item Status Tracking**: Complete visual lifecycle pipeline:
   - `lost` ➔ `found` ➔ `claim pending` ➔ `returned` (or `expired`)
   - Interactive timeline logs for each item with timestamps.
6. **100% Private Masked Contact**: Personal email addresses, registration numbers, and phone numbers are **strictly hidden**. Students connect via an in-app Masked Messenger with safe campus security drop-off point suggestions (UniMall Security Desk, Central Library Counter, etc.) and one-click claim verification.
7. **Printable Campus Notice Flyer**: Generates an A4-format printable flyer with a QR code and tear-off contact slips for college notice boards.

---

## 🎨 Warm Color Palette

| Color | Hex | Role |
| :--- | :--- | :--- |
| **Vibrant Terracotta Coral** | `#FA8952` | Primary buttons, **LOST** badges, urgent highlights |
| **Warm Apricot Orange** | `#FAA652` | Secondary buttons, **FOUND** badges, search focus |
| **Honey Amber Gold** | `#FABF52` | **Claim Pending** status, question highlights |
| **Bright Sunflower Yellow** | `#FAD352` | **Returned / Reunited** celebrations, metrics |
| **Coral Rose / Blush** | `#FAA596` | Subtle button fills, alert backdrops |
| **Soft Peach Cream** | `#FAD3AD` | Card borders, category tags, container fills |

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (auto-opens browser)
npm run dev

# 3. Build for production
npm run build
```

---

## 📦 Deployment

This project includes automated deployment to **GitHub Pages** via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
Whenever changes are pushed to the `main` branch, the site automatically builds and deploys to:
`https://divyanshisharma207-rgb.github.io/lpu-find-my-stuff/`
