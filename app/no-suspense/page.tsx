// These payloads deliberately match /suspense so removing the Suspense
// boundaries is the only meaningful difference between the two routes.
const contentThatCrossesReactChunkThreshold = "x".repeat(13_000);
const image =
  "https://cdn.sanity.io/images/jtme7tnt/production/f99444ef4010b0bb07d787fdd4b02ffb18f3e889-1920x1379.jpg?h=100&w=145&auto=format&fit=min";
const contentThatDelaysSecondRevealOverNetwork = Array.from(
  { length: 3_000 },
  (_, index) => Math.imul(index, 2_654_435_761).toString(36)
).join("");

export default function Page() {
  return (
    <>
      <span hidden>{contentThatCrossesReactChunkThreshold}</span>

      <img alt="" height="440" src={image} width="640" />
      <span hidden>{contentThatDelaysSecondRevealOverNetwork}</span>
    </>
  );
}
