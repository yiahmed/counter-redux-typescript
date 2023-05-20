import Navbar from "./nav/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <Navbar/>
      <main style={{height: "93vh"}} className="bg-white w-full">{children}</main>
    </div>
  );
}
