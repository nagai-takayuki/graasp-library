const openInNewTab = (url) => {
  console.log('url: ', url);
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  openInNewTab,
};
