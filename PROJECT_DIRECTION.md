# Project Direction

This document preserves the project's stable identity and the principles that
should guide future changes, independent of which academic year, session, or
implementation detail is current. Read this before making a change that
touches curriculum design, site structure, or teaching material - not before
fixing a typo.

## Project essence

Programming for Visual Artists is a self-contained, static, year-by-year
public archive and live teaching environment. It is not a product with
customers or a generic educational platform - it is course material that
gets taught from directly, in person, session by session, and that also
stands as a durable public record once a year is finished.

It serves two ongoing needs at once: a browser-first surface students
actually run and edit during class, and a historical archive the teacher
returns to across academic years to adapt, compare, and learn from rather
than discard.

## Primary audience

**Students** are beginner visual-art students with little or no assumed
programming background. What matters to them: low friction, immediate
visual feedback, examples they can actually understand line by line, safe
experimentation, debugging that teaches rather than punishes, explicit
permission to adapt existing examples rather than start from nothing, a
cognitive load that increases gradually, and real room to make personal
visual decisions rather than reproduce a fixed result.

**The teacher/maintainer** teaches from this material live, returns to it
across academic years, and adapts historical examples into new ones. What
matters to them: the reasoning behind a decision needs to survive as well as
the files themselves, and maintenance needs to stay predictable enough that
a new year does not require rediscovering the same judgment calls from
scratch.

## Primary activities

The core student workflow:

```
open a session
→ run a sketch
→ inspect and change the code
→ observe the result
→ debug
→ personalize
→ carry that understanding into project work
```

Secondary student activities: comparing a p5.js sketch against its
Processing counterpart, using a teaching diagram when a concept is hard to
see from code alone, using the project briefs and assessment guidance, and
browsing historical years for reference.

Teacher/maintainer workflows: starting a new academic year, adapting
historical teaching material into a new version rather than copying it
wholesale, verifying course integrity before publishing, and keeping
historical years untouched as a record rather than a draft.

## Design position

The site should feel precise, restrained, and quietly technical - closer to
a lab notebook than a marketing page, and closer to a terminal than a
dashboard. That restraint is a considered identity, not a placeholder for
unfinished design work.

Visual polish should improve legibility, orientation, accessibility, and
teaching clarity without competing with the code being taught or turning
the course into a promotional surface. The interface can be highly
finished while remaining visually restrained - restraint is a character
choice, not a ban on refinement.

## Product principles

1. **Teach one conceptual step at a time.** New material earns its place by
   teaching something meaningfully distinct from what already exists. Do not
   add an example, opener, or sketch merely for variety or template symmetry.
2. **Complexity is not quality.** Technical sophistication, code length, or
   number of concepts used should never automatically imply stronger student
   work. Simple techniques used with intention and understanding can be
   equally strong.
3. **Debugging is part of learning.** Students should encounter both
   explicit errors and behavioral bugs (code that runs but behaves wrong) as
   a deliberate part of the course, not an accident to be designed away.
   Failure should be understandable and recoverable.
4. **Historical years remain historical.** Past academic years are
   reference material and a record of prior teaching. They inform new work
   by adaptation, never by being silently rewritten to match the newest
   year's conventions.
5. **p5.js is primary; Processing is comparative.** The browser is the main
   surface students work in. Processing exists to show related desktop
   creative-coding syntax and ideas alongside it, not as a second, equally
   weighted curriculum.
6. **Personalization is part of the lesson, not an afterthought.** Exercises
   should progress from following, to changing, to making something that is
   recognizably the student's own. Students should not remain in copy-only
   mode.
7. **Add only what serves the course.** New features, visuals, sketches,
   optional material, or infrastructure should be introduced because they
   solve a real teaching, maintenance, or navigation problem - not because
   they are available, common elsewhere, or technically interesting.

## Interaction principles

- At any point in a session, a student should be able to tell what to run,
  what to change, and what they should expect to see.
- Editing should stay close to the running result; a change and its visual
  effect belong in the same view, not a separate disconnected tool.
- Errors should be surfaced plainly and factually, never silently swallowed
  and never replaced with an invented explanation the environment cannot
  actually verify.
- Resetting or recovering from a mistake should be predictable and always
  available - experimentation should not feel like a one-way risk.
- Where optional or bonus material exists alongside required material, the
  distinction should be immediately visible; a student should never have to
  guess whether something is expected of them.
- Personalization should read as an intended destination of an exercise,
  visibly invited, not a bonus round tacked onto the "real" task.

## Technical principles

- **Local and self-contained.** Teaching pages should not depend on
  unnecessary external services, remote fonts, analytics, or network APIs.
  A student should be able to learn and experiment without the material
  phoning out anywhere.
- **Safe experimentation.** Changes a student is directly invited to make
  should fail safely enough that reasonable exploration does not routinely
  destroy the teaching environment or freeze the browser. How that safety is
  implemented will vary by sketch and by year; the requirement that it exist
  does not.
- **Explicit source of truth.** Repeated course metadata (sessions,
  sketches, slides, search entries) should have one clear place it is
  defined, rather than diverging hand-maintained copies.
- **Automated verification is part of "done."** Structural integrity,
  broken links, privacy, accessibility, and representative browser behavior
  should be checked automatically, not only reviewed by eye.
- **Public repository hygiene.** The archive is public. It must never
  expose grades, private student information, credentials, private
  institutional material, or unpublished third-party work.
- **Maintainable across academic years.** The structure should make it
  possible to add a new year, session, or sketch without redesigning the
  site around it.

## Anti-principles

Things this project deliberately avoids, specific to what it is:

- No generic commercial/SaaS/dashboard design language - no decorative
  cards-with-shadows, gradients, or stat tiles introduced by default.
- No feature accumulation merely because something is technically possible.
- No advanced technique folded into the required curriculum just because it
  exists in a historical year - it earns inclusion the same way any new
  material does.
- No slide deck by default when live code, a worksheet, and (if genuinely
  needed) a small visual aid already communicate the concept.
- No assessment framed around a feature checklist or technical
  sophistication; intentional use and understanding matter more than
  quantity of techniques used.
- No rewriting historical years to fit current conventions.
- No forcing p5.js and Processing into a duplicate, equally weighted
  curriculum for the sake of symmetry.
- No decorative visuals added without a specific teaching purpose.
- No presenting optional or bonus material in a way that could be mistaken
  for part of the required sequence.

## Stable foundations

Treat these as durable unless a future decision deliberately reconsiders
them:

- The year-by-year archive model, with each year self-contained.
- Historical years remaining unedited reference material.
- The browser-first teaching model, with Processing kept as a comparison.
- The session → sketch → worksheet → personalization rhythm.
- A shared, live, in-browser Lab as the primary editing surface.
- Projects and assessment framed around understanding and artistic intent
  rather than technical breadth.
- The public/privacy constraints on what this repository may ever contain.
- A restrained, teaching-oriented visual character.

Do **not** treat these as stable identity, even though they are true today:
the exact current number of sessions, exact sketch filenames or contents,
exact CSS or color implementation, current navigation markup, or any
specific optional-workshop idea. Those are implementation and belong to
`ARCHITECTURE.md`, `PROJECT_STATUS.md`, or the curriculum itself, and are
free to change without this document changing.

## What may evolve

Expected to change over time, without that change indicating a shift in
project identity: future academic-year curriculum, individual teaching
examples, project prompts, optional or bonus workshops, visual teaching
aids, navigation organization, Lab ergonomics, testing implementation, and
any technical or styling implementation detail.

Evolution should preserve the pedagogical direction above unless a change
is deliberately reconsidering a stated principle - in which case, say so
explicitly rather than letting the project drift away from its own
documented reasoning one small decision at a time.

## Optional material principle

A recurring, still-open question is how optional or bonus material (for
example, a possible future media-focused workshop, or teaching examples
judged too advanced for the required sequence) should be organized. This
document records the principle, not a solution:

> Optional and bonus material should remain visibly subordinate to the core
> teaching sequence, and should never make the required curriculum appear
> longer, harder, or more complex than it actually is.

Where and how that material is eventually surfaced is a design question to
be solved when real optional material is ready to publish, not before.

## How to use this document

- Read it before a change to curriculum design, site structure, or teaching
  material - not before routine fixes.
- If a change would contradict a stated principle, say so explicitly and
  update this document deliberately; do not let the project drift away from
  its own reasoning through a series of small, unstated exceptions.
- Before adding a statement here, ask: would this still make sense if the
  implementation changed next year? If not, it belongs in one of the
  documents below instead.

## Related documentation

- `ARCHITECTURE.md` - how the site is structured technically.
- `MAINTAINING.md` - how to maintain and extend it.
- `PROJECT_STATUS.md` - current state and remaining work.
- `CHANGELOG.md` - historical changes.
- `SECURITY.md` - public-content and privacy constraints.
