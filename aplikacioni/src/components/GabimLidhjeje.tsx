import Ikona from "./Ikona";

// Shfaqet kur serveri nuk lidhet dot me Neon.
export default function GabimLidhjeje({ children }: { children: React.ReactNode }) {
  return (
    <div className="sukses">
      <div className="ora-madhe e-kuqe">
        <Ikona emri="bllok" madhesia={52} />
      </div>
      <h2>RideShare</h2>
      <p role="alert" className="i-zbehte">
        Nuk u lidhëm me databazën. Provo përsëri.
      </p>
      {children}
    </div>
  );
}
