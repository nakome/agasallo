import React from "react";
import lang from "../config/language.json"
export default function EmptyDb() {
  return (
    <section className="info">
      <h3>{lang.dbempty}</h3>
    </section>
  )
}