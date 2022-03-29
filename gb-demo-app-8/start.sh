#!/usr/bin/env sh

# Production mode
su -c "node apps/api/main.js"

# Debug mode
#su -c "node --inspect=0.0.0.0:9229 apps/api/main.js"

