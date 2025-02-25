# DARA Assistant Browser Extension

The DARA Assistant browser extension helps you to request your data from various companies. 
It can execute the clicks necessary to issue a data request on the corresponding data request page.
The Assistant currently supports just shy of 50 companies and offers fully automated data requests for over 10 of them. The other companies are annotated with descriptions from [justgetmydata.com](https://justgetmydata.com). The Assistant is a non-profit, hobbyist project - all code is open source and waiting for your contribution. 

## Installation

- On Chrome, install via the [Chrome Web Store](https://chrome.google.com/webstore/detail/dara-assistant/heolgaalbnnelipfhbccbkdohecmaimo).
- On Firefox, install via [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/dara/).

## Demo

https://user-images.githubusercontent.com/18154624/134520323-b24ec483-a22d-446a-8f7f-08c6f3b2441c.mp4

## Publication
```bibtex
@inproceedings{gruenewald2021datensouveränität,
  author    = {Elias Grünewald and Frank Pallas},
  title     = {Datensouveränität für Verbraucher:innen: Technische Ansätze durch KI-basierte Transparenz und Auskunft im Kontext der DSGVO},
  series = {Alexander Boden, Timo Jakobi, Gunnar Stevens, Christian Bala (Hgg.): Verbraucherdatenschutz - Technik und Regulation zur Unterstützung des Individuums},
  isbn      = {978-3-96043-095-7},
  doi       = {10.18418/978-3-96043-095-7\_02},
  url       = {https://nbn-resolving.org/urn:nbn:de:hbz:1044-opus-60219},
  pages     = {1 -- 17},
  year      = {2021},
}
```
See the related publication here (in German): https://pub.h-brs.de/frontdoor/index/index/docId/6021


## Development Setup

Clone the DARA-Assistant project.

```
$ git clone https://github.com/ProgPrak21/DARA-Assistant
```

Navigate to the project directory and install the dependencies.

```
$ npm install
```

To build the extension, and rebuild it when the files are changed, run

```
$ npm start
```

After the project has been built, a directory named `dist` has been created. You have to add this directory to your Chrome browser:

1. Open Chrome.
2. Navigate to `chrome://extensions`.
3. Enable _Developer mode_.
4. Click _Load unpacked_.
5. Select the `dist` directory.

## Contributing

### Connectors
If you want to help the project, you can contribute a company \"connector\". Which is just a fancy name for a Java/TypeScript file, including some meta information and a script to execute the clicks necessary to request one's data from a company. The procedure to contribute such a connector is as follows:

1. Clone the repo, create a new branch `connector/<company-name>` and install the project via npm.
2. Go into the `/src/connectors` folder and duplicate the `template.ts` file in the `connectors` folder - naming it according to the company you want to support (e.g. `amazon.ts`).
3. Fill the already present variables:
   - `name` (required): Is just the name used for referencing the connector, it is displayed in the company overview page.
   - `hostnames` (required): This is an array of all the hostnames of the company chosen, you want this connector to be used for. For *eBay* this could be `['www.ebay.com','www.ebay.de']`. Be sure to include the full subdomain, the Assistant only picks the connector if the hostnames match exactly - the rest of the URL is not evaluated.
   - `requestUrl` (required): This is the URL of the company's website, where one can submit a data access request.
   - `actions` (optional): Is an array of the available actions implemented in the connector. A action is a sequence of clicks to perform a certain interaction with the page. In most cases, `actions` will just include `'request'`.
   - `description` (optional): An optional string describing the available actions, or, if no action available, how to request one's data manually.
   - `function Action` (optional): JavaScript code to be executed on the website specified via `requestUrl`. Some helper functions have been imported from `connectorUtils.ts`, maybe they are useful to you. When the code has successfully executed, you can end the function with `Utils.sendMessageSuccess();`, informing the user about the completed injection. The function name must match the string provided under `actions`, like `'request'`.
4. Include the connector in the `/src/connectors/index.ts` file.
5. Rebuild and load the extension, to verify that your connector is functioning as expected.
6. If everything works well, commit your changes on your branch and send a pull request via GitHub.

Thank you very much!

## Permissions

The Assistant requires quite a lot of permissions, following I listed all permissions needed and why they are currently used.

- download: Some companies offer direct access to the data requested, and we want to offer a download to the user.
- storage: At startup, we fetch data from https://justgetmydata.com/# and store it for later display.
- activeTab: To be able to inject our content Script, we first need to have access to the corresponding tab - because of the activeTab permission, this access is granted to us when the user clicks on the extension icon.
- optional-permissions: When using the company overview page to directly issue an automated request, we need additional permissions for the corresponding newly created page, since we can't rely on activeTab for a programmatically opened tab.
   - tabs: If a user chooses to issue a request directly from the company overview page, we need to inject a click path into a tab opened via `chrome.tabs.create`. This permission is optional and only requested for this particular case.
   - origin: We also need the permission to access the specific URL of the newly created tab, we plan to inject our content script into.

## Further Details 

If you are interessted in the architecture and technical background of the extension please [have a look into the report](report.md).
