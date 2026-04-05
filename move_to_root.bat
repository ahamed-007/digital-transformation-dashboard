@echo off
pushd digital-dashboard
move README.md ..\
move index.html ..\
move package-lock.json ..\
move package.json ..\
move render.yaml ..\
move vite.config.js ..\
move git_init.bat ..\
move dist ..\
move netlify ..\
move node_modules ..\
move server ..\
move src ..\
popd
rd digital-dashboard
