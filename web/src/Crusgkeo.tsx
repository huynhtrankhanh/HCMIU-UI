import React, { useEffect } from "react";
import { initialize } from "./Crusgkeo/script";
import { PumpController } from "./PumpController"
type CrusgkeoProps = {
  twoPumpController: PumpController;
  fourPumpController: PumpController;
};
let initialized = false;
export const Crusgkeo: React.FC<CrusgkeoProps> = ({ twoPumpController, fourPumpController }) => {
  useEffect(() => {
    if (initialized) return;
    initialized = true;
    document.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title style="font-size: 7000px">Crusgkeo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      /* http://meyerweb.com/eric/tools/css/reset/
         v2.0 | 20110126
         License: none (public domain)
      */

      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }
      body {
        line-height: 1;
        background-size: cover;
      }
      ol,
      ul {
        list-style: none;
      }
      blockquote,
      q {
        quotes: none;
      }
      blockquote:before,
      blockquote:after,
      q:before,
      q:after {
        content: "";
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      canvas {
        position: fixed;
      }

      body {
        overscroll-behavior: none;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      @font-face {
        font-family: "Lobster Two";
        src: url("./Lobster_Two/LobsterTwo-Regular.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: "Lobster Two";
        src: url("./Lobster_Two/LobsterTwo-Bold.ttf") format("truetype");
        font-weight: bold;
        font-style: normal;
      }

      @font-face {
        font-family: "Lobster Two";
        src: url("./Lobster_Two/LobsterTwo-Italic.ttf") format("truetype");
        font-weight: normal;
        font-style: italic;
      }

      @font-face {
        font-family: "Lobster Two";
        src: url("./Lobster_Two/LobsterTwo-BoldItalic.ttf") format("truetype");
        font-weight: bold;
        font-style: italic;
      }

      .leaderboard-link {
        font-family: "Lobster Two", cursive;
        font-size: 50px;
        text-align: left;
        position: absolute;
        bottom: 0;
        left: 20px;
        margin-bottom: 20px;
        color: rgb(0, 255, 255);
        background: rgba(255, 255, 255, 0.39);
      }
    </style>
  </head>
  <body>
    <canvas id="canvas"></canvas>
  </body>
</html>`);
    initialize(twoPumpController, fourPumpController);
  }, []);
  return <></>;
}
