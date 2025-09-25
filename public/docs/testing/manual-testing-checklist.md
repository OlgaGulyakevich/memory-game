# Memory Game - Manual Testing Checklist

## Start Screen
- [ ] Game title displays correctly
- [ ] Game rules are readable and clear
- [ ] All theme buttons are visible and clickable
- [ ] Theme buttons display correct icons
- [ ] Theme selection highlights properly
- [ ] "Start Game" button is functional

## Game Process
- [ ] Cards display in correct quantity (12 cards)
- [ ] Cards have proper theme styling
- [ ] Card click triggers flip animation
- [ ] Matching pairs remain open
- [ ] Non-matching pairs close after delay
- [ ] Step counter works correctly
- [ ] Progress bar updates properly
- [ ] Checkmark appears on matched pairs
- [ ] Game prevents clicking during card flip delay

## Game Completion
- [ ] Victory modal appears when all pairs found
- [ ] "Show Results" button functions correctly
- [ ] Transition to results screen works
- [ ] Game completion time is recorded
- [ ] Final score calculation is accurate

## Results Screen
- [ ] Results table displays properly
- [ ] Current result is highlighted
- [ ] Results sort by ascending step count
- [ ] "New Game" button returns to start
- [ ] Previous results persist correctly

## Navigation & Routing
- [ ] URL changes during screen transitions
- [ ] Browser back button works correctly
- [ ] Direct links to /game, /results function
- [ ] Page refresh maintains current state
- [ ] 404 fallback redirects properly

## Responsive Design
- [ ] Correct display on desktop (1920x1080)
- [ ] Correct display on tablet (768x1024)
- [ ] Correct display on mobile (375x667)
- [ ] Portrait and landscape orientations work
- [ ] Touch interactions work on mobile
- [ ] Cards are appropriately sized for touch

## Accessibility (WCAG AA)
- [ ] All interactive elements accessible via Tab
- [ ] Enter and Space activate cards
- [ ] Screen reader correctly reads aria-labels
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Heading hierarchy is semantic
- [ ] Alt text provided for images

## Performance
- [ ] Game loads quickly (< 3 seconds)
- [ ] Animations are smooth without lag
- [ ] No memory leaks during extended play
- [ ] Bundle size is optimized
- [ ] Images load efficiently
- [ ] No console errors in production

## Cross-Browser Compatibility
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Edge Cases & Error Handling
- [ ] Rapid clicking doesn't break game state
- [ ] Network interruption doesn't crash app
- [ ] Invalid routes redirect appropriately
- [ ] Local storage limitations handled gracefully
- [ ] JavaScript disabled shows fallback message