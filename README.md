# Price checker experimentation

Just playing with puppeteer, maybe throwing it on heroku for fun, idk.

# heroku notes

heroku create

git push heroku main

heroku logs --tail

heroku buildpacks:add jontewks/puppeteer

## Do it with the worker, which doesnt have the R10 port bind error

heroku ps:scale web=0 worker=1
