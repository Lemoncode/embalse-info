# ------------------------------------------------------------
# Builder stage
# ------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# 1) Copy only lockfiles + package manifests first for caching
#    (so Docker doesn't reinstall deps on every code change)
COPY package.json package-lock.json ./
COPY front/package.json ./front/package.json
COPY packages/db-model/package.json ./packages/db-model/package.json

# 2) Install all dependencies for the monorepo (npm workspaces)
#    We need dev deps here because Next build typically requires them.
RUN npm ci

# 3) Now copy the full source code
COPY . .

# 4) Remove packageManager field to prevent Corepack (Node 22) from
#    hijacking yarn calls that Next.js SWC patching makes internally.
#    Must run AFTER "COPY . ." which overwrites the earlier package.json.
RUN node -e "const p='package.json',j=JSON.parse(require('fs').readFileSync(p));delete j.packageManager;require('fs').writeFileSync(p,JSON.stringify(j,null,2))"

# 5) Build the internal dependency used by the front (db-model)
#    If your workspace name differs, adjust "-w db-model"
RUN npm run -w db-model build --if-present

# 6) Build Next.js (standalone output will be generated)
RUN npm run -w front build


# ------------------------------------------------------------
# Runner stage (small image)
# ------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Azure App Service expects the app to listen on 0.0.0.0
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Next standalone output:
# - server.js + minimal node_modules in .next/standalone
# - static assets in .next/static
# - public assets in /public
COPY --from=builder /app/front/.next/standalone ./
COPY --from=builder /app/front/.next/static ./front/.next/static
COPY --from=builder /app/front/public ./front/public

EXPOSE 3000

# Start Next standalone server
CMD ["node", "front/server.js"]