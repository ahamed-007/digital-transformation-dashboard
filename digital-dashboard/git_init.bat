@echo off
git init
(echo node_modules && echo dist && echo .env && echo .DS_Store) > .gitignore
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ahamed-007/digital-transformation-dashboard.git
git push -u origin main
