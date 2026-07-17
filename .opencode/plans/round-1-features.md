# Round 1 Implementation Plan

## New Files to Create

### 1. `lib/registration-context.tsx`
- React Context + Provider for event RSVP and club memberships
- Stores two arrays in localStorage: `aces_registered_events` and `aces_club_memberships`
- Actions: `register(key)`, `unregister(key)`, `joinClub(key)`, `leaveClub(key)`
- Hooks: `isRegistered(key)`, `isMember(key)`, `registeredCount`, `clubCount`
- Pattern: same as `cart-context.tsx` — load on mount via `useState(() => loadSet(...))`, auto-save via `useEffect`

### 2. `lib/recently-viewed-context.tsx`
- React Context + Provider tracking last 6 visited resource/course pages
- Stores in localStorage key `aces_recently_viewed`
- Type: `ViewedItem { href, label, subtitle?, image?, viewedAt }`
- Actions: `addItem(item)` — deduplicates by href, prepends, slices to 6
- Hook: `useRecentlyViewed()` returns `{ items, addItem, clearItems }`

### 3. `components/skeleton.tsx`
- Three exports: `SkeletonCard`, `SkeletonList`, `SkeletonDetail`
- Use Tailwind's `animate-pulse` + `bg-muted` for gray pulsing placeholders
- `SkeletonCard` — aspect-square image block + 3 text lines
- `SkeletonList` — rows with icon block + 3 text lines + action button
- `SkeletonDetail` — large image + title + description blocks

## Modified Files

### 4. `app/events/page.tsx`
- Add `capacity` and `registered` fields to Event type and each event
- On each event card, show a "X seats left" badge:
  - Red/destructive if ≤5 seats left
  - Amber/warning if ≤15 seats left
  - Green/success otherwise
- Add "Register" button:
  - If not registered: primary button "Register — Free"
  - If registered: green "Registered ✓" button
  - On click: calls `register(event.name)`, increments registered count
- Use `useRegistration()` hook

### 5. `app/page.tsx` (homepage)
- Homepage events: add seats-left badge + register button to each of the 3 events
- Homepage clubs: add "Join Club" button to each club card
  - If not member: "Join Club" button
  - If member: "Member ✓" button in green
  - On click: calls `joinClub(club.name)` or `leaveClub(club.name)`
- Import and use `useRegistration()` hook
- Convert to `'use client'` (already has Image which is used in client context but the page itself might need it)

### 6. `app/resources/page.tsx`
- Convert to `'use client'` (currently server component with metadata export)
- Add recently viewed section below the main hub cards
- Only visible if there are items (check `items.length > 0`)
- Shows max 6 items as small horizontal cards with label, subtitle, and "→" link
- When user taps a hub card (Courses, Scholarships, Events), call `addItem(...)` with the href and label
- Import and use `useRecentlyViewed()` hook

### 7. `app/layout.tsx`
- Wrap children with:
  ```tsx
  <RecentlyViewedProvider>
    <RegistrationProvider>
      {children}
    </RegistrationProvider>
  </RecentlyViewedProvider>
  ```
- Import both providers

## Build Order
1. Create `lib/registration-context.tsx`
2. Create `lib/recently-viewed-context.tsx`
3. Create `components/skeleton.tsx`
4. Modify `app/layout.tsx`
5. Modify `app/events/page.tsx`
6. Modify `app/page.tsx`
7. Modify `app/resources/page.tsx`
8. Build and push
