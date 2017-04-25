#The SOS Method

Built with [@angular/cli](https://github.com/angular/angular-cli)

### Included
 - [angular/router](https://github.com/angular/angular) - Angular Router

### Quick start

```bash
# clone the repo
git clone https://github.com/ngrx/example-app.git


# change directory to repo
cd sosmethod

# Use npm or yarn to install the dependencies:
npm install

# OR
yarn

# start the server
ng serve
```

### Firebase Database Rules
```
{
  "rules": {
    "users": {
      "$uid": {
          ".read": "$uid === auth.uid || auth.token.email.toLowerCase() === data.child('username').val() || $uid === auth.token.email.toLowerCase().replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_').replace('[', '_').replace(']', '_')",
          ".write": "$uid === auth.uid || auth.token.email.toLowerCase() === data.child('username').val() || $uid === auth.token.email.toLowerCase().replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_').replace('[', '_').replace(']', '_')"
      }
    }
  }
}
```


Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser

_NOTE:_ The above setup instructions assume you have added local npm bin folders to your path.
If this is not the case you will need to install the Angular CLI globally.
