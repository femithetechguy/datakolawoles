// Print page
function printPage() {
  window.print();
}

// Print file (PDF, etc.)
function printFile(fileUrl) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.top = "-10000px";
  iframe.src = fileUrl;
  document.body.appendChild(iframe);
  iframe.onload = () => {
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };
}
