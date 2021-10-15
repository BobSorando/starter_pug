# starter_pug
starter with PUG



<h2>How to use starter_pug</h2>

<p>Clone into the current folder and remove all unnecessary (one command):</p>

<pre>git clone https://github.com/BobSorando/starter_pug .; rm -rf trunk .gitignore readme.md .git dist</pre>

<ol>
	<li>Clone or <a href="https://github.com/agragregra/OptimizedHTML-5/archive/master.zip">Download</a> <strong>OptimizedHTML 5</strong> from GitHub</li>
	<li>Install Node Modules: <strong>npm i</strong></li>
	<li>Run: <strong>npm run dev</strong> (development)</li>
  <li>Run: <strong>npm run build</strong> to build project on production</li>
  <li>Run: <strong>npm run prod</strong> to optimize image in project</li>
</ol>


<h2>Basic rules</h2>

<h4>src's & dist's:</h4>

<ol>
	<li>All <strong>src | dist scripts</strong> located in <strong>app/js/app.js | app.min.js</strong></li>
	<li><strong>Main Sass|Less|Styl</strong> src files located in <strong>app/styles/{preprocessor}/main.*</strong></li>
	<li>All <strong>compressed styles</strong> located in <strong>app/css/main.min.css</strong></li>
	<li>Project <strong>styles config</strong> placed in <strong>app/styles/{preprocessor}/_config.*</strong></li>
	<li>All <strong>src images</strong> placed in <strong>app/images/src/</strong> folder</li>
	<li>All <strong>compressed images</strong> placed in <strong>app/images/dist/</strong> folder</li>
</ol>
