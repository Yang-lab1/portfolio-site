# Pai Li Shi AWSMD-Style Scroll Showcase Spec

## Source Of Truth
- Target project: Pai Li Shi / 拍立食 detail page in the portfolio site.
- Correct app source: `C:\Users\Yang\Desktop\拍立食\frontend\p2\`.
- Current candidate board: `tmp/palifood-p2-real-screens/p2-real-app-screen-candidates-v2.png`.
- User-provided hand reference: `C:\Users\Yang\.codex\attachments\6d407a34-2b43-450c-8f99-10be98f2d55d\image-1.png`.
- Motion reference: AWSMD scroll section, specifically the pinned black section where left/right full phone screenshots move upward and the center hand-held phone remains dominant.

## Hard Requirements
- Do not use the old English/GASTRONOMIA prototype screenshots for this interaction.
- Do not use standalone food photos or square food cards as left/right background items.
- Left and right columns must be made from full app screen screenshots, matching a phone screenshot aspect ratio.
- Background screenshots must be approved by the user before being connected to the live interaction.
- The center visual must follow the provided hand-held-phone reference, not the previous CSS-only phone frame.
- Do not claim this is complete until a screenshot comparison is shown to the user and approved.

## Current User-Approved State
- The user has not yet selected which A-L P2 screenshots should become the left/right columns.
- No push or Vercel deployment should happen before user approval.

## Candidate Routes Captured
- A: `#/onboarding/1`
- B: `#/onboarding/2`
- C: `#/onboarding/3`
- D: `#/auth`
- E: `#/nexus`
- F: `#/capture`
- G: `#/workbench`
- H: `#/generation`
- I: `#/result`
- J: `#/archive`
- K: `#/community`
- L: `#/settings`

## Implementation Direction After User Confirms IDs
- Replace the current `palifoodShowcaseLeftCards` and `palifoodShowcaseRightCards` data with selected full-screen P2 app screenshots only.
- Remove the `.is-food` branch from this showcase.
- Keep all selected screenshots at one normalized phone aspect ratio.
- Replace the center `.palifood-phone-shell` composition with a hand-held-phone composition based on the provided hand reference.
- Verify desktop with multiple scroll positions and mobile fallback with no horizontal overflow.
