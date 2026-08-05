import { Suspense } from "react";

// Crossing React's ~12.8 KB progressive chunk threshold makes this completed
// Suspense boundary get outlined into hidden HTML plus a reveal script. React
// counts these bytes before HTTP compression, so repeated text works here.
// Revealing this boundary starts React's reveal-batching window.
const contentThatCrossesReactChunkThreshold = "x".repeat(13_000);
const image =
  "https://cdn.sanity.io/images/jtme7tnt/production/f99444ef4010b0bb07d787fdd4b02ffb18f3e889-1920x1379.jpg?h=100&w=145&auto=format&fit=min";

// The image tag is emitted before this content, while the boundary's reveal
// script is emitted after it. Unlike repeated text, these varied values remain
// substantial after HTTP compression. The image can therefore load while the
// second reveal script is still arriving. React receives that reveal during
// the existing batching window and delays making the image visible.
const contentThatDelaysSecondRevealOverNetwork = Array.from(
  { length: 3_000 },
  (_, index) => Math.imul(index, 2_654_435_761).toString(36)
).join("");

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <span hidden>{contentThatCrossesReactChunkThreshold}</span>
      </Suspense>

      <Suspense fallback={"Loading..."}>
        <img alt="" height="440" src={image} width="640" />
        <span hidden>{contentThatDelaysSecondRevealOverNetwork}</span>
      </Suspense>
    </>
  );
}
