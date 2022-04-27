import { c, css } from "atomico";

function a() {
    return <host shadowDom></host>;
}

console.log(
    (a.props = css`
        @import "normalize.css";
        :host {
            width: 200px;
        }
    `)
);
