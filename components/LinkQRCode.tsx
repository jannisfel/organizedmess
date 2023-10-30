"use client";

import { useEffect, useId, useState } from "react";
import QRCode from "react-qr-code";

export default function LinkQRCode() {
  const [href, setHref] = useState("");
  const svgId = useId();

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  if (!href) {
    return null;
  }

  const handleClick = () => {
    const win = parent.window.open("", "", "status=1");
    const svg = document.getElementById(svgId);
    win?.document.write(
      `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">${svg?.outerHTML}`
    );
    win?.print();
  };

  return (
    <div className="w-fit p-3 rounded-sm h-full">
      <QRCode
        value={href}
        onClick={handleClick}
        id={svgId}
        className="h-16 w-16 cursor-pointer"
      />
    </div>
  );
}
