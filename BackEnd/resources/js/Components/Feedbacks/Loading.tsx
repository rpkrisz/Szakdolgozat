export default function Loading() {
  return (
    <div  className="flex flex-col justify-center m-2 p-4">
      <p className="self-center text-lg">Be patient the data is loading...</p>
      <span className="loading loading-infinity loading-lg text-primary self-center"></span>
    </div>
  );
}
