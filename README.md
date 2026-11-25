# cipher-nova

This is a group project focused on showcasing cybersecurity practices, privacy and the responsible use of AI

## Basic Structure

- cipher-nova ( this is the root )
- index.html is the home page, it sits in the root
- pages/ holds the other 5 html files
- css/ holds all the styles
- js/ holds all the js code
- assets/ holds the images and icons

## The Pages

- index.html is the home page ( hero, what digital safety means, featured topics, the 4-step learning journey )
- pages/explore.html is the topic catalog with 10 topics, search by keyword or click a category to filter
- pages/details.html is the deep dive guide on phishing and social engineering
- pages/security-lab.html is the phishing detection simulator ( 5 scenarios, score and accuracy at the end )
- pages/ai-safety.html is the responsible generative AI guide with a 6 step checklist
- pages/contact.html is the feedback form, checked in your browser only ( nothing is sent or stored )

## CSS

- global.css is the base for everything ( colors, fonts, spacing, header, footer )
- components.css has the pieces used on more than one page ( navbar, heroes, cards, buttons, badges, simulator panels )
- explore.css has the small fixes just for the explore page
- contact.css has everything just for the contact form

## JS

- explore.js filters the topic cards as you type or click a category ( reset button included )
- security-lab.js runs the simulator ( shows a message, checks your answer, keeps score, gives clues after each answer )
- validation.js has the small helpers ( checks for empty fields, minimum length and email format )
- contact.js uses those helpers to check every field of the feedback form
- ai-safety.js counts how many checklist boxes are ticked

## Good To Know

- pages inside pages/ link back to the root with ../ ( like ../css/global.css )
- the contact form only checks your input in the browser, it never sends or stores anything
- nothing to install, just open index.html in a browser

## Contributors

- Tayab Abbasi
- Shaheer Ahmed Khan
- Maroof Kalwar
