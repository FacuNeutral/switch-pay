# Estructura de `src/`

Mapa de la carpeta `src/` del frontend. Las capas siguen la convencion del proyecto: `application/` para features (screaming architecture), `components/` para UI reutilizable, `pages/` para vistas de ruta, `devtools/` para herramientas de inspeccion internas y `zustand/` para stores globales.

## Arbol de archivos

```
src/
├── App.tsx
├── main.tsx
├── vite-env.d.ts
│
├── application/                    # Features de dominio (screaming architecture)
│   ├── auth/
│   │   ├── components/
│   │   ├── fragments/
│   │   ├── helpers/
│   │   └── hooks/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── fragments/
│   │   ├── helpers/
│   │   └── hooks/
│   ├── perks/
│   │   ├── components/
│   │   ├── fragments/
│   │   ├── helpers/
│   │   └── hooks/
│   └── wallet/
│       ├── components/
│       ├── fragments/
│       ├── helpers/
│       └── hooks/
│
├── assets/
│   ├── illustrations/
│   │   └── illustration-benefits.svg
│   └── logo/
│
├── components/                     # UI reutilizable global
│   ├── core/                       # Componentes propios del proyecto
│   ├── fragments/                  # Piezas pequenas compartidas
│   │   ├── FormField.tsx
│   │   └── OtpInput.tsx
│   └── ui/                         # Primitivas shadcn/ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       └── use-toast.ts
│
├── devtools/                       # Herramientas internas de debug
│   ├── brand-design/
│   │   ├── components/             # BDNavbar, BDPanel, BDSidebar, BDSection*
│   │   └── store/
│   ├── core/
│   │   ├── hooks/
│   │   └── store/
│   ├── design-tokens/
│   │   ├── backups/                # Snapshots manuales de tokens
│   │   ├── components/             # DTPanel, DTPalettes, DTColorPicker, ...
│   │   ├── hooks/
│   │   ├── palettes/               # Presets JSON (chatgpt, deep-dark, golds, ...)
│   │   └── store/
│   └── pages-explorer/
│       ├── components/             # DebugPanel, DebugViewport, PageGalleryModal, ...
│       ├── docs/
│       │   └── pages/              # JSON por ruta documentada
│       ├── hooks/
│       ├── layouts/
│       ├── screenshots/            # Capturas .page.png + manifest.json
│       ├── store/
│       └── tools/
│
├── entities/                       # Tipos de dominio
│   ├── alias-contact.entity.ts
│   ├── perk.entity.ts
│   ├── session.entity.ts
│   ├── subscription.entity.ts
│   ├── transaction.entity.ts
│   ├── user.entity.ts
│   └── wallet.entity.ts
│
├── helpers/                        # Utilidades puras compartidas
│   ├── format.ts
│   └── simulate.ts
│
├── hooks/                          # Hooks globales
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   ├── useSecurityPin.ts
│   └── useThemeBoot.ts
│
├── layouts/                        # Layouts de ruta
│
├── lib/
│   └── utils.ts                    # Helpers de libreria (cn, etc.)
│
├── pages/                          # Vistas montadas en routes
│   ├── DashboardPage.tsx
│   ├── NotFoundPage.tsx
│   ├── access-check/
│   │   ├── AccessCheckManualPage.tsx
│   │   └── AccessCheckPage.tsx
│   ├── activity/
│   │   ├── ActivityDetailPage.tsx
│   │   └── ActivityPage.tsx
│   ├── auth/
│   │   ├── LoginEmailPage.tsx
│   │   ├── LoginPasswordPage.tsx
│   │   ├── LoginPinPage.tsx
│   │   ├── RecoveryNewPage.tsx
│   │   ├── RecoveryRequestPage.tsx
│   │   ├── RecoverySentPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── RegisterPinPage.tsx
│   │   ├── RegisterProfilePage.tsx
│   │   └── WelcomePage.tsx
│   ├── perks/
│   │   ├── ActivePerksPage.tsx
│   │   ├── PerkCheckoutPage.tsx
│   │   ├── PerkDetailPage.tsx
│   │   └── PerksCatalogPage.tsx
│   ├── profile/
│   │   ├── ChangeAliasPage.tsx
│   │   ├── ChangePasswordPage.tsx
│   │   ├── ChangePinPage.tsx
│   │   ├── ProfileAppearancePage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ProfilePersonalPage.tsx
│   │   ├── ProfileSecurityPage.tsx
│   │   └── ProfileSessionsPage.tsx
│   └── wallet/
│       ├── DepositPage.tsx
│       ├── TransferAmountPage.tsx
│       ├── TransferConfirmPage.tsx
│       ├── TransferPage.tsx
│       ├── WalletHistoryPage.tsx
│       └── WithdrawPage.tsx
│
├── styles/                         # CSS global y animaciones
│   └── animations/
│
└── zustand/                        # Stores globales
    ├── auth/
    │   ├── auth.mock.ts
    │   └── auth.slice.ts
    ├── perks/
    │   ├── perks.mock.ts
    │   └── perks.slice.ts
    ├── ui/
    │   └── ui.slice.ts
    └── wallet/
        ├── wallet.mock.ts
        └── wallet.slice.ts
```

## Convenciones rapidas

- **`application/<feature>/`**: agrupa componentes, fragments y helpers especificos de un feature.
- **Muy importante**: refactorizar y mover piezas de codigo hacia `application/` cuando pertenezcan a un feature; esto evita que `pages/` concentre logica sobrecargada.
- **`components/core/`**: UI propia reutilizable; **`components/ui/`**: primitivas shadcn sin tocar logica de dominio.
- **`devtools/`**: herramientas internas que se activan con `Ctrl+Alt+<` y no forman parte del producto final.
- **`entities/`**: tipos de dominio puros (sin logica de UI).
- **`pages/`**: una carpeta por seccion, archivos terminados en `Page.tsx`.
- **`zustand/<scope>/`**: cada store en su propio slice + mock asociado.
