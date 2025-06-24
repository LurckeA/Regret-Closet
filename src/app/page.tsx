'use client';

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function HomePage() {
  const [regret, setRegret] = useState("");
  const [regrets, setRegrets] = useState([]);
  
  useEffect(() => {
    fetch("/api/regret")
      .then(res => res.json())
      .then(data => setRegrets(data.regrets))
      .catch(err => console.error(err));
  }, []);
  
  const submitRegret = async () => {
    if (!regret.trim()) return;
    await fetch("/api/regret", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: regret }),
    });
    setRegret("");
    const res = await fetch("/api/regret");
    const data = await res.json();
    setRegrets(data.regrets);
  };
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>🗝️ Regret Closet</h1>
      <textarea
        className={styles.textarea}
        rows={4}
        placeholder="Confess your latest regret..."
        value={regret}
        onChange={e => setRegret(e.target.value)}
      />
      <button
        onClick={submitRegret}
        className={styles.button}
      >
        Lock It In
      </button>
      <div className={styles.regretsContainer}>
        <h2 className={styles.regretsTitle}>🕳️ Your Regrets:</h2>
        <ul className={styles.regretsList}>
          {regrets.map((r, i) => (
            <li
              key={i}
              className={styles.regretItem}
            >
              {r}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}