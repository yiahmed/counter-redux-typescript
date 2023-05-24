import Navbar from "./nav/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navbar/>
      <main  className="bg-white w-screen h-screen">{children}</main>
    </div>
  );
}
