#!/bin/bash

# Script to create a new blog post
# Usage: ./scripts/new-post.sh "Title of the Post"

if [ -z "$1" ]; then
  echo "Error: Post title is required"
  echo "Usage: ./scripts/new-post.sh \"Title of the Post\""
  exit 1
fi

TITLE="$1"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')
FILENAME="_posts/${DATE}-${SLUG}.md"

# Create the post file
cat > "$FILENAME" <<EOF
---
layout: post
title: "$TITLE"
date: $DATE
author: "Oltrematica Team"
tags: []
reading_time: 5
excerpt: "Breve descrizione dell'articolo"
---

Scrivi qui il contenuto del tuo articolo...

## Sezione 1

Contenuto della sezione 1

## Sezione 2

Contenuto della sezione 2

## Conclusione

Conclusione dell'articolo
EOF

echo "✅ New post created: $FILENAME"
echo "📝 Opening in default editor..."

# Try to open in VSCode, otherwise use default editor
if command -v code &> /dev/null; then
  code "$FILENAME"
elif [ -n "$EDITOR" ]; then
  $EDITOR "$FILENAME"
else
  echo "Please edit the file manually: $FILENAME"
fi
