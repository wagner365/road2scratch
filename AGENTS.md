<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Marketing site is a single page (src/routes/index.tsx) built from src/components/site/*; shared copy/packages live in src/lib/site-data.ts — keeps quote preselection in one place.
- Quote requests insert from the browser with an anon INSERT-only policy; /admin reads them via RLS gated by public.has_role(uid,'admin') — no admin role from user metadata.
