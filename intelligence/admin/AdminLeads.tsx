"use client";

import { useState } from "react";

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  business_name: string | null;
  interest: string | null;
  plan_interest: string | null;
  status: string;
  session_id: string | null;
  consent: boolean;
  metadata: { score?: number; budget?: string | null; timeline?: string | null } | null;
  created_at: string;
};

/** Internal prototype only. Do not deploy this browser-key dashboard publicly. */
export default function AdminLeads({ apiUrl }: { apiUrl: string }) {
  const [key, setKey] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`${apiUrl}/admin/leads`, {
        headers: { authorization: `Bearer ${key}` },
      });
      if (!r.ok) throw Error("Authorization or API error");
      setLeads(await r.json());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        fontFamily: "system-ui",
        padding: 20,
      }}
    >
      <h1>KINEXIS Intelligence · Leads</h1>
      <p>
        Internal development preview. Production requires a server-side
        authenticated admin proxy and MFA.
      </p>
      <input
        type="password"
        aria-label="Development admin API key"
        placeholder="Development admin key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button disabled={loading || !key} onClick={load}>
        Load leads
      </button>
      {error && <p role="alert">{error}</p>}
      <p>{leads.length} leads loaded</p>
      <div style={{ overflowX: "auto" }}>
        <table cellPadding={12}>
          <thead>
            <tr>
              {[
                "Name",
                "Email",
                "Business",
                "Interest",
                "Budget",
                "Timeline",
                "Score",
                "Status",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id}>
                {[
                  l.name,
                  l.email,
                  l.business_name,
                  l.interest ?? l.plan_interest,
                  l.metadata?.budget,
                  l.metadata?.timeline,
                  l.metadata?.score,
                  l.status,
                ].map((v, i) => (
                  <td key={i}>{v ?? "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
