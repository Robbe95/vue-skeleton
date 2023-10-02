/// <reference types="vite/client" />
/// <reference types="@histoire/plugin-vue/components" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
