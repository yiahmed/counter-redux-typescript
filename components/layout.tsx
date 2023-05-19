export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main style={{height: "93vh"}}className="bg-white w-full">{children}</main>
    </div>
  );
}
