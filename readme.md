# Community Calendar

Community Calendar is a single page app implementing React on the front-end and a Laravel RestAPI on the backend. We aim tobe fully customizable so that anyone can copy it, change a few variables, and get their own version up and running.

Community Calendar allows users to sign up for the site so that they can add events of their own. It also allows non-users to submit events, which must be then approved by an admin before appearing on the calendar. The administration is handled at `example.com/admin` where site administrators can approve or reject events, approve new users, or make current users into admins.

## Current Used For:

   [Asheville Community Calendar](https://www.avlcommunityaction.com)

## Installation

Validation is handled through [tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth) and ReCaptcha uses [greggilbert/recaptcha](https://github.com/greggilbert/recaptcha) so check out their repositories for more information. The front end implements [intljusticemission/react-big-calendar](https://github.com/intljusticemission/react-big-calendar) and processes Google Calendar events using [crashspringfield/recurring-google-events](https://github.com/crashspringfield/recurring-google-events).

  * Clone this directory: `git clone https://github.com/crashspringfield/community_calendar.git`
  * Make the project and install dependencies: `composer install`
  * Generate the JavaScript Web Token: `php artisan jwt:generate`
  * Clone `example.env` at set environment variables
  * Add front end environment variables (Calendar and ReCaptcha)to: `/public/src/js/utils/config`
  * (Optional) set Sass constants in `/public/src/css/common.scss`. There are two themes to choose from, or you can add your own.
  * Build the app: `npm start`

## Hosting

You can run this on any provider that let's you use Laravel, though it might require some work. Provider-specific instructions below.

### Hostgator

  * SSH into your account and install Composer.
  * Make sure you're using PHP 5.6
  * In root directory create two files: `.bashrc` and `.bash_profile`

    .bashrc
    alias php='/opt/php56/bin/php'
    alias composer='/home2/CpanelUsername/composer.phar'
    export PATH="/opt/php56/bin:$PATH"

    .bash_profile     
    [[ -s ~/.bashrc ]] && source ~/.bashrc

  * FTP your project into the root directory
  * Point `/public_html/index.php` at your Laravel project (e.g. `require __DIR__.'/../../community_calendar/bootstrap/autoload.php';
`)

    **BUG**
    You may have to FTP your `/dist` folder into `public_html` until the relative directory issue is resolved.


## Contributing

We're always looking for help building new features, so raise an issue with any bugs or ideas.

## License

MIT
