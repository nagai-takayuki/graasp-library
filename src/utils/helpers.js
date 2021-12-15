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

// helper function to sort objects in alphabetical order (by name)
const compare = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

export { openInNewTab, openContentInNewTab, compare };
