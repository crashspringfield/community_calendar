# Community Calendar

Community Calendar is a single page app implementing React on the front-end and a Laravel RestAPI on the backend. We aim tobe fully customizable so that anyone can copy it, change a few variables, and get their own version up and running.

Community Calendar allows users to sign up for the site so that they can add events of their own. It also allows non-users to submit events, which must be then approved by an admin before appearing on the calendar. The administration is handled at `example.com/admin` where site administrators can approve or reject events, approve new users, or make current users into admins.

## Current Used For:

   [Asheville Community Calendar](https://www.avlcommunityaction.com)
   [Triangle Anarchist Calendar](https://trianarcalendar.com/)

## Installation

Validation is handled through [tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth) and ReCaptcha uses [greggilbert/recaptcha](https://github.com/greggilbert/recaptcha) so check out their repositories for more information. The front end implements [intljusticemission/react-big-calendar](https://github.com/intljusticemission/react-big-calendar) and processes Google Calendar events using [crashspringfield/recurring-google-events](https://github.com/crashspringfield/recurring-google-events).

Details setup and installation instructions have been moved to [SETUP.md](https://github.com/crashspringfield/community_calendar/blob/master/SETUP.md)

## Contributing

We're always looking for help building new features, so raise an issue with any bugs or ideas.

## License

MIT
