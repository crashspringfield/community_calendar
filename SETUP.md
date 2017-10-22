# Setting up the calendar

## Pre-install
Much of the calendar's functionality (mailing, connection to Google calendars) requires a gmail account. Once you have an email set up:
* [Allow less secure apps to access your account](https://support.google.com/accounts/answer/6010255?hl=en)
* [Create a reCaptcha for your domains](https://www.google.com/recaptcha/admin#list)
* [Set up a Google calendar API](https://developers.google.com/google-apps/calendar/overview) (optional)
* Create a calendar for each type listed in `config.js` (optional)
* Create a calendar database with user and password to link to in your `.env` file

## Server and hosting
The calendar backend is built with Laravel, and though many shared hosting environments aren't set up for use with Laravel, they can be configured to work.

#### Make sure your environment is running PHP 5.6.
SSH into your site and type `php -v`. It probably isn't 5.6, even though you set in CPanel for your site to run it. In the root directory, create two files: `.bashrc` and `.bash_profile`.

    # .bashrc
    # Source global definitions
    if [ -f /etc/bashrc ]; then
          . /etc/bashrc
    fi

    # User specific aliases and functions
    alias php='/opt/php56/bin/php'
    alias composer="~/bin/composer/composer.phar"
    export PATH="/opt/php56/bin:$PATH"
    
    # .bash_profile
    # Get the aliases and functions
    if [ -f ~/.bashrc ]; then
        . ~/.bashrc
    fi

    # User specific environment and startup programs
    [[ -s ~/.bashrc ]] && source ~/.bashrc

#### Install Composer
`curl -sS https://getcomposer.org/installer | php`

## Setting up the site
Clone the git repository: `git clone https://github.com/crashspringfield/community_calendar.git`.

### Backend
* Copy `example.env` and fill in with the necessary information.
* Update the email to yours in `config/mail.php`, `app/Http/Controllers/AdminController.php`, `app/Http/Controllers/ContactController.php`, `app/Http/Controllers/EventController.php`, `app/Http/Controllers/UserController.php`
* Add your public and private reCaptcha keys to `config/recaptcha.php`
### Frontend
* Choose a color scheme or make your own by updating the Sass constants in `public/src/common.scss`
* Add your public reCaptcha key to `public/src/js/containers/Contact.js` and `public/src/js/containers/Contact.js`
* If pulling from Google's Calendar API, update `/public/src/js/utils/config.js` with links to your calendars. 
* (Optional) [react-google-calendar](https://github.com/crashspringfield/react-google-calendar) is more frequently updated and maintained, and the algorithms for reoccuring days can be added to extend the capability of `/public/src/js/utils/googleCal`
* If not using Google Calendar, you must comment out or remove the function that calls it in `public/src/js/containers/Home.js`:

      // Home.js
      componentDidMount = () => {
        this.getSqlEvents()
        this.getCurrentUser()
        // this.getRecentGoogleEvents() // comment out or remove
      }

* Install, etc `npm install && npm start`
* A lot of the text is Asheville-specific, so you'll have to update those in the files.
### Setup:
* FTP everything up to your site.
* `cd community_calendar && composer update`
* Generate the JavaScript Web Token: `php artisan jwt:generate`
* Copy everything from the `/community_calendar/public` directory to `public_html` or create a symbolic link `ln -s ~/www public`
* Update `index.php` to point back into the project directory:



      require __DIR__.’/../bootstrap/autoload.php’; // remove   
      require __DIR__.'/../community_calendar/bootstrap/autoload.php'; // add

      $app = require_once __DIR__.’/../bootstrap/app.php’; // remove  
      $app = require_once __DIR__.'/../community_calendar/bootstrap/app.php'; // add


* You might have to move `main.bundle.js` and `common.bundle.js` from `/public/dist` to `/dist`
* Back in the project directory `/community_calendar`, update everything just to be sure:

    `php composer install`
    `php composer dumpautoload -o`
    `php artisan config:cache`
    `php artisan route:cache`

Everything should be up in running. If not, raise an issue saying where things went wrong and what errors you got.

#### Sources and Futher info
* [Laravel deploy on shared hosting](https://github.com/petehouston/laravel-deploy-on-shared-hosting)
