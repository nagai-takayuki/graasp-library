const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

const openContentInNewTab = (content) => {
  const newWindow = window.open('', '_blank');
  newWindow.document.write(content);
};

export { openInNewTab, openContentInNewTab };
