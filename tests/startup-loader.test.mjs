import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('initial HTML hides the app before the module can run',()=>{
 assert.match(html,/<html[^>]*class="site-loading"/);
 assert.match(html,/html\.site-loading #root\{visibility:hidden\}/);
 assert.ok(html.indexOf('id="site-loader"')<html.indexOf('src="/src/main.jsx"'));
 assert.match(html,/id="site-loader-percent"[^>]*>0%/);
});
test('progress is monotonic and the app is revealed only after 100 percent',()=>{
 const percent={textContent:'0%'},loader={classList:{add(){}},remove(){}};
 const frames=[],timers=[];let revealed=false;
 const window={};
 const document={getElementById:id=>id==='site-loader-percent'?percent:id==='site-loader'?loader:{hasChildNodes:()=>true},documentElement:{classList:{remove(){revealed=true;}}}};
 runInNewContext(html.match(/<script>\s*([\s\S]*?)<\/script>/)[1],{window,document,performance:{now:()=>0},setTimeout:fn=>{timers.push(fn);return timers.length;},clearTimeout(){},requestAnimationFrame:fn=>frames.push(fn)});
 window.siteLoader.set(65);window.siteLoader.set(30);assert.equal(percent.textContent,'65%');
 window.siteLoader.finish();assert.equal(percent.textContent,'100%');assert.equal(revealed,false);
 timers[1]();assert.equal(revealed,false);
 frames.shift()();assert.equal(revealed,false);
 frames.shift()();assert.equal(revealed,true);
 window.siteLoader.finish();assert.equal(timers.length,3,'Duplicate completion does not restart the loader');
});
