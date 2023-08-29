import React from "react";

const Info = props => <section className="info">
    <h3 style={{ margin: "0" }}>{props.title}</h3>
    <p style={{ color: "var(--danger)", margin: "0", marginBottom: "10px"}}>{props.description}</p>
    <React.Fragment>{props.children}</React.Fragment>
</section>

export default Info;