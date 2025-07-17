# Copilot Instructions for Horus Optic

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
Horus Optic is a premium optical store specializing in contact lenses and subscription services. This is a Next.js 14 project using TypeScript and Tailwind CSS v4.1.

## Design System
- **Primary Color**: #B892D5 (purple)
- **Secondary Color**: #9C989F (gray)
- **Accent Color**: #E29AEE (light purple)
- **Neutral Color**: #FFFFFF (white)
- **Text Base**: #1E1E1E (dark gray)
- **Font**: InterVariable

## Technical Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS v4.1
- Headless UI for components
- Heroicons and Lucide React for icons
- Class Variance Authority for component variants

## Code Guidelines
- Use `clsx` and `tailwind-merge` for conditional styling
- Follow the component structure in `src/components/ui/`
- Use the custom color palette defined in `tailwind.config.ts`
- Implement smooth transitions with Tailwind's transition utilities
- Use TypeScript interfaces for all data structures
- Follow Next.js 14 App Router conventions
