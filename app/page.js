export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#111",
      color: "white",
      fontFamily: "Arial"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem" }}>
          Bienvenue sur mon site 🚀
        </h1>
        <p style={{ opacity: 0.8 }}>
          Site créé avec Next.js + Vercel
        </p>
      </div>
    </main>
  );
}
