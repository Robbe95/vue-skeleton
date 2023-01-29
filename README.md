# Clone without GIT
```
npx degit Robbe95/vue-skeleton my-project-name
cd my-project-name
pnpm i
```


# Startup
Setup .env.development, .env.staging, .env.production files.
Histoire setup with story:dev
Start development sterver with dev command
```
pnpm dev
pnpm story:dev
```

# Structure
Module based layout.
Each feature has it's own folder in the modules folder, which contains all the scaffolding needed for that feature
/modules/empty contains an empty scaffolding to copy.
/modules/ui contains UI components.
/modules/example contains a small example of the structure and api calls using Zod.
/modules/auth contains a basic login form.

# Models
Instead of types, declare everything with a Zod object in the models folder. 
Infer it's type and export it too.

# Features
Auto imports on: components / vue / vue-router / pinia / vue-i18n / vitest / axios.
Tailwind
Histoire
Vue i18n
TS
VueUse
VueUse Head
Headless / Floating UI
Zod
@antfu/eslint-config as linter