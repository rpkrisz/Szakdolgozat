export default function Footer() {
  return (
    <footer className="footer-center lg:footer text-neutral-content items-center p-4 bg-base-300 mt-4">
      <div className="my-2 grid-flow-col place-items-center mx-auto">
        Copyright © {new Date().getFullYear()} - TaskManager
      </div>
    </footer>
  );
}
