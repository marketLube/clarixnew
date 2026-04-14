# IMPORTANT: Data Protection Rules for AI Assistants

> **This file must be read before ANY database operations.**

## NEVER Do These Things

### 1. Never run `seed:real` or `seed:demo` again
These scripts run `College.deleteMany({})` which **WIPES ALL COLLEGES** including:
- 1,200+ Indian colleges with real Wikipedia photos
- 261+ international universities across 16 countries
- All course linkages and gallery images

### 2. Never bulk-delete colleges or courses
- `College.deleteMany({})` — FORBIDDEN
- `Course.deleteMany({})` — FORBIDDEN
- `db.colleges.drop()` — FORBIDDEN
- Any operation that removes more than 1 document at a time needs explicit user approval

### 3. Never overwrite image fields blindly
- Each college has **unique** Wikipedia/Commons photos painstakingly fetched
- If updating images, use `$set` on specific fields, never replace the entire document
- Always check if the college already has real photos before overwriting

### 4. Never remove courses from colleges
- Courses are linked via ObjectId references in the `courses` array
- Adding new courses is fine, but never clear the existing array

## Safe Operations

### Adding new colleges
```typescript
// SAFE: Insert new colleges without touching existing ones
await College.create({ name: "New College", ... });
```

### Updating specific fields on a college
```typescript
// SAFE: Update only the fields you need
await College.updateOne({ _id: id }, { $set: { rating: 4.5 } });
```

### Adding new courses and linking them
```typescript
// SAFE: Create course, then push to college's courses array
const course = await Course.create({ ... });
await College.updateOne({ _id: collegeId }, { $push: { courses: course._id } });
```

### Running photo update scripts
```typescript
// SAFE: These only update image fields
npx tsx scripts/real-college-photos.ts       // Indian colleges
npx tsx scripts/seed-international-mega.ts   // International (skips existing)
```

## Current Database State (as of April 2026)

| Collection | Count | Notes |
|-----------|-------|-------|
| Colleges | ~1,464 | 1,203 Indian + 261 International |
| Courses | ~56+ | Shared across colleges |
| Universities | ~54 | Parent university entities |
| Blogs | ~1,343 | SEO blog posts |
| Streams | 10 | Engineering, Medical, etc. |

## Countries with Colleges
India, United States, United Kingdom, Canada, Australia, Germany, France,
Japan, South Korea, Singapore, Netherlands, UAE, China, Malaysia,
New Zealand, Ireland, Sweden

## Photo Sources
- **Wikipedia/Wikimedia Commons**: Real college campus photos (primary)
- **Unsplash**: Unique education photos as fallback (each college gets a unique one)
- Every college's `campusImages[0]` is guaranteed unique (no two colleges share the same card banner)
