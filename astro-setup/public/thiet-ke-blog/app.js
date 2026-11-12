(() => {
  const root = document.documentElement;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const safeRead = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const safeWrite = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
  const themeForHour = hour => hour >= 7 && hour < 19 ? 'light' : 'dark';
  let mode = window.hailvInitialMode || 'auto';
  const picker = $('#theme-picker');
  function applyTheme() {
    root.dataset.mode = mode === 'auto' ? themeForHour(new Date().getHours()) : mode;
    $('#theme-label').textContent = {auto:'Tự động',light:'Sáng',dark:'Tối'}[mode];
    $('#theme-icon').setAttribute('href','#'+{auto:'auto',light:'sun',dark:'moon'}[mode]);
    $$('[data-theme]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.theme === mode)));
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'giờ thiết bị';
    $('#timezone-note').textContent = `Sáng: 7h đến trước 19h. Tối: các giờ còn lại. Múi giờ hiện tại: ${zone}.`;
  }
  $$('[data-theme]').forEach(button => button.addEventListener('click',() => { mode=button.dataset.theme;safeWrite('hailv-theme',mode);applyTheme();picker.open=false;picker.querySelector('summary').focus(); }));
  applyTheme();
  setInterval(applyTheme,60000);
  document.addEventListener('visibilitychange',() => { if(!document.hidden)applyTheme(); });
  window.addEventListener('storage',event => {
    if(event.key==='hailv-theme'){mode=['auto','light','dark'].includes(event.newValue)?event.newValue:'auto';applyTheme();}
    if(event.key==='hailv-saved'){readSaved();updateSaved();filterArticles();}
  });
  document.addEventListener('click',event => {if(!picker.contains(event.target))picker.open=false;});
  $('#open-theme-settings').addEventListener('click',() => {picker.open=true;picker.scrollIntoView({block:'nearest'});picker.querySelector('summary').focus();});
  const nav = $('#navigation');
  $('#menu-toggle').addEventListener('click',() => {const open=nav.classList.toggle('is-open');$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'Đóng điều hướng':'Mở điều hướng');});
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',() => {nav.classList.remove('is-open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Mở điều hướng');}));
  const stories = {
    slow:{title:'Đôi khi, đi chậm là để thấy rõ hơn.',category:'Ghi chép',intro:'Có những ngày, điều mình cần không phải là thêm một ứng dụng để sắp xếp công việc. Đó chỉ là một khoảng thời gian không có thông báo, không có danh sách cần hoàn thành, và cũng không cần vội vàng đi đâu.',heading:'Một khoảng trống vừa đủ',body:'Thử đặt điện thoại xuống và nhìn ra ngoài cửa sổ. Những điều nhỏ vốn vẫn ở đó: một mảng nắng, tiếng người đi qua, hay chiếc lá vừa đổi màu. Khi nhịp sống chậm lại, ta có cơ hội chú ý tới chúng.',ending:'Đi chậm không có nghĩa là bỏ lại những điều quan trọng. Có khi, đó là cách để nhận ra điều gì thật sự xứng đáng với thời gian của mình.'},
    ai:{title:'Dùng AI để có thêm thời gian, không phải thêm việc.',category:'Công nghệ',intro:'Một công cụ mới thường đi kèm với rất nhiều lời hứa. Nhưng trước khi học thêm hàng chục tính năng, ta có thể bắt đầu bằng một câu hỏi gần gũi hơn: việc gì đang lặp lại mỗi ngày và khiến mình mất nhiều thời gian?',heading:'Bắt đầu từ một việc nhỏ',body:'Hãy chọn một công việc quen thuộc, chẳng hạn sắp xếp ghi chú hoặc phác thảo một email. Thử để công cụ hỗ trợ phần đầu tiên, rồi tự đọc lại và quyết định phần nào cần giữ.',ending:'Giá trị của một công cụ không chỉ nằm ở những gì nó tạo ra. Nó còn nằm ở khoảng thời gian ta có thêm để suy nghĩ, học hỏi và làm điều mình quan tâm.'},
    reading:{title:'Đọc ít hơn một chút. Nhớ lâu hơn một chút.',category:'Học tập',intro:'Đôi khi ta khép lại một cuốn sách và nhận ra mình nhớ rất ít. Không phải vì cuốn sách thiếu điều hay, mà có lẽ vì mình đã đọc nhanh hơn khả năng kết nối những ý tưởng mới với trải nghiệm của bản thân.',heading:'Giữ lại một câu hỏi',body:'Sau một đoạn khiến bạn dừng lại, hãy viết một câu bằng lời của mình. Không cần chép nguyên trang. Chỉ cần trả lời: ý này làm mình nghĩ tới điều gì, và mình có thể thử áp dụng ở đâu?',ending:'Không cần biến mọi lần đọc thành một bài tập. Một ý nhỏ được hiểu rõ và quay lại đúng lúc cũng đã là một điều đáng quý.'},
    english:{title:'Học tiếng Anh từ những câu mình thật sự muốn nói.',category:'Học tập',intro:'Một bài học trở nên gần gũi hơn khi nó bắt đầu từ điều ta muốn nói trong đời thường: chào một người mới, hỏi lại một ý chưa rõ, hay kể về một ngày của mình.',heading:'Một câu, nhiều lần thực hành',body:'Chọn một câu ngắn. Nghe cách nói tự nhiên, chú ý trọng âm, rồi đọc lại thành tiếng. Sau đó thay một chi tiết để câu ấy nói về chính bạn. Sự thay đổi nhỏ giúp bài học bước ra khỏi trang giấy.',ending:'Tiến bộ có thể không đến cùng một lúc. Nhưng mỗi câu đã dùng được là một bước rõ ràng, cụ thể, và thuộc về mình.'},
    notes:{title:'Một cuốn sổ cho những ý tưởng chưa thành hình.',category:'Ghi chép',intro:'Có những suy nghĩ xuất hiện rất nhanh rồi cũng biến mất rất nhanh. Viết chúng xuống là một cách giữ lại, mà chưa cần đánh giá ngay chúng có đủ hay hay đủ hữu ích không.',heading:'Để ý tưởng được ở dạng nháp',body:'Một câu hỏi, một hình ảnh, một dòng suy nghĩ còn dang dở đều có thể có chỗ trong cuốn sổ. Không cần mọi trang đều ngay ngắn. Cũng không cần mọi ý đều trở thành một dự án.',ending:'Khi quay lại những dòng đã viết, đôi khi ta tìm thấy một sợi chỉ nối các điều tưởng như rời rạc. Và thế là một ý tưởng bắt đầu có hình dạng.'}
  };
  let saved = new Set();
  function readSaved(){try{const value=JSON.parse(safeRead('hailv-saved')||'[]');saved=new Set(Array.isArray(value)?value.filter(id=>Object.hasOwn(stories,id)):[]);}catch{saved=new Set();}}
  readSaved();
  let filter='all';
  function updateSaved(){ $$('[data-save]').forEach(b=>{const isSaved=saved.has(b.dataset.save);b.setAttribute('aria-pressed',String(isSaved));b.title=isSaved?'Bỏ lưu bài viết':'Lưu bài để đọc sau';});const count=$('#saved-count');count.hidden=!saved.size;count.textContent=String(saved.size); }
  function filterArticles(){let count=0;$$('.article').forEach(article=>{const show=article.dataset.featured ? filter==='saved'&&saved.has(article.dataset.id) : filter==='all'||(filter==='saved'?saved.has(article.dataset.id):article.dataset.category===filter);article.hidden=!show;if(show)count++;});$('#empty-state').hidden=count>0;$('#empty-state').textContent=filter==='saved'?'Chưa có bài nào trong danh sách này. Lưu bài bằng biểu tượng dấu trang để đọc sau.':'Chưa có bài cho chủ đề này.';$('#results-status').textContent=`Đang hiển thị ${count} bài viết.`;}
  $$('[data-save]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);safeWrite('hailv-saved',JSON.stringify([...saved]));updateSaved();filterArticles();}));
  $$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;$$('[data-filter]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});filterArticles();}));
  updateSaved();filterArticles();
  const reader=$('#reading-dialog');
  function showStory(id){const story=stories[id];if(!story)return;$('#reading-title').textContent=story.title;$('#reading-category').textContent=story.category;const prose=$('#reading-prose');prose.replaceChildren();[['p',story.intro],['h3',story.heading],['p',story.body],['p',story.ending]].forEach(([tag,text])=>{const node=document.createElement(tag);node.textContent=text;prose.append(node);});reader.showModal();reader.scrollTop=0;}
  $$('[data-read]').forEach(b=>b.addEventListener('click',event=>{event.preventDefault();showStory(b.dataset.read);}));
  let fontSize=19;
  function setFontSize(value){fontSize=Math.min(23,Math.max(17,value));reader.style.setProperty('--reader-size',fontSize+'px');$('#font-smaller').disabled=fontSize===17;$('#font-larger').disabled=fontSize===23;}
  $('#font-smaller').addEventListener('click',()=>setFontSize(fontSize-1));$('#font-larger').addEventListener('click',()=>setFontSize(fontSize+1));
  const search=$('#search-dialog');
  function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();}
  function searchStories(){const term=normalize($('#search-input').value.trim());const results=$('#search-results');results.replaceChildren();let count=0;for(const [id,story]of Object.entries(stories)){if(term&&!normalize(story.title+' '+story.category).includes(term))continue;count++;const button=document.createElement('button');button.className='search-result';button.type='button';button.textContent=story.title;const small=document.createElement('small');small.textContent=story.category;button.append(small);button.addEventListener('click',()=>{search.close();showStory(id);});results.append(button);}if(!count){const p=document.createElement('p');p.className='dialog-hint';p.textContent='Chưa tìm thấy bài phù hợp. Thử một từ khác nhé.';results.append(p);}}
  $('#search-open').addEventListener('click',()=>{search.showModal();searchStories();$('#search-input').focus();});$('#search-input').addEventListener('input',searchStories);
  $$('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));
  $$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}}));
  document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(reader.open)reader.close();if(!search.open)search.showModal();searchStories();$('#search-input').focus();}if(event.key==='Escape'){picker.open=false;nav.classList.remove('is-open');$('#menu-toggle').setAttribute('aria-expanded','false');}});
  window.blogPreview={themeForHour};
})();
