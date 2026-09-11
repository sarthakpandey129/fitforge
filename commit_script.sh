#!/bin/bash

# 1. Route groups refactor
git add src/app/page.tsx src/app/start/page.tsx src/app/\(marketing\) src/components/Navigation.tsx src/app/globals.css
git commit -m "refactor: migrate to nextjs route groups"

# 2. Sequence animation
git add public/sequence static/ src/components/HeroScene.tsx src/components/SceneCanvasInner.tsx src/components/sections/ src/components/SequencePlayer.tsx fix_sections.sh 2>/dev/null
git commit -m "feat: implement high-res sequence animation system"

# 3. DB and Auth
git add package.json package-lock.json prisma/ src/lib/ src/app/api/ src/app/\(auth\)
git commit -m "feat: setup db schema and next-auth integration"

# 4. Onboarding
git add src/app/\(onboarding\) src/proxy.ts src/app/actions/onboarding.ts 2>/dev/null
git commit -m "feat: build user onboarding flow and edge proxy"

# 5. Dashboard
git add src/components/Providers.tsx src/app/\(app\)/layout.tsx src/app/\(app\)/dashboard src/app/\(app\)/profile 2>/dev/null
git commit -m "feat: build dashboard and core app shell"

# 6. Workouts
git add src/app/\(app\)/workouts src/app/actions/workouts* 2>/dev/null
git commit -m "feat: implement workout tracker and exercise library"

# 7. Nutrition
git add src/app/\(app\)/nutrition src/app/actions/nutrition* 2>/dev/null
git commit -m "feat: add nutrition logging system"

# 8. Progress
git add src/app/\(app\)/progress src/app/actions/progress* 2>/dev/null
git commit -m "feat: add progress charts and analytics"

# 9. Catch-all
git add .
git commit -m "chore: cleanup and final adjustments"

# Push
git push origin main
