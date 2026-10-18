// Photo helper: open https://shrutisinghal2.github.io/#edit-photo
// Pick a picture, adjust the crop and press "Save to website". It saves photo.jpg straight to GitHub
// using a GitHub token that stays only in your own browser. Visitors never see this unless they open #edit-photo.
(function () {
  const OWNER = 'Shrutisinghal2', REPO = 'Shrutisinghal2.github.io', BRANCH = 'main', FILE = 'photo.jpg';
  const REPO_UPLOAD = `https://github.com/${OWNER}/${REPO}/upload/${BRANCH}`;
  const TOKEN_KEY = 'pe-github-token';
  const getToken = () => { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } };
  const setToken = t => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch (e) {} };
  const SIZE = 900; // output photo is 900 x 900 px (sharp on any screen)
  let box;

  function build() {
    box = document.createElement('div');
    box.className = 'pe-overlay';
    box.innerHTML = `
      <div class="pe-dialog" role="dialog" aria-modal="true" aria-labelledby="pe-title">
        <button class="pe-close" type="button" aria-label="Close">×</button>
        <h2 id="pe-title">Change profile photo</h2>
        <p class="pe-lead">Choose a photo, adjust it, and press <b>Save to website</b>. Your site shows it in 1–2 minutes.</p>
        <label class="pe-pick">Choose photo<input type="file" accept="image/*" hidden></label>
        <div class="pe-stage" hidden>
          <canvas width="${SIZE}" height="${SIZE}"></canvas>
          <div class="pe-controls">
            <label>Zoom <input type="range" data-k="zoom" min="1" max="3" step="0.01" value="1"></label>
            <label>Left / right <input type="range" data-k="x" min="-1" max="1" step="0.01" value="0"></label>
            <label>Up / down <input type="range" data-k="y" min="-1" max="1" step="0.01" value="-0.3"></label>
          </div>
          <div class="pe-token" hidden>
            <label for="pe-token-in">GitHub key <span>(only needed the first time on this device)</span></label>
            <input id="pe-token-in" type="password" placeholder="github_pat_…" autocomplete="off" spellcheck="false">
            <small>How to get it: GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token → Repository access: only <b>${REPO}</b> → Permissions: <b>Contents: Read and write</b>. It is saved only in this browser.</small>
          </div>
          <div class="pe-actions">
            <button type="button" class="btn pe-save">Save to website</button>
            <button type="button" class="link-btn pe-download">Download instead</button>
          </div>
          <p class="pe-status" role="status"></p>
          <p class="pe-hint"><a href="${REPO_UPLOAD}" target="_blank" rel="noopener">Upload manually on GitHub</a> · <button type="button" class="link-btn pe-forget">Forget GitHub key on this device</button></p>
        </div>
      </div>`;
    document.body.appendChild(box);

    const input = box.querySelector('input[type=file]');
    const stage = box.querySelector('.pe-stage');
    const canvas = box.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const state = { zoom: 1, x: 0, y: -0.3 };
    let img = null;

    function draw() {
      if (!img) return;
      const side = Math.min(img.width, img.height) / state.zoom;
      const maxX = (img.width - side) / 2, maxY = (img.height - side) / 2;
      const sx = maxX + state.x * maxX, sy = maxY + state.y * maxY;
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.drawImage(img, sx, sy, side, side, 0, 0, SIZE, SIZE);
      showOnPage(canvas.toDataURL('image/jpeg', 0.93));
    }
    function showOnPage(url) {
      const av = document.getElementById('avatar'); if (!av) return;
      av.innerHTML = ''; const im = document.createElement('img'); im.src = url; im.alt = 'Profile photo'; av.appendChild(im);
    }

    input.addEventListener('change', () => {
      const f = input.files && input.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { const i = new Image(); i.onload = () => { img = i; stage.hidden = false; draw(); }; i.src = r.result; };
      r.readAsDataURL(f);
    });
    box.querySelectorAll('input[type=range]').forEach(s => s.addEventListener('input', () => { state[s.dataset.k] = parseFloat(s.value); draw(); }));
    box.querySelector('.pe-download').addEventListener('click', () => {
      canvas.toBlob(b => {
        const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'photo.jpg';
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      }, 'image/jpeg', 0.93);
    });
    const status = box.querySelector('.pe-status');
    const tokenBox = box.querySelector('.pe-token'), tokenIn = box.querySelector('#pe-token-in');
    const say = (t, ok) => { status.textContent = t; status.className = 'pe-status' + (ok === true ? ' ok' : ok === false ? ' bad' : ''); };
    tokenBox.hidden = !!getToken();
    box.querySelector('.pe-forget').addEventListener('click', () => { setToken(''); tokenIn.value = ''; tokenBox.hidden = false; say('GitHub key removed from this device.'); });
    box.querySelector('.pe-save').addEventListener('click', async () => {
      if (!img) { say('Choose a photo first.', false); return; }
      const token = getToken() || tokenIn.value.trim();
      if (!token) { tokenBox.hidden = false; tokenIn.focus(); say('Paste your GitHub key once, then press Save again.', false); return; }
      const btn = box.querySelector('.pe-save'); btn.disabled = true; say('Saving…');
      try {
        const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;
        const headers = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' };
        let sha;
        const cur = await fetch(api + '?ref=' + BRANCH, { headers, cache: 'no-store' });
        if (cur.status === 401) throw new Error('key');
        if (cur.ok) sha = (await cur.json()).sha;
        const content = canvas.toDataURL('image/jpeg', 0.93).split(',')[1];
        const res = await fetch(api, { method: 'PUT', headers, body: JSON.stringify({ message: 'Update profile photo', content, branch: BRANCH, sha }) });
        if (res.status === 401 || res.status === 403 || res.status === 404) throw new Error('key');
        if (!res.ok) throw new Error('other');
        setToken(token); tokenBox.hidden = true;
        say('Saved! Your website will show the new photo in 1–2 minutes (refresh with Ctrl + F5).', true);
      } catch (e) {
        if (e.message === 'key') { setToken(''); tokenBox.hidden = false; say('GitHub did not accept the key. Check it has "Contents: Read and write" for ' + REPO + '.', false); }
        else say('Could not save. Check your internet and try again, or use "Download instead".', false);
      } finally { btn.disabled = false; }
    });
    const close = () => { box.hidden = true; if (location.hash === '#edit-photo') history.replaceState(null, '', location.pathname + location.search); };
    box.querySelector('.pe-close').addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !box.hidden) close(); });
  }

  function open() { if (!box) build(); box.hidden = false; }
  if (location.hash === '#edit-photo') open();
  window.addEventListener('hashchange', () => { if (location.hash === '#edit-photo') open(); });
})();
