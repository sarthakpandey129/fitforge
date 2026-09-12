#!/bin/bash
set -e

# Base timestamp (8 days ago)
BASE_DATE="2026-09-04T10:00:00+0530"

# Helper to commit with a specific date
commit_with_date() {
    local msg=$1
    local date_val=$2
    if git diff --staged --quiet; then
        echo "No changes to commit for: $msg"
    else
        GIT_AUTHOR_DATE="$date_val" GIT_COMMITTER_DATE="$date_val" git commit -m "$msg"
    fi
}

echo "Resetting history..."
# Soft reset to initial commit (keeps all files in working directory)
git reset 38cb398
# Unstage all files
git reset HEAD

echo "Day 1: Prisma and Database Setup"
git add prisma/ src/lib/prisma.ts 2>/dev/null || true
commit_with_date "feat(db): setup prisma schema and database client" "2026-09-04T11:30:00+0530"

echo "Day 2: Authentication and Core Utils"
git add src/app/api/auth/ src/middleware.ts src/lib/auth.ts src/lib/utils.ts 2>/dev/null || true
commit_with_date "feat(auth): integrate next-auth and protect routes" "2026-09-05T14:15:00+0530"

echo "Day 3: App Shell and Navigation"
git add src/app/\(app\)/layout.tsx src/components/Sidebar* src/components/Header* 2>/dev/null || true
commit_with_date "feat(ui): build dashboard app shell and sidebar" "2026-09-06T10:20:00+0530"

echo "Day 4: Dashboard and Onboarding"
git add src/app/\(app\)/dashboard/ src/app/\(app\)/onboarding/ src/app/actions/user* 2>/dev/null || true
commit_with_date "feat(dashboard): implement main dashboard and onboarding flow" "2026-09-07T16:45:00+0530"

echo "Day 5: Workouts Engine - Part 1"
git add src/app/\(app\)/workouts/page.tsx src/app/actions/workouts.ts 2>/dev/null || true
commit_with_date "feat(workouts): setup workout tracking foundation" "2026-09-08T09:30:00+0530"

echo "Day 5: Workouts Engine - Part 2"
git add src/app/\(app\)/workouts/\[id\]/ src/app/actions/workouts-client.ts src/app/\(app\)/exercises/ 2>/dev/null || true
commit_with_date "feat(workouts): implement active workout logging and exercise library" "2026-09-08T15:10:00+0530"

echo "Day 6: Nutrition and Progress"
git add src/app/\(app\)/nutrition/ src/app/actions/nutrition* src/app/\(app\)/progress/ src/app/actions/progress* src/app/actions/metrics* 2>/dev/null || true
commit_with_date "feat(tracking): add nutrition logging and progress charts" "2026-09-09T13:40:00+0530"

echo "Day 7: Goals and Settings"
git add src/app/\(app\)/goals/ src/app/\(app\)/settings/ src/app/actions/goals* src/app/actions/settings* 2>/dev/null || true
commit_with_date "feat(settings): user goal management and preferences" "2026-09-10T11:00:00+0530"

echo "Day 7: Sequence Assets"
git add public/sequence/ src/components/DashboardSceneCanvas.tsx 2>/dev/null || true
commit_with_date "feat(assets): add high-res sequence animation system" "2026-09-10T17:20:00+0530"

echo "Day 8: Docs"
git add README.md 2>/dev/null || true
commit_with_date "docs: rewrite README for portfolio presentation" "2026-09-11T23:45:00+0530"

echo "Day 8: UI Overhaul - Foundation"
git add src/app/globals.css src/components/ui/AnimatedCounter.tsx src/components/ui/FeaturePill.tsx src/components/ui/GlowButton.tsx src/components/ui/ScrollIndicator.tsx 2>/dev/null || true
commit_with_date "refactor(ui): update design system and premium UI components" "2026-09-12T10:45:00+0530"

echo "Day 8: UI Overhaul - Sections"
git add src/components/sections/SectionOverlay.tsx src/components/sections/SectionHero.tsx src/components/sections/SectionMeasure.tsx src/components/sections/SectionFuel.tsx src/components/sections/SectionTrain.tsx src/components/sections/SectionAdapt.tsx src/components/sections/SectionFinal.tsx 2>/dev/null || true
commit_with_date "feat(sections): overhaul section overlays with rich content and improved animations" "2026-09-12T12:45:00+0530"

echo "Day 8: UI Overhaul - Navigation"
git add src/components/Navigation.tsx 2>/dev/null || true
commit_with_date "feat(navigation): add smart-hide glassmorphism navigation" "2026-09-12T14:45:00+0530"

echo "Day 8: UI Overhaul - Layouts"
git add src/components/sections/BentoGrid.tsx src/components/ui/MarqueeStrip.tsx src/components/sections/HowItWorks.tsx src/components/sections/FinalCTA.tsx src/components/sections/Footer.tsx 2>/dev/null || true
commit_with_date "feat(ui): add bento grid, marquee, and step sections" "2026-09-12T16:45:00+0530"

echo "Day 8: UI Overhaul - Assembly"
git add src/components/SequencePlayer.tsx src/app/\(marketing\)/page.tsx 2>/dev/null || true
commit_with_date "feat(core): update cinematic preloader and assemble final marketing page" "2026-09-12T18:45:00+0530"

echo "Catch-all for remaining files"
git add -A
commit_with_date "chore: cleanup and final adjustments" "2026-09-12T18:50:00+0530"

echo "History rewrite complete!"
git log -n 15 --format="%h - %s (%ad)" --date=relative
