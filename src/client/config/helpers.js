import { LOGIN_POP_UP_HEIGHT, LOGIN_POP_UP_WIDTH } from './constants';

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

const openInNewWindow = ({ url, title }) => {
  const w = LOGIN_POP_UP_WIDTH;
  const h = LOGIN_POP_UP_HEIGHT;
  // eslint-disable-next-line no-restricted-globals
  const left = screen.width / 2 - w / 2;
  // eslint-disable-next-line no-restricted-globals
  const top = screen.height / 2 - h / 2;

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.style.border = 'none';
  iframe.id = 'iframe-id';

  const newWindow = window.open(
    '',
    title,
    `height=${h},width=${w}, top=${top}, left=${left}`,
  );

  window.addEventListener(
    'message',
    (e) => {
      const { data } = e;
      // close window if login successful
      if (data?.type === 'login') {
        newWindow.close();
      }
    },
    false,
  );

  newWindow.document.write(`
    <style>
      *{margin:0;padding:0}
    </style>
    ${iframe.outerHTML}
    <script type="text/javascript">
      iframe = this.document.getElementById('iframe-id')
      doc = iframe.contentWindow.document || iframe.contentDocument
      
      doc.body.addEventListener('submit',function(e) {
        // check redirection to logged in user interface
        if(doc.getElementById("user-menu"))) { 
          this.opener.postMessage({type: 'login'}, this.origin); 
        }
      });

    </script>`);
};

export { openInNewTab, openContentInNewTab, openInNewWindow };
