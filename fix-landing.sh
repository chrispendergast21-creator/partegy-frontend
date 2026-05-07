#!/bin/bash

# Backup the file first
cp app/landing/page.tsx app/landing/page.tsx.backup

# Find and delete the standalone "How Partegy Works" section (lines 327-362 approximately)
# First, let's find the exact line number
HOW_LINE=$(grep -n "How Partegy works" app/landing/page.tsx | cut -d: -f1)

if [ ! -z "$HOW_LINE" ]; then
  # Delete from the comment before "How the Platform Works" to the end of that section (about 38 lines)
  START_LINE=$((HOW_LINE - 3))
  END_LINE=$((HOW_LINE + 35))
  sed -i '' "${START_LINE},${END_LINE}d" app/landing/page.tsx
  echo "Deleted standalone 'How Partegy Works' section"
fi

# Now replace gap-6 with gap-8 and p-6 with p-8 in the solution section
sed -i '' 's/gap-6 max-w-6xl mx-auto mb-8/gap-8 max-w-6xl mx-auto mb-8/' app/landing/page.tsx
sed -i '' '/<div className="bg-slate-800\/50 backdrop-blur border border-slate-700 rounded-xl p-6">/,/<\/div>/ {
  s/p-6/p-8 relative/
  s/<div className="text-emerald-400 font-semibold mb-2">Define<\/div>/<div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1<\/div>\n              <h3 className="text-lg font-semibold text-white mb-3 mt-2">Define partnership strategy<\/h3>/
  s/<div className="text-slate-300 text-sm">Partnership strategy and objectives<\/div>/<p className="text-slate-300 text-sm">Capture strategic objectives, shared goals, and key initiatives for each partnership.<\/p>/
}' app/landing/page.tsx

echo "Changes complete! Building to test..."
npm run build
