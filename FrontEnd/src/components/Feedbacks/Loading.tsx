export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center m-2 p-4">
      <span className="loading loading-infinity loading-lg text-primary self-center"></span>
      <p className="self-center text-lg">Just a few seconds, the data is loading...</p>
    </div>
  );
}
